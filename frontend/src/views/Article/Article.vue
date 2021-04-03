<template>
  <div class="article-main-container">
    <p class="article-title">{{ article.title }}</p>
    <p class="article-info space-between">
      <span>{{ article.author }}</span>
      <span>{{ formatCreateTime(article.createTime) }}</span>
    </p>
    <a-divider></a-divider>
    <article class="article-content" v-html="article.content"></article>
    <Comment
      v-model="comments"
      :props="commentProps"
      :user="currentUser"
      :before-submit="addComment"
      :before-delete="deleteComment"
      :before-like="likeComment"
      :upload-img="uploadOrCopyImg"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import Comment from '@fengfengfeng/vue-juejin-comment'
import '@fengfengfeng/vue-juejin-comment/dist/vue-juejin-comment.css'
import request from '@/utils/request';
import { formatTimestampDate } from '@/utils/util';

@Component({
  components: {
    Comment
  }
})
export default class Article extends Vue {
  currentUser = {
    name: '管理员',
    avatar: 'https://img.vim-cn.com/4d/5cbfa03caa043dcb7b3b4e75f827535538776a.jpg'
  }
  article = {
    id: 12601,
    title: '',
    author: '',
    content: '',
    createTime: 0
  }

  commentProps = {
    content: 'content',
    imgSrc: 'imgSrc',
    children: 'childrenComments',
    likes: 'likes',
    reply: 'reply',
    createAt: 'createAt',
    user: 'visitor',
  }

  comments: Array<any> = [];

  mounted() {
    const { id = '0' } = this.$route.params;
    this.article.id = parseInt(id.toString(), 10);
    this.getArticle();
  }
  async getArticle() {
    const response: any = await request.get(`http://localhost:3000/api/v1/article/${this.article.id}`);
    // const response: any = await request.get(`/api/zaeke/main/article?id=16201`);
    if (response.code === 0) {
      this.article.content = response.data.content;
      this.article.title = response.data.title;
      this.article.author = response.data.author;
      this.article.createTime = response.data.created;
    }
    console.log('this.article: ', this.article);
  }

  formatCreateTime(timestamp: number) {
    return formatTimestampDate(timestamp);
  }

  addComment() {

  }

  deleteComment() {

  }

  likeComment() {

  }

  uploadOrCopyImg() {

  }
}
</script>

<style lang="scss" scoped>
.article-main-container {
  width: 1000px;
  margin: 0 auto;
  padding: 60px;
  background-color: #fff;
  min-height: 100%;
}
.article-title {
  font-size: 32px;
  text-align: center;
}
.article-info {
}
.article-content ::v-deep {
  p {
    font-size: 16px;
    font-size: 18px;
    color: #464646;
    letter-spacing: 1px;
    line-height: 36px;
    text-align: justify;
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }
  b {
    font-size: 18px;
  }
  ul {
    padding-left: 40px;
    max-width: 860px;
    font-size: 16px;
    margin: 0 20px 20px;

    li {
      list-style-type: disc;
      margin: 10px 0;
    }
  }
}
</style>