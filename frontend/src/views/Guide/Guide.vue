<template>
  <div class="guide">
    <DivisionTitle title="最佳匹配" :show-more="false" style="width: 100%; margin-bottom: 10px;" />
    <div v-if="!productData.best.id" class="best-recommend-container card flex-middle">
      暂无推荐，请点击
      <a href="/guide/test">获取推荐</a>
    </div>
    <div v-else class="best-recommend-container card">
      <div class="best-recommend-title">根据您的偏好，认为它可能最适合您：</div>
      <div class="best-recommend-phone-name">{{ productData.best.name }}</div>
      <div class="best-recommend-title">选择它的理由：</div>
      <div class="best-recommend-item-container flex-wrapper">
        <div class="best-recommend-keyword flex-column">
          <a-row class="keyword-row">
            <a-col :span="8">
              <span>轻薄机身</span>
            </a-col>
            <a-col :span="8">
              <div style="margin: 10px;">
                长：约 163.6mm
                <br />宽：约 74.0mm
                <br />厚：约 8.26mm
                <br />重：约 193g
                <br />
              </div>
            </a-col>
          </a-row>
          <a-row class="keyword-row">
            <a-col :span="8">
              <span>时尚设计</span>
            </a-col>
            <a-col :span="8">
              <span>不可能的曲面</span>
            </a-col>
          </a-row>
          <a-row class="keyword-row">
            <a-col :span="8">
              <span>强劲性能</span>
            </a-col>
            <a-col :span="8">
              <span>骁龙888处理器</span>
            </a-col>
            <a-col :span="8">
              <span style="color: #eb4d4b;">Top2</span>
            </a-col>
          </a-row>
          <div class="best-recommend-title">更多亮点：</div>
          <div class="keyword-row">最大充电功率65W</div>
          <div class="keyword-row">屏下指纹</div>
          <div class="keyword-row">Sony IMX766 传感器，5000万广角摄像头</div>
          <a-row style="margin-top: 40px;">
            <a-col :span="8">
              <a :href="`/evaluation/details/${productData.best.id}`">
                <a-button type="primary" size="large" style="width: 200px; background-color: #017335;">
                  立即了解
                </a-button>
              </a> 
            </a-col>
            <a-col :span="8">
              <a-button type="link" style="width: 200px" href="/guide/test">重新测试</a-button>
            </a-col>
          </a-row>
        </div>
        <div class="right">
          <img
            class="phone-pic"
            src="https://image.oppo.com/content/dam/oppo/product-asset-library/find-x3-series/cn-find-x3-pro/v2/specs/assets/fussi_cn_1920.png"
          />
        </div>
      </div>
    </div>
    <template v-if="productData.other.length">
      <DivisionTitle title="其他推荐" style="width: 100%; margin: 40px 0 10px 0;" />
      <div class="second-recommend">
        <section v-for="phone in productData.other" :key="phone.id" class="second-item card-10-hover">
          <img :src="phone.cover_img" />
          <div class="phone-name flex-center">{{ phone.name }}</div>
        </section>
        <!-- <section class="card-10-hover">
          <img src="@/assets/mobile/XiaoMi-11-pro.png" />
          <div class="phone-name flex-center">小米11 Pro</div>
        </section>
        <section class="card-10-hover">
          <img src="@/assets/mobile/OnePlus-9-silver.png" />
          <div class="phone-name flex-center">一加9</div>
        </section> -->
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import DivisionTitle from "@/components/DivisionTitle.vue";
import request from "@/utils/request";

@Component({
  components: {
    DivisionTitle,
  }
})
export default class Guide extends Vue { 
  user: any = {};
  recommend: any = {};
  productData: any = {
    best: {},
    other: []
  };

  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  mounted() {
    this.getRecommend();
  }

  async getRecommend() {
    const response: any = await request.get(`http://localhost:3000/api/v1/product/recommend`, { userId: this.user.id })
    if (response.code === 0) {
      this.recommend = response.data;
      this.getBestProduct();
      this.getOtherProduct();
    }
  }

  async getBestProduct() {
    const response: any = await request.get(`http://localhost:3000/api/v1/product/${this.recommend.best}`)
    if (response.code === 0) {
      this.productData.best = response.data;
    }
  }

  async getOtherProduct() {
    const { others } = this.recommend;
    await others.forEach(async (id: number) => {
      const response: any = await request.get(`http://localhost:3000/api/v1/product/${id}`)
      if (response.code === 0) {
        this.productData.other.push(response.data);
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.guide {
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
}
.search {
  width: 500px;
  height: 40px;
}
.best-recommend-container {
  width: 100%;
  height: 600px;
  // border: 1px solid #d1d2d3;
}

.best-recommend-title {
  font-size: 20px;
  font-weight: 600;
  color: #281765;
}

.best-recommend-phone-name {
  font-size: 40px;
  font-weight: 600;
  margin-left: 60px;
  color: #017335;
}
.best-recommend-item-container {
  position: relative;
  .best-recommend-keyword {
    width: 200px;
    flex: 1;

    .user-tag {
      display: inline-flex;
      margin: 20px;
      padding: 10px;
      border: 1px solid red;
    }

    .keyword-row {
      margin: 5px 20px;
    }
  }
  .right {
    img {
      display: block;
      height: 400px;
    }
  }
  .video {
    height: 200px;
  }
}

.second-recommend {
  display: flex;
  // justify-content: space-between;
  width: 100%;

  & > section {
    width: 24%;

    & > img {
      width: calc(100% - 20px);
      height: 260px;
      margin: 0 auto;
    }
  }

  .second-item {
    margin: 0 10px;

    &:first-child {
      margin-left: 0;
    }
  }

  .phone-name {
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
  }
}
</style>
