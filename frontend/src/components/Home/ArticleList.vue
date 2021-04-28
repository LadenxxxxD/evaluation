<template>
  <div>
    <ArticleListItem v-for="articleItem in articleList" :key="articleItem.id" :data="articleItem" />
    <div class="loadmore-container" @click="getNextPageArticleList">加载更多...</div>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
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
  currentPage = 0;
  articleList: Array<any> = [];
  loading = false;
  noMore = false;

  mounted() {
    this.getArticleList();
  }
  
  async getArticleList() {
    const response: any = await request.get(
      `http://localhost:3000/api/v1/article/listByPage`,
      { 
        pageNum: this.currentPage,
        pageSize: 10
      }
    );
    // const response: any = await request.get(`/api/zaeke/main/column_detail`, { skipnum: 100, length: 10, id: 9 });
    // console.log('response: ', response);
    if (response.code === 0) {
      this.loading = false;
      this.articleList = response.data;
    } else {
      this.loading = false;
    }
  }

  async getNextPageArticleList() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.currentPage = this.currentPage + 1;
    const response: any = await request.get(
      `http://localhost:3000/api/v1/article/listByPage`,
      { 
        pageNum: this.currentPage,
        pageSize: 10
      }
    );
    if (response.code === 0) {
      this.loading = false;
      this.articleList.push(...response.data);
    } else {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .loadmore-container {
    margin: 20px 0;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;

    &:hover {
      color: #7957d8;
    }
  }
</style>
