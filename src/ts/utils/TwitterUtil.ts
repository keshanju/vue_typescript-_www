
export default class TwitterUtil {

    public api_key;
    public oauth_token;
    public request_url;
    public popup;
    public authorize_url: string = 'https://api.twitter.com/oauth/authenticate?oauth_token=';
    // 发送请求的第一步的参数
    public step1_method: string = 'POST';
    public step1_url: string = 'https://twitter.com/oauth/request_token';
    public step1_nonce: string = Math.ceil(Math.random() * 100).toString();
    public step1_timestamp: string = Math.floor(new Date().getTime() / 1000).toString();

    public init(appId: string, appSecret: string) {
        let strOauth = this.getOAuthStr(appId, appSecret);
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });
        xhr.open("POST", "https://twitter.com/oauth/request_token");
        // xhr.setRequestHeader("", "");
        xhr.setRequestHeader("Authorization", strOauth);
        xhr.setRequestHeader("cache-control", "no-cache");
        // xhr.setRequestHeader("Postman-Token", "c5624a71-175f-48a3-a769-384665e7acfd");
        xhr.send(data);
        // this.popup = window;
        // this.api_key = appId;
        // this.request_url = appSecret;
    }

    // 获取发送参数的签名
    public getSignature(appId, appSecret): string {

        let parameters = {
            oauth_consumer_key: appId,
            oauth_nonce: this.step1_nonce,
            oauth_timestamp: this.step1_timestamp,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '1.0'
        };
        let consumerSecret = appSecret;
        let tokenSecret = '';
        // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
        // let returnStr = oauthSignature.generate(this.step1_method, this.step1_url, parameters, consumerSecret, tokenSecret).toString();
        let returnStr = '';
        return returnStr;
    }

    //或去设置oauth的字符串
    public getOAuthStr(appid: string, appSecret: string): string {
        let signature = this.getSignature(appid, appSecret);
        let str = "OAuth oauth_consumer_key=\\\"" + appid + "\\\",oauth_signature_method=\\\"HMAC-SHA1\\\"";
        str += ",oauth_timestamp=\\\"" + this.step1_timestamp + "\\\",oauth_nonce=\\\"" + this.step1_nonce;
        str += "\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"" + signature + "\\\"";
        return str

    }

    public closePopup() {
        if (this.popup && !this.popup.closed) {
            this.popup.close();
        }
    }

    public getUrlQueryObject(query_string) {
        var vars = {}, hash;
        if (!query_string) {
            return false;
        }
        var hashes = query_string.slice(1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    public sendError(message, callback) {
        var response = {
            success: false,
            message: message || 'Some Error Occurred'
        };
        if (typeof callback === 'function') {
            callback(response);
        }
    }

    /**
     * 获取授权token
     * @param callback
     */
    public getOAuthToken(callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status === 0) {
                    return callback('Internet Disconnected/Connection Timeout')
                }
                try {
                    var response = JSON.parse(this.response);
                    callback(null, response);
                } catch (error) {
                    callback(error.message);
                }
                return;
            }
        };
        xhr.open("GET", this.request_url, true);
        xhr.send();
    }

    /**
     * 授权
     * @param callback
     */
    public authorize(callback) {
        if (!this.popup) {
            return callback('Popup Not initialized');
        }
        this.popup.location.href = this.authorize_url + this.oauth_token;
        var wait = function () {
            setTimeout(function () {
                return this.popup.closed ? callback(null, this.getUrlQueryObject(this.popup.location.search)) : wait();
            }, 25);
        };
        wait();
    }

    /**
     *
     * @param callback
     */
    public connect(callback) {
        if (!this.request_url) {
            return this.sendError('Request URL not provided', callback);
        }
        //Open a blank popup
        this.popup = window.open(null, '_blank', 'height=400,width=800,left=250,top=100,resizable=yes', true);
        //Get an oauth token from the callback url
        this.getOAuthToken(function (error, response) {
            if (error) {
                this.closePopup();
                return this.sendError(error, callback);
            }

            if (!response.success) {
                this.closePopup();
                return this.sendError(response.message, callback);
            }
            //Set the OAuth1 Token
            this.oauth_token = response.oauth_token;
            //Ask the user to authorize the app;
            this.authorize(function (error, response) {
                if (error) {
                    this.closePopup();
                    return this.sendError(error, callback);
                }
                if (!response || !response.oauth_token) {
                    this.closePopup();
                    return this.sendError('OAuth Token not Found', callback);
                }

                //Check if the oauth-token obtained in authorization, matches the original oauth-token
                if (response.oauth_token !== this.oauth_token) {
                    return this.sendError('Invalid OAuth Token received from Twitter.', callback);
                }

                callback({
                    success: true,
                    oauth_token: response.oauth_token,
                    oauth_verifier: response.oauth_verifier
                });
            });
        });
    }
}