<template>
  <user-card-list :user-list="userList"></user-card-list>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import qs from "qs";
import myAxios from "../plugins/myAxios.ts";
import { showSuccessToast, showFailToast } from 'vant';
import UserCardList from "../components/userCardList.vue";

const route = useRoute()
const {tagNameList} = route.query
// 获取请求头中的参数信息
// const userInfos = route.query
const userList = ref([])
onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tagNameList
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
    }
  }).then(function (response) {
    // console.log('search tags success' + response);
    return response.data
  }).catch(function (error) {
    showFailToast('获取失败');
    // console.log('search tags error' + error);
  })
  // console.log(userListData)
  if (userListData) {
    showSuccessToast('获取成功');
    userListData.forEach(user => {
      user.tags = JSON.parse(user.tags)
    })
    userList.value = userListData;
  }
})


</script>


<style scoped>

</style>