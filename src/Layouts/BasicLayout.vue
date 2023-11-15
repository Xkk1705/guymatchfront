<template>
  <!--导航栏-->
  <van-nav-bar
      :title="title"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div name="content">
    <router-view></router-view>
  </div>
  
  <!-- tab拦-->
  <van-tabbar route >
    <van-tabbar-item name="index" to="/" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item name="team" to="/team" icon="search">队伍</van-tabbar-item>
    <van-tabbar-item name="user" to="/user" icon="friends-o">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import routes from "../config/route.ts";

const router = useRouter();
const DEFAULT_TITLE = '伙伴匹配'
const title = ref(DEFAULT_TITLE);
const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search')
}
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath === route.path;
  })
  // console.log(route.title)
  if (route.title === undefined || route.title === '') {
    title.value = DEFAULT_TITLE;
  }else {
    title.value = route.title;
  }
})


</script>


<style scoped>

</style>