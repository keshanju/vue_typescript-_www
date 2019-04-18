export default class XmlToJsonUtil {

    public xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n';
    public attr_prefix = '-';
    public overrideMimeType = 'text/xml';

    public parseXML = function (xml) {
        var root;
        // @ts-ignore
        if (window.DOMParser) {
            var xmldom = new DOMParser();
            var dom = xmldom.parseFromString(xml, "application/xml");
            if (!dom) return;
            root = dom.documentElement;
        // @ts-ignore
        } else if (window.ActiveXObject) {
            xmldom = new ActiveXObject('Microsoft.XMLDOM');
            // @ts-ignore
            xmldom.async = false;
            // @ts-ignore
            xmldom.loadXML(xml);
            // @ts-ignore
            root = xmldom.documentElement;
        }
        if (!root) return;
        return this.parseDOM(root);
    };

    public parseDOM = function (root) {
        if (!root) return;

        this.__force_array = {};
        if (this.force_array) {
            for (var i = 0; i < this.force_array.length; i++) {
                this.__force_array[this.force_array[i]] = 1;
            }
        }

        var json = this.parseElement(root);   // parse root node
        if (this.__force_array[root.nodeName]) {
            json = [json];
        }
        if (root.nodeType != 11) {            // DOCUMENT_FRAGMENT_NODE
            var tmp = {};
            tmp[root.nodeName] = json;          // root nodeName
            json = tmp;
        }
        return json;
    };

    public parseElement = function (elem) {
        //  COMMENT_NODE
        if (elem.nodeType == 7) {
            return;
        }

        //  TEXT_NODE CDATA_SECTION_NODE
        if (elem.nodeType == 3 || elem.nodeType == 4) {
            var bool = elem.nodeValue.match(/[^\x00-\x20]/);
            if (bool == null) return;     // ignore white spaces
            return elem.nodeValue;
        }

        var retval;
        var cnt = {};

        //  parse attributes
        if (elem.attributes && elem.attributes.length) {
            retval = {};
            for (var i = 0; i < elem.attributes.length; i++) {
                var key = elem.attributes[i].nodeName;
                if (typeof(key) != "string") continue;
                var val = elem.attributes[i].nodeValue;
                if (!val) continue;
                key = this.attr_prefix + key;
                if (typeof(cnt[key]) == "undefined") cnt[key] = 0;
                cnt[key]++;
                this.addNode(retval, key, cnt[key], val);
            }
        }

        //  parse child nodes (recursive)
        if (elem.childNodes && elem.childNodes.length) {
            var textonly = true;
            if (retval) textonly = false;        // some attributes exists
            for (var i = 0; i < elem.childNodes.length && textonly; i++) {
                var ntype = elem.childNodes[i].nodeType;
                if (ntype == 3 || ntype == 4) continue;
                textonly = false;
            }
            if (textonly) {
                if (!retval) retval = "";
                for (var i = 0; i < elem.childNodes.length; i++) {
                    retval += elem.childNodes[i].nodeValue;
                }
            } else {
                if (!retval) retval = {};
                for (var i = 0; i < elem.childNodes.length; i++) {
                    var key = elem.childNodes[i].nodeName;
                    if (typeof(key) != "string") continue;
                    var val = this.parseElement(elem.childNodes[i]);
                    if (!val) continue;
                    if (typeof(cnt[key]) == "undefined") cnt[key] = 0;
                    cnt[key]++;
                    this.addNode(retval, key, cnt[key], val);
                }
            }
        }
        return retval;
    };

    public addNode = function (hash, key, cnts, val) {
        if (this.__force_array[key]) {
            if (cnts == 1) hash[key] = [];
            hash[key][hash[key].length] = val;      // push
        } else if (cnts == 1) {                   // 1st sibling
            hash[key] = val;
        } else if (cnts == 2) {                   // 2nd sibling
            hash[key] = [hash[key], val];
        } else {                                    // 3rd sibling and more
            hash[key][hash[key].length] = val;
        }
    };

    public writeXML = function (tree) {
        var xml = this.hash_to_xml(null, tree);
        return this.xmlDecl + xml;
    };

    public hash_to_xml = function (name, tree) {
        var elem = [];
        var attr = [];
        for (var key in tree) {
            if (!tree.hasOwnProperty(key)) continue;
            var val = tree[key];
            if (key.charAt(0) != this.attr_prefix) {
                if (typeof(val) == "undefined" || val == null) {
                    elem[elem.length] = "<" + key + " />";
                } else if (typeof(val) == "object" && val.constructor == Array) {
                    elem[elem.length] = this.array_to_xml(key, val);
                } else if (typeof(val) == "object") {
                    elem[elem.length] = this.hash_to_xml(key, val);
                } else {
                    elem[elem.length] = this.scalar_to_xml(key, val);
                }
            } else {
                attr[attr.length] = " " + (key.substring(1)) + '="' + (this.xml_escape(val)) + '"';
            }
        }
        var jattr = attr.join("");
        var jelem = elem.join("");
        if (typeof(name) == "undefined" || name == null) {
            // no tag
        } else if (elem.length > 0) {
            if (jelem.match(/\n/)) {
                jelem = "<" + name + jattr + ">\n" + jelem + "</" + name + ">\n";
            } else {
                jelem = "<" + name + jattr + ">" + jelem + "</" + name + ">\n";
            }
        } else {
            jelem = "<" + name + jattr + " />\n";
        }
        return jelem;
    };

    public array_to_xml = function (name, array) {
        var out = [];
        for (var i = 0; i < array.length; i++) {
            var val = array[i];
            if (typeof(val) == "undefined" || val == null) {
                out[out.length] = "<" + name + " />";
            } else if (typeof(val) == "object" && val.constructor == Array) {
                out[out.length] = this.array_to_xml(name, val);
            } else if (typeof(val) == "object") {
                out[out.length] = this.hash_to_xml(name, val);
            } else {
                out[out.length] = this.scalar_to_xml(name, val);
            }
        }
        return out.join("");
    };

    public scalar_to_xml = function (name, text) {
        if (name == "#text") {
            return this.xml_escape(text);
        } else {
            return "<" + name + ">" + this.xml_escape(text) + "</" + name + ">\n";
        }
    };

    public xml_escape = function (text) {
        return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    };
}