<template>
    <template v-if="user">
      <van-cell-group>
        <van-cell title="用户名" :value="user.username"/>
        <van-cell title="修改个人信息" is-link to="/user/update" />
        <van-cell title="我加入的队伍" is-link to="/team/join" />
        <van-cell title="我创建的队伍" is-link to="/team/create" />
      </van-cell-group>
    </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/User.ts";
import {showFailToast, showSuccessToast} from "vant";


const user = ref({})

const router = useRouter();

onMounted( async () => {
  const userInfo = await getCurrentUser();
  if (userInfo){
    if (userInfo.gender === 0) {
      userInfo.gender = '男'
    }else {
      userInfo.data.gender = '女'
    }
    showSuccessToast("获取成功")
  }else {
    showFailToast("获取失败")
  }
  user.value = userInfo
})


</script>

<style scoped>

</style>
