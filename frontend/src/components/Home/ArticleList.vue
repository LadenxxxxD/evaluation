<template>
  <div>
    <ArticleListItem v-for="articleItem in articleList" :key="articleItem.id" :data="articleItem" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import request from '@/utils/request';
import ArticleListItem from '@/components/Home/ArticleListItem.vue';

@Component({
  components: {
    ArticleListItem
  }
})
export default class ArticleList extends Vue {
  articleList: Array<any> = [];

  mounted() {
    this.getArticleList();
  }

  async getArticleList() {
    const response: any = await request.get(`http://localhost:3000/api/v1/article/listByPage?pageNum=0&pageSize=12`);
    // const response: any = await request.get(`/api/zaeke/main/column_detail`, { skipnum: 0, length: 100, id: 9 });
    if (response.code === 0) {
      console.log('response: ', response);
      this.articleList = response.data;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>