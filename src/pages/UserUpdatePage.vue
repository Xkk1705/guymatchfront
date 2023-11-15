<template>
  <template v-if="user">
    <van-cell-group>
      <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="doEdit('username','昵称',user.username)"/>
      <van-cell title="头像" is-link to="/user/edit" @click="doEdit('avatar','头像',user.avatarUrl)">
        <img style="height: 47px" :src="user.avatarUrl"/>
      </van-cell>
      <van-cell title="性别" is-link to="/user/edit" :value="user.gender" label="描述信息" @click="doEdit('gender','性别',user.gender)"/>
      <van-cell title="手机号" is-link to="/user/edit" :value="user.phone" @click="doEdit('phone','手机号',user.phone)"/>
      <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" label="描述信息" @click="doEdit('email','邮箱',user.email)"/>
      <van-cell title="星球号" is-link :value="user.planetCode"/>
    </van-cell-group>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../service/User.ts";


const user = ref({})

const router = useRouter();
const doEdit = (editKey: string, editName: string, editValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editValue,
      editName,
    }
  })
}

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
