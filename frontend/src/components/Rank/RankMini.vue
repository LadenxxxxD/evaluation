<template>
  <div class="rank-mini-container">
    <div class="rank-title-container flex-middle">
      <img src="@/assets/rank/trophy.png" />
      <div class="rank-title">{{ typeDesc }}</div>
      <img src="@/assets/rank/trophy.png" />
    </div>
    <div class="rank-mini-top">
      <section>
        <div class="phone-pic-wrapper no2">
          <img
            class="phone-pic"
            :src="data[1].img"
          />
          <img src="https://rank.kkj.cn/images/no2.png" class="brand" />
        </div>
        <div class="flex-middle flex-column">
          <!-- <span class="phone-name">Oppo Find X3 Pro</span> -->
          <span class="phone-name">{{ data[1].name }}</span>
          <!-- <span>综合评分: 6293</span> -->
          <span>综合评分: {{ data[1].score }}</span>
        </div>
      </section>
      <section>
        <div class="phone-pic-wrapper no1">
          <img class="phone-pic" :src="data[0].img" />
          <img src="https://rank.kkj.cn/images/no1.png" class="brand no1" />
        </div>
        <div class="flex-middle flex-column">
          <!-- <span class="phone-name">一加9 Pro</span> -->
          <span class="phone-name">{{ data[0].name }}</span>
          <span>综合评分: {{ data[0].score }}</span>
        </div>
      </section>
      <section>
        <div class="phone-pic-wrapper no3">
          <img
            class="phone-pic"
            :src="data[2].img"
          />
          <img src="https://rank.kkj.cn/images/no3.png" class="brand" />
        </div>
        <div class="flex-middle flex-column">
          <span class="phone-name">{{ data[2].name }}</span>
          <span>综合评分: {{ data[2].score }}</span>
        </div>
      </section>
    </div>
    <div class="rank-mini-other">
      <template v-for="(item,index) in data">
        <section  v-if="index > 2" :key="item.id">
          <div class="brand-number flex-center-v">{{ index }}</div>
          <div class="phone-info flex-column flex-center">
            <span class="phone-name">{{ item.name }}</span>
            <span>综合评分: {{ item.score }}</span>
          </div>
          <div class="phone-img"></div>
        </section  >
      </template  >
      <!-- <section>
        <div class="brand-number flex-center-v">4</div>
        <div class="phone-info flex-column flex-center">
          <span class="phone-name">iphone 12</span>
          <span>综合评分: 6038</span>
        </div>
        <div class="phone-img"></div>
      </section> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import request from '@/utils/request';

@Component
export default class RankMini extends Vue {
  @Prop({ type: String })
  type!: string;

  data: Array<any> = [];

  get typeDesc() {
    const typeMap = new Map([
      ['allSite', '全站排行'],
      ['userRate', '用户评分'],
      ['antutu', '安兔兔'],
    ]);
    return typeMap.get(this.type);
  }

  mounted() {
    this.getRank();
  }

  async getRank() {
    // const response = await request.get(`/api/local/rank?type=${this.type}`);
    const response: any = await request.get(`http://localhost:3000/api/v1/rank?type=${this.type}`);
    console.log('response: ', response);
    if (response.code === 0) {
      this.data = response.data;
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-mini-container {
  height: 700px;
  width: 700px;
}

.rank-title-container {
  margin: 20px 0 40px 0;
  img {
    height: 36px;
    width: auto;
    margin: 10px 30px 0;
  }

  .rank-title {
    font-size: 40px;
    font-weight: bold;
    // color: #281765;
    color: #fed330;
  }
}
.rank-mini-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 200px;
  padding: 0 40px;

  section {
    .no1 {
      width: 180px;
      height: 180px;
    }
    .no2 {
      width: 140px;
      height: 140px;
    }
    .no3 {
      width: 140px;
      height: 140px;
    }

    .brand {
      position: absolute;
      bottom: 0px;
      left: 0px;

      &.no1 {
        width: 50px;
        height: 50px;
      }
    }
  }
}
.phone-pic {
  max-height: 100%;
  display: block;
  margin: auto;
}
.phone-pic-wrapper {
  position: relative;
  // overflow: hidden;
}
.phone-name {
  font-size: 18px;
  font-weight: 600;
}
.rank-mini-other {
  margin: 60px 0;
  section {
    margin: 20px 0;
    display: flex;
    background-color: #fff;
    height: 100px;
    border-radius: 50px;
    padding: 0 30px;
  }
  .brand-number {
    height: 100%;
    width: 100px;
    font-size: 28px;
    font-weight: 600;
    font-style: italic;
    color: #281765;
  }
  .phone-info {
    flex: 1;
  }
}
</style>
