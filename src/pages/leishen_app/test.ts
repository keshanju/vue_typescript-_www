import {List, Tabs, Tab, Cell} from 'vant';
import {Vue, Component} from "vue-property-decorator";
import {PullRefresh} from 'vant';

Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);

@Component({})
class Notify extends Vue {
    loading = false;

    list = [
        {
            items: [],
            finished: false

        },
        {
            items: [],
            finished: false

        }
    ];


    onLoad(index) {
        const list = this.list[index];
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                const text = list.items.length + 1;
                list.items.push(text < 10 ? '0' + text : text);
            }
            this.loading = false;
            if (list.items.length >= 40) {
                list.finished = true;
            }
        }, 500);
    }

    onRefresh(index) {

    }
}

new Notify().$mount("#app");
