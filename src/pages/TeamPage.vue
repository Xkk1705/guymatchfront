<template>
  <van-search v-model="searchTeamText" @search="searchTeam" placeholder="请输入搜索队伍关键词" />
  <van-button type="primary" @click="createTeam">创建队伍</van-button>
  <team-card-list :team-list="teamList"></team-card-list>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showSuccessToast, showFailToast} from 'vant';
import TeamCardList from "../components/TeamCardList.vue";
import {useRouter} from "vue-router";

// 获取请求头中的参数信息
const teamList = ref([])
const currentPage = ref(1);
// 搜索队伍text
const searchTeamText = ref('');
onMounted(async () => {
  const teamListData = await myAxios.get('/team/list').then(function (response) {
    showSuccessToast("获取信息成功")
    return response.data
  }).catch(function (error) {
    showFailToast('获取信息失败');
  })
  // console.log(teamListData)
  if (teamListData) {
    teamList.value = teamListData;
  }
})

const router = useRouter()
//创建队伍按钮事件
const createTeam = () => {
  router.push({
    path: '/team/add',
  })
}

const searchTeam = async () => {
  // console.log(searchTeamText.value)
  const teamListData = await myAxios.get('/team/list',{
    params: {
      teamName: searchTeamText.value
    }
  }).then(function (response) {
    showSuccessToast("获取信息成功")
    return response.data
  }).catch(function (error) {
    showFailToast('获取信息失败');
  })
  console.log(teamListData)
  if (teamListData) {
    teamList.value = teamListData;
  }
}


</script>


<style scoped>

</style>