<template>
  <div>
    <div class="article-main-container">
      <p class="article-title">{{ article.title }}</p>
      <p class="article-info space-between">
        <span>{{ article.author }}</span>
        <span>{{ formatCreateTime(article.createTime) }}</span>
      </p>
      <a-divider></a-divider>
      <article class="article-content" v-html="article.content"></article>
    </div>
    <div class="comment-main-container">
      <Comment
        :data="data"
        :props="commentProps"
        :user="currentUser"
        :before-submit="addComment"
        :before-delete="deleteComment"
        :before-like="likeComment"
        :upload-img="uploadOrCopyImg"
      />
    </div>
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
    author: true,
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

  data: Array<any> = [];

  created() {
    this.addData(1)
  }

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

  async addComment(comment) {
    console.log('comment: ', comment);
    console.log(this.data);
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(comment)
      }, 0)
    })

    console.log('addComment: ', res)
  }

  async deleteComment(comment) {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(comment)
      }, 0)
    })
  }

  async likeComment(comment) {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(comment)
      }, 0)
    })
  }

  async uploadOrCopyImg({ file, callback }) {
    try {
      const res = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = () => {
          reject(reader.error)
        }
      })

      callback(res)
    } catch (e) {
      console.log(e)
    }
  }

  addData(times: number) {
    this.data = new Array(times)
      .fill([
        {
          content: '梦芸\n近况如何\n算来已有十月未见你\n甚是思念',
          visitor: {
            name: '我叫白云',
            avatar:
              'https://img.vim-cn.com/46/60955e1965607e5a9e9af1ba37a2c1ed99de60.png',
          },
          createAt: '2020.11.24',
          likes: 1,
          childrenComments: [
            {
              content:
                '此刻我能闻见漫天火药味道\n我随军藏身长江边一暗无天日的地窖底\n埋首台灯下写这些字却不知把心绪给寄向何地',
              visitor: {
                name: 'NARUTO',
                avatar:
                  'https://img.vim-cn.com/4d/5cbfa03caa043dcb7b3b4e75f827535538776a.jpg',
              },
              createAt: '2020.11.25',
            },
            {
              content: '\n如磐石般坚毅',
              visitor: {
                name: '我叫黑土',
                avatar:
                  'https://img.vim-cn.com/b7/6c70f9dc921123f8f1ab754ec938a2b04b52a7.jpg',
              },
              createAt: '2020.11.25',
              reply: {
                name: 'NARUTO',
                avatar:
                  'https://img.vim-cn.com/4d/5cbfa03caa043dcb7b3b4e75f827535538776a.jpg',
              },
            },
          ],
        },
        {
          content:
            '我想时光亦是用来磨的\n细细地磨慢慢地磨\n总能磨出些许墨香来',
          visitor: {
            name: '我叫黑土',
            avatar:
              'https://img.vim-cn.com/b7/6c70f9dc921123f8f1ab754ec938a2b04b52a7.jpg',
          },
          createAt: '2020.12.5',
          childrenComments: [
            {
              content:
                '即使我鼻子已不灵\n眼睛生出疾\n侥幸你的照片还能辨出依稀',
              visitor: {
                name: 'NARUTO',
                avatar:
                  'https://img.vim-cn.com/4d/5cbfa03caa043dcb7b3b4e75f827535538776a.jpg',
              },
              createAt: '2020.12.6',
            },
          ],
        },
      ])
      .flat(1)
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
.comment-main-container {
  width: 1000px;
  margin: 0 auto 20px;
  padding: 20px;
  background-color: #fff;
}
</style>
