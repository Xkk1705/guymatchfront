<template>
  {{beforeTeamValue.id}}
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="beforeTeamValue.teamName"
          name="teamName"
          label="队伍名称"
          placeholder="队伍名称"
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
      <van-field
          v-model="beforeTeamValue.description"
          rows="1"
          autosize
          label="房间描述"
          type="textarea"
          placeholder="请输入留言"
      />
      <van-field name="radio" label="房间属性">
        <template #input>
          <van-radio-group v-model="beforeTeamValue.teamStatus" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">加密</van-radio>
            <van-radio name="2">私有</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <template v-if="teamStatus === '1'">
        <van-field
            v-model="beforeTeamValue.password"
            type="password"
            name="teamPassword"
            label="房间密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填房间密码' }]"
        />
      </template>

      <van-field
          v-model="beforeTeamValue.expireTime"
          is-link
          readonly
          name="datePicker"
          label="过期时间"
          placeholder="点击选择过期时间"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker @confirm="onConfirm" @cancel="showPicker = false"/>
      </van-popup>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">

/**
 * {
 *   "expireTime": "2023-11-25",
 *   "teamStatus": 0
 * }
 */
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter()

const beforeTeamValue = ref({})
onMounted(async () => {
  const teamData = await myAxios.get('/team/get',{
    params: {
      id: Number(route.query.id)
    }
  }).then(function (response) {
    showSuccessToast("获取信息成功")
    return response.data
  }).catch(function (error) {
    showFailToast('获取信息失败');
  })
  // 转换类型
  const status = String(teamData.teamStatus);
  teamData.teamStatus = status
  beforeTeamValue.value = teamData
})

// 时间选择
const result = ref('');
const showPicker = ref(false);
const onConfirm = ({selectedValues}) => {
  result.value = selectedValues.join('/');
  showPicker.value = false;
};

// 房间状态
const teamStatus = ref('0');

const onSubmit = async (values) => {
  // 格式化过期时间
  //需要替换的字符
  const parameter1 = '/';
  //需要替换成的字符
  const parameter2 = '-';
  //字符串替换函数.replace
  const expireTime = result.value.replaceAll(parameter1, parameter2);
  // console.log(expireTime)
  const res = await myAxios.post('/team/update',beforeTeamValue.value)
  if (res.code === 0 && res.data) {
    showSuccessToast('修改成功！')
    router.replace("/team")
  } else {
    showFailToast('修改失败！')
  }
};



</script>

<style scoped>

</style>
