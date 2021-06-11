<template>
  <div class="details-main-container">
    <div class="baseinfo-container flex-wrapper">
      <div class="left-img-container">
        <img
          src="//img12.360buyimg.com/n1/s450x450_jfs/t1/176279/28/492/99476/605d884fE19b32d50/a3c973652799afa2.jpg"
        />
      </div>
      <div class="right-info-container">
        <h1 class="phone-name-title">{{ product.name }}</h1>
        <div class="phone-info">
          <div class="baseinfo-row">
              <icon-font icon="CPU" :size="26" />
              <span style="font-weight: 600; margin-left: 8px;">CPU： </span>
              <span>{{ product.cpu }}</span>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="neicun" :size="26" />
              <span style="font-weight: 600; margin-left: 8px;">内存： </span>
              <span>{{ product.memory }}</span>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="cunchu" :size="24" />
              <span style="font-weight: 600; margin-left: 8px;">存储： </span>
              <span>{{ product.storage }}</span>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="dianchi2" :size="24" color="#4cd137" />
              <span style="font-weight: 600; margin-left: 8px;">电池： </span>
              <span>{{ product.battery }}</span>
          </div>
          <div class="baseinfo-row" style="align-items: start;">
              <icon-font icon="shexiangtou" :size="24" />
              <span style="font-weight: 600; margin-left: 8px;">后置摄像头： </span>
              <div style="display: flex; flex-direction: column; align-self: start;">
                <span v-for="camera in product['back_camera']" :key="camera">{{ camera }}</span>
              </div>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="shexiangtou1" :size="24" color="#194abd" />
              <span style="font-weight: 600; margin-left: 10px;">前置摄像头： </span>
              <span v-for="camera in product['front_camera']" :key="camera">{{ camera }}</span>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="phone" :size="26" color="#59a292" />
              <span style="font-weight: 600; margin-left: 8px;">屏幕尺寸： </span>
              <span>{{ product['screen_size'] }}</span>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="fenbianlv" :size="22" color="#d352a3" />
              <span style="font-weight: 600; margin-left:10px;">屏幕分辨率： </span>
              <span>{{ product['screen_ratio'] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="phone-rate">
      <section>
        <span>测评分数： </span>
        <span style="color: #eb4d4b;">{{ rateInfo.score }}</span>
      </section>
      <section>
        <span>全站排名： </span>
        <span style="color: #eb4d4b;">{{ rateInfo.scoreRank }}</span>
      </section>
      <section>
        <span>安兔兔评分： </span>
        <span style="color: #eb4d4b;">{{ rateInfo.antutu }}</span>
      </section>
      <section>
        <span>安兔兔排名： </span>
        <span style="color: #eb4d4b;">{{ rateInfo.antutuRank }}</span>
      </section>
      <section>
        <span>用户评分：</span>
        <b-rate v-model="rateInfo.userRate" icon-pack="fas" size="is-medium" show-score spaced disabled></b-rate>
      </section>
      <section>
        <span>契合度：</span>
        <b-rate v-model="fitRatio" icon-pack="fas" size="is-medium" show-score spaced></b-rate>
      </section>
      <section>
        <a @click="openRateModal">我要评分</a>
        <a-modal
          title="产品评分"
          centered
          :visible="rateModal.visible"
          @cancel="closeRateModal"
        >
          <template #footer>
            <b-button type="is-primary" @click="sumbitRate">提交</b-button>
          </template>
          <b-rate v-model="rateModal.rate" icon-pack="fas" size="is-large" show-score spaced></b-rate>
        </a-modal>
      </section>
    </div>
    <b-tabs style="background-color: #fff; padding: 20px;">
      <b-tab-item label="相关测评">
        <div class="evalution-categoryName">官方测评</div>
        <div v-if="!product.official_article" class="empty-tips">
          <span>暂无官方测评，</span>
          <a href="/article/write">催更</a>
        </div>
        <a class="evalution-item" style="display: flex;">
          <section style="margin-right: 20px;">
            <img :src="officialArticle.img" style="max-width: 200px; height: 110px; border-radius: 4px;">
          </section>
          <section style="flex: 1;">
            <div class="evalution-title">{{ officialArticle.title }}</div>
            <div class="evalution-description">{{ officialArticle.description }}</div>
            <div class="evalution-bar">
              <section>
                <span>{{ officialArticle.author }}</span>
              </section>
              <section class="evalution-actions">
                <span>{{ officialArticle.like }} 人觉得很赞</span>
                <span>{{ officialArticle.comment }} 人参与讨论</span>
              </section>
            </div>
          </section>
        </a>
        <div class="evalution-categoryName">达人测评</div>
        <div v-if="!articles.length" class="empty-tips">
          <span>暂无测评文章，</span>
          <a href="/article/write">去发表</a>
        </div>
        <a v-for="article in articles" :key="article.id" class="evalution-item" style="display: flex;">
          <section style="margin-right: 20px;">
            <img :src="article.img" style="max-width: 200px; height: 110px; border-radius: 4px;">
          </section>
          <section style="flex: 1;">
          <div class="evalution-title">{{ article.title }}</div>
          <div class="evalution-description">{{ article.description }}</div>
          <div class="evalution-bar">
            <section>
              <span>{{ article.author }}</span>
            </section>
            <section class="evalution-actions">
              <span>{{ article.like }} 人觉得很赞</span>
              <span>{{ article.comment }} 人参与讨论</span>
            </section>
          </div>
          </section>
        </a>
      </b-tab-item>
      <b-tab-item label="详细参数">
        <div v-for="category in detailParams" :key="category.categoryName">
          <div class="detail-info-categoryName">
            <span>{{ category.categoryName }}</span>
          </div>
          <div v-for="info in category.params" :key="info.name" class="detail-info-row">
            <div class="detail-info-name">{{ info.name }}</div>
            <div class="detail-info-value">{{ info.value }}</div>
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="用户交流">
        <div v-if="!articles.length" class="empty-tips">
          <span>暂无用户交流，</span>
          <a href="/article/write">去讨论</a>
        </div>
        <div class="discuss-component">
          <div class="flex-wrapper">
            <img :src="user.avatar" class="discuss-avatar">
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
                <img :src="comment.User.avatar" class="discuss-avatar">
                <span style="font-size: 16px; font-weight: 600; margin-left: 14px;">{{ comment.User.nickname }}</span>
              </div>
                <span style="float: right;">{{ fmtCreateTime(comment.createAt) }}</span>
            </div>
            <div style="margin: 6px 50px 6px; font-size: 18px;">
              {{ comment.content }}
            </div>
            <a-divider></a-divider>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import DivisionTitle from '@/components/DivisionTitle.vue';
import IconFont from '@/components/IconFont.vue';
import request from "@/utils/request";
import { formatTimestampSecond } from '@/utils/util';

@Component({
  components: {
    DivisionTitle,
    IconFont
  }
})
export default class Details extends Vue {
  user: any = {};
  userRate: number = 4.8;
  fitRatio: number = 4;
  product: any = {};
  detailParams: Array<any> = [];
  rateInfo: any = {};
  articles: Array<any> = [];
  officialArticle: any = {};
  rateModal = {
    visible: false,
    rate: 0
  }
  commentList: Array<any> = [];
  comment: string = '';

  get productId() {
    const { id } = this.$route.params;
    if (!id) return undefined;
    return parseInt(id, 10);
  }

  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  mounted() {
    this.getProduct();
    // this.getAllParams();
    this.getRateInfo();
    this.getArticles();
    this.getComments();
  }

  fmtCreateTime(timeStamp: number): string {
    return formatTimestampSecond(timeStamp, '-')
  }

  // 获取当前产品
  async getProduct(): Promise<void> {
    const response: any = await request.get(`http://localhost:3000/api/v1/product/${this.productId}`)
    if (response.code === 0) {
      const { params } = response.data;
      const allParams = JSON.parse(params);
      this.detailParams = allParams[1] && allParams[1].params;
      delete response.data.params;
      this.product = response.data;
    }
  }

  // 获取全部参数
  async getAllParams(): Promise<void> {
    const response: any = await request.get('http://localhost:3000/api/v1/product/allParams', { id: this.productId })
    if (response.code === 0) {
      const { params } = response.data;
      const allParams = JSON.parse(params);
      this.detailParams = allParams[1] && allParams[1].params;
    }
  }

  async getArticles(): Promise<void> {
    const response: any = await request.get('http://localhost:3000/api/v1/article/all');
    if (response.code === 0) {
      const tags = this.product.tags || [];
      this.articles = response.data.filter((article: any) => tags.includes(article.id.toString()));
      this.officialArticle = response.data.find((article: any) => this.product.official_article === article.id) || {};
      console.log("🚀 ~ file: Details.vue ~ line 234 ~ Details ~ getArticles ~ this.product.official_article", this.product.official_article)
    }
  }

  // 获取分数
  async getRateInfo(): Promise<void> {
    const response: any = await request.get('http://localhost:3000/api/v1/rate/getRate', { id: this.productId })
    if (response.code === 0) {
      this.rateInfo = response.data;
    }
  }

  // 提交评分
  async sumbitRate(): Promise<void> {
    if(!this.rateModal.rate) {
      this.$toast.open({
        type: "is-warning",
        duration: 5000,
        message: `评分不能为空！`,
      });
      return;
    }
    const response: any = await request.post(
      'http://localhost:3000/api/v1/rate/userRate',
      { id: this.productId, rate: this.rateModal.rate}
    );
    if (response.code === 0) {
      this.$toast.open({
        type: "is-success",
        duration: 5000,
        message: `评分成功！`,
      });
      this.closeRateModal();
      this.getProduct();
    } else {
      this.$toast.open({
        type: "is-danger",
        duration: 5000,
        message: `评分失败: ${response.message}`,
      });
    }
  }

  async addComment() {
    try {
      const response: any = await request.post(`http://localhost:3000/api/v1/product/comment`, {
        id: this.productId,
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
    const response: any = await request.get(`http://localhost:3000/api/v1/product/comment`);
    if (response.code === 0) {
      this.commentList = response.data;
    }
  }

  openRateModal() {
    this.rateModal.visible = true;
  }
  closeRateModal() {
    this.rateModal.visible = false;
  }
}
</script>

<style lang="scss" scoped>
.details-main-container {
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
}
.baseinfo-container {
  // height: 500px;
  background-color: #fff;
  padding: 20px 0;
}
.baseinfo-row {
  display: flex;
  align-items: center;
}
.left-img-container {
  // height: 500px;
  width: 500px;
  & img {
    max-width: 500px;
  }
}
.phone-name-title {
  margin: 30px 0;
  font-size: 38px;
  color: #281765;
}
.phone-info {
  & > div {
    margin: 10px 0;
  }
}
.phone-rate {
  font-size: 18px;
  font-weight: 600;
  // margin: 30px 0;
  margin-bottom: 30px;
  padding: 10px 40px 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > section {
    display: flex;
    align-items: center;
    margin: 10px 40px;
  }
}

.empty-tips {
  height: 100px;
  display: flex;
  justify-content: center ;
  align-items: center;
}

.detail-info {
  background-color: #fff;
  padding: 20px;
}
.detail-info-categoryName {
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 600;
}

.detail-info-row {
  margin: 5px 30px;
  border-bottom: 1px solid #f1f2f3;
  display: flex;
}
.detail-info-name {
  width: 200px;
  font-weight: 600;
}
.detail-info-value {
  flex: 1;
}
.evalution-categoryName {
  font-size: 22px;
  font-weight: 600;
}
.evalution-item {
  display: block;
  padding: 16px;
  border-bottom: 1px solid #f1f2f3;
  color: #555;
}
.evalution-item:hover {
  .evalution-title {
    color: #7a57d5;
    transition: color .6s;
  }
  .evalution-description {
    color: #555;
    transition: color .6s;
  }
  .evalution-actions > span {
    color: #888;
    transition: color .6s;
  }
}
.evalution-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
}
.evalution-description {
  color: #888;
  margin-bottom: 6px;
  min-height: 48px;
}
.evalution-bar {
  display: flex;
  justify-content: space-between;

  .evalution-actions {
    & > span {
      color: #aaa;
      font-size: 14px;
      margin-right: 30px;
    }
  }
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
