import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPages from "../pages/SearchResultPages.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamCreatePage from "../pages/TeamCreatePage.vue";
import TeamJoinPage from "../pages/TeamJoinPage.vue";

const routes = [
    {path: '/',title: '伙伴匹配', component: Index},
    {path: '/user',title: '我的', component: User},
    {path: '/search',title: '查咋伙伴', component: SearchPage},
    {path: '/user/edit',title: '修改信息', component: UserEditPage},
    {path: '/user/tags',title: '伙伴匹配',component: SearchResultPages},
    {path: '/user/login',title: '登录', component: UserLoginPage},
    {path: '/user/update',title: '个人信息', component: UserUpdatePage},
    {path: '/team', title: '找队伍',component: Team},
    {path: '/team/add',title: '创建队伍', component: TeamAddPage},
    {path: '/team/create',title: '创建的队伍', component: TeamCreatePage},
    {path: '/team/join',title: '加入的队伍', component: TeamJoinPage},
    {path: '/team/update',title: '修改队伍', component: TeamUpdatePage},
]

export default routes;