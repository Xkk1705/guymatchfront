<template>
  <van-cell center title="相似推荐">
    <template #right-icon>
      <van-switch v-model="checked" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList"></user-card-list>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showSuccessToast, showFailToast} from 'vant';
import UserCardList from "../components/userCardList.vue";

// 获取请求头中的参数信息
const userList = ref([])
const currentPage = ref(1);
const checked = ref(false)
onMounted(async () => {
    const userListData = await myAxios.get('/user/recommend', {
      params: {
        currentPage: 1,
        pageSize: 30,
      }
    }).then(function (response) {
      showSuccessToast("获取信息成功")
      return response.data
    }).catch(function (error) {
      showFailToast('获取信息失败');
    })
    const users = userListData.records;
    // console.log(users)

    if (users) {
      showSuccessToast('获取成功');
      users.forEach(user => {
        user.tags = JSON.parse(user.tags)
      })
      userList.value = userListData.records;
    }
})

const getUserDate = async (checked) => {
  if (checked.value){
    const userListData = await myAxios.get('/user/match', {
      params: {
        userNum: 10,
      }
    }).then(function (response) {
      showSuccessToast("获取信息成功")
      return response.data
    }).catch(function (error) {
      showFailToast('获取信息失败');
    })
    const users = userListData;

    if (users) {
      showSuccessToast('获取成功');
      users.forEach(user => {
        user.tags = JSON.parse(user.tags)
      })
      userList.value = userListData;
    }

  }else {
    const userListData = await myAxios.get('/user/recommend', {
      params: {
        currentPage: 1,
        pageSize: 30,
      }
    }).then(function (response) {
      showSuccessToast("获取信息成功")
      return response.data
    }).catch(function (error) {
      showFailToast('获取信息失败');
    })
    const users = userListData.records;
    // console.log(users)

    if (users) {
      showSuccessToast('获取成功');
      users.forEach(user => {
        user.tags = JSON.parse(user.tags)
      })
      userList.value = userListData.records;
    }
  }
}

watchEffect(() => {
    getUserDate(checked)
})


</script>


<style scoped>

</style>