import {createApp} from 'vue'
import App from './App.vue'
import {Button, Icon, NavBar, Tabbar, TabbarItem} from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/route.ts";
import {Search} from 'vant';
import {Tag} from 'vant';
import {Divider} from 'vant';
import {TreeSelect} from 'vant';
import {Cell} from 'vant';
import {Form, Field, CellGroup} from 'vant';
import {Card} from 'vant';
import {Toast} from "vant";
import {Dialog} from 'vant';
import {Switch} from 'vant';
// @ts-ignore
const app = createApp(App)
app.use(Switch);
app.use(Dialog)
app.use(Toast)
app.use(Card);
app.use(Search);
app.use(Button);
app.use(NavBar);
app.use(Icon)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Tag);
app.use(Divider);
app.use(TreeSelect);
app.use(Cell);
app.use(CellGroup);
app.use(Form);
app.use(Field);
app.use(CellGroup);

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    // @ts-ignore
    routes, // `routes: routes` 的缩写
})

app.use(router)
app.mount('#app')






