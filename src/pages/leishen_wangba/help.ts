import { Vue, Component } from 'vue-property-decorator';
import "babel-polyfill";
import Header from './components/Headnav.vue';
import Footer from './components/Footer.vue';
import { Input, Checkbox, Row, Col } from "element-ui";
import './less/leigodwangba.less';
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);

export class UserRegForm {
    username?: string;
    userpwd?: string;
    vercode?: string;
    smscode?: number;
    is_agree?: boolean
}
@Component({
    components: {
        'header-nav': Header,
        'footer-nav': Footer,
    }
})
export default class Login extends Vue {

}

new Login({

}).$mount('#login');