<template>
  <div class="page-container">
    <div class="article-main-container">
      <p class="article-title">{{ article.title }}</p>
      <p class="article-info space-between">
        <span>{{ article.author }}</span>
        <span>{{ formatCreateTime(article.createTime) }}</span>
      </p>
      <a-divider></a-divider>
      <article class="article-content" v-html="article.content"></article>
      <div class="controller-bar">
        <div class="controller" title="点赞">
          <icon-font icon="dianzan4" :size="26"></icon-font>
        </div>
        <div class="controller" title="评论">
          <icon-font icon="pinglun5" :size="26"></icon-font>

        </div>
        <div class="controller" title="收藏">
          <icon-font icon="shoucang6" :size="26"></icon-font>
        </div>
      </div>
    </div>
    <div class="comment-main-container">
      <!-- <Comment
        v-model="commentsData"
        :user="currentUser"
        :before-submit="addComment"
        :before-delete="deleteComment"
        :before-like="likeComment"
        :upload-img="uploadOrCopyImg"
      /> -->
      <div class="discuss-component">
          <div class="flex-wrapper">
            <img src="https://pic1.zhimg.com/v2-a97b59854b5dd12e8ba2d0e32abec7c3_is.jpg" class="discuss-avatar">
            <b-input v-model="comment" maxlength="200" type="textarea" style="flex: 1; margin-left: 14px;"></b-input>
          </div>
          <div class="flex-space-between">
            <span></span>
            <b-button type="is-primary" @click="addComment">发送</b-button>
          </div>
        </div>
        <div class="discuss-list">
          <div v-for="comment in commentList" :key="comment.id" class="discuss-item flex-column">
            <div class="flex-space-between">
              <div class="flex-center-v">
                <img src="https://pic1.zhimg.com/v2-a97b59854b5dd12e8ba2d0e32abec7c3_is.jpg" class="discuss-avatar">
                <span style="font-size: 16px; font-weight: 600; margin-left: 14px;">用户名</span>
              </div>
                <span style="float: right;">2021-5-24 20:31:22</span>
            </div>
            <div style="margin: 6px 50px 6px; font-size: 18px;">
              {{ comment.content }}
            </div>
            <!-- <div style="margin-left: 50px; font-size: 14px;">
              <span>回答用户:</span>
              <span style="margin-left: 8px;">挺好的</span>
            </div> -->
            <a-divider></a-divider>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
// import Comment from 'vue-juejin-comment'
import Comment from '@/components/Comment/index.vue';
import request from '@/utils/request';
import { formatTimestampDate } from '@/utils/util';
import IconFont from '@/components/IconFont.vue';

@Component({
  components: {
    Comment,
    IconFont
  }
})
export default class Article extends Vue {
  currentUser = {
    author: true,
    name: '管理员',
    avatar: 'https://pic1.zhimg.com/v2-a97b59854b5dd12e8ba2d0e32abec7c3_is.jpg'
  }
  article = {
    id: 12601,
    title: '',
    author: '',
    content: '',
    createTime: 0
  }
  comment: string = '';
  commentList: Array<any> = [];
  commentsData: Array<any> = [
    {
      id: '', // 唯一 id，必需
      content: 'tyr', // 评论内容，必需
      imgSrc: '', // 评论中的图片地址，非必需
      children: [], // 子评论（回复），非必需
      likes: 0, // 点赞数，非必需
      reply: null, // 子评论（回复）人信息，非必需
      createAt: '2020.11.24', // 评论时间，必需
      user: this.currentUser
    }
  ]

  created() {
    // this.addData(1)
  }
  
  mounted() {
    const { id = '0' } = this.$route.params;
    this.article.id = parseInt(id.toString(), 10);
    this.getArticle();
    this.getComments();
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

  async addComment() {
    try {
      const response: any = await request.post(`http://localhost:3000/api/v1/article/comment`, {
        id: this.article.id,
        user: 1,
        content: this.comment
      });
      if (response.code === 0) {
        this.$toast.open({
          type: 'is-success',
          message: '评论成功！',
          duration: 3000
        });
        this.comment = '';
        this.getComments();
      } else {
        this.$toast.open({
          type: 'is-danger',
          message: '评论失败！',
          duration: 3000
        });
      }
    } catch (error) {
      this.$toast.open({
        type: 'is-danger',
        message: '评论失败: ' + error.message,
        duration: 3000
      });
    }
  }

  async getComments() {
    const response: any = await request.get(`http://localhost:3000/api/v1/article/comment`);
    if (response.code === 0) {
      this.commentList = response.data;
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    position: relative;
  }

  .controller-bar {
    width: 80px;
    // background-color: red;
    position: fixed;
    top: 30%;
    left: calc((100% - 1000px) / 2 - 80px);
    display: flex;
    flex-direction: column;

    .controller {
      margin: 5px;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 6px 12px 0 rgb(0 0 0 / 8%);
      cursor: pointer;
      
      &:hover {
        box-shadow: 0 6px 12px 2px rgb(0 0 0 / 16%);
      }
    }
  }
.article-main-container {
  position: relative;
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
  min-height: 80vh;
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
  p > iframe {
    height: 600px;
    width: 100%;
  }
}
.comment-main-container {
  width: 1000px;
  margin: 0 auto 20px;
  padding: 20px;
  background-color: #fff;
}

.discuss-list {
  margin-top: 30px;
}

.discuss-item {
  min-width: 60%;
}

.discuss-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
</style>
