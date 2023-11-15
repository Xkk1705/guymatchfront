<template>
  <div style="margin-bottom: 50px">
    <div v-for="team in props.teamList">
      <van-card
          :title="team.teamName"
          thumb="https://tse3-mm.cn.bing.net/th/id/OIP-C.u5Zbn79mNU69l_ErsNIXnwAAAA?w=213&h=213&c=7&r=0&o=5&dpr=1.2&pid=1.7"
      >
        <template #footer>
          <van-button size="mini" @click="deleteTeam(team)" v-if="team.userid === user.id && team.hasJoinTeam">
            解散队伍
          </van-button>
          <van-button size="mini" @click="exitTeam(team)" v-if="team.hasJoinTeam">退出队伍</van-button>
          <van-button size="mini" @click="updateTeam(team)" v-if="team.userid === user.id && team.hasJoinTeam">
            更新队伍
          </van-button>
          <van-button size="mini" @click="doJoinTeam(team)" v-if="!team.hasJoinTeam">加入队伍</van-button>
        </template>
        <template #tags>
          <div>队伍人数：{{ team.count }}/{{ team.teamMaxNum }}</div>
          <div>队伍描述：{{ team.description }}</div>
          <div v-if="team.teamStatus === 0">队伍状态：公开</div>
          <div v-if="team.teamStatus === 1">队伍状态：加密</div>
          <div>创建人：{{ team.createUser.username }}</div>
          <div>过期时间：{{ team.createTime }}</div>
        </template>
      </van-card>
      <van-dialog v-model:show="dialogShow" title="请输入队伍密码" show-cancel-button @confirm="doJoinPasswordTeam(team)">
        <van-field
            v-model="teamPassword"
            type="password"
            name="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {teamType} from "../moodels/team";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../service/User.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";


const router = useRouter();
const dialogShow = ref(false);
const teamPassword = ref('');
const joinTeamId = ref(0);

const props = defineProps<{
  teamList: teamType[]
}>()

const doJoinTeam = async (team) => {
  joinTeamId.value = team.id;
  if (team.teamStatus === 0) {
    const res = await myAxios.post('/team/jointeam', {
      'teamId': joinTeamId.value,
      'password': '',
    }).then(function (response) {
      return response.code
    }).catch(function (error) {
      showFailToast('获取信息失败');
    })
    if (res === 0) {
      showSuccessToast('获取成功');
    }
  }
  // 如果是加密房间 弹出密码框
  if (team.teamStatus === 1){
    dialogShow.value = true;
  }
}

const doJoinPasswordTeam = async (team) => {
    // 如果为加密房间需要输入房间密码
    if (dialogShow.value){
      const res = await myAxios.post('/team/jointeam', {
        'teamId': joinTeamId.value,
        'password': teamPassword.value,
      }).then(function (response) {
        return response.code
      }).catch(function (error) {
        showFailToast('获取信息失败');
      })
      if (res === 0) {
        showSuccessToast('获取成功');
      }
    }
}

const user = ref({})
onMounted(async () => {
  user.value = await getCurrentUser();
})

const updateTeam = (team) => {
  // console.log(user)
  router.push({
    path: 'team/update',
    query: {
      id: team.id
    }
  })
}
const exitTeam = async (team) => {
  // 发送请求退出队伍
  const teamData = await myAxios.get('/team/quit', {
    params: {
      teamid: team.id
    }
  })
  if (teamData.code === 0) {
    showSuccessToast("退出成功成功")
  } else {
    showFailToast("退出失败")
  }
  // console.log(user)
  await router.replace("/team")
}

const deleteTeam = async (team) => {
  // 发送请求退出队伍
  const teamData = await myAxios.get('/team/delete', {
    params: {
      teamid: team.id
    }
  })
  if (teamData.code === 0) {
    showSuccessToast("解散成功成功")
  } else {
    showFailToast("解散失败")
  }
  // console.log(user)
  await router.replace("/team")
}

</script>


<style scoped>

</style>