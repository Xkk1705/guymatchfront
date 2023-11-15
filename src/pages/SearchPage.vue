<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />

    <van-divider content-position="left">已选标签</van-divider>
<!-- 循环展示标签-->
    <template v-for="tag in activeIds">
      <van-tag :show="show" closeable size="small" type="primary" @close="closeTag(tag)">
        {{tag}}
      </van-tag>
    </template>
    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />
  </form>
  <van-button type="primary" @click="doSearchTagUser()" >搜索</van-button>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter()
const searchText = ref('');
const originTagList = [{
  text: '性别',
  children: [
    {text: '男', id: '男'},
    {text: '女', id: '女'},
    {text: '篮球', id: '篮球'},
  ],
},
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大3', id: '大3'},
      {text: '大4', id: '大4'},
      {text: '大5', id: '大5aaaaaaa'},
      {text: '大6', id: '大6aaaaaaa'},
    ],
  },
]

const mockUser = ref([{
  id: 1,
  username: '鱼皮',
  profile: '我是一个精神小伙，变强是我的目的，目前还有头发，啊八八八八阿布啊八八八八',
  userAccount: 'dogYupi',
  avatarUrl: 'https://tupian.qqw21.com/article/UploadPic/2018-6/20186182127277279.jpg',
  gender: '男',
  phone: '123112312',
  email: '12345@qq.com',
  planetCode: '1234',
  createTime: new Date(),
}])

// 标签列表
let tagList = ref(originTagList);
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });

};
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

const show = ref(true);
const closeTag = (tag) => {
  activeIds.value = activeIds.value.filter((item) => {
    return item !== tag;
  })
};

const doSearchTagUser = () => {
  router.push({
    path: '/user/tags',
    query: {tagNameList: activeIds.value},
  })
}


const activeIds  = ref([]);
const activeIndex = ref(0);

</script>


<style scoped>

</style>