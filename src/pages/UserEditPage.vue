<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.editValue"
          :name="editUser.editKye"
          :label="editUser.editName"
          :placeholder="editUser.editName"
          :rules="[{ required: true, message: `${editUser.editName}` }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {getCurrentStatus} from "../status/user.ts";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const route = useRoute()
const router = useRouter()
const editUser = ref({
  editKye: route.query.editKey,
  editValue: route.query.editValue,
  editName: route.query.editName,
})


const onSubmit = async (values) => {
  const currentUser = getCurrentStatus()
  console.log(currentUser)
  if (currentUser) {
    // 提交参数修改信息
    const res = await myAxios.post('/user/update', {
      'id': currentUser.id,
      [editUser.value.editKye as string]: editUser.value.editValue,
  })
    if (res.data === 1) {
      showSuccessToast("修改成功")
      router.back()
    }else {
      showFailToast("修改失败")
    }
  }
};

</script>

<style scoped>

</style>
