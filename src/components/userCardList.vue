<template>
  <div style="margin-bottom: 25px">
    <div v-for="tagUser in props.userList">
      <van-card
          :desc="tagUser.profile"
          :title="tagUser.username"
          :thumb="tagUser.avatarUrl"
      >
        <template #tags>
          <van-tag plain type="primary" v-for="tag in tagUser.tags" style="margin-right: 3px">{{ tag }}</van-tag>
        </template>
        <template #footer>
          <van-button size="mini">联系我</van-button>
        </template>
      </van-card>
    </div>
  </div>>
</template>

<script setup lang="ts">
 import {UserType} from "../moodels/user";
 const props =  defineProps<{
   userList : UserType[]
  }>()
</script>


<style scoped>

</style>