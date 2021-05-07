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
            src="https://www.oppo.com/content/dam/oppo/product-asset-library/find-x3-series/cn-find-x3-pro/v2/assets/product-design-phone-black.png"
          />
          <img src="https://rank.kkj.cn/images/no2.png" class="brand" />
        </div>
        <div class="flex-middle flex-column">
          <span class="phone-name">Oppo Find X3 Pro</span>
          <span>综合评分: 6293</span>
        </div>
      </section>
      <section>
        <div class="phone-pic-wrapper no1">
          <img class="phone-pic" src="@/assets/mobile/OnePlus-9-pro-black.png" />
          <img src="https://rank.kkj.cn/images/no1.png" class="brand no1" />
        </div>
        <div class="flex-middle flex-column">
          <span class="phone-name">一加9 Pro</span>
          <span>综合评分: 6316</span>
        </div>
      </section>
      <section>
        <div class="phone-pic-wrapper no3">
          <img
            class="phone-pic"
            src="//i01.appmifile.com/webfile/globalimg/products/pc/mi11/phone2.png"
          />
          <img src="https://rank.kkj.cn/images/no3.png" class="brand" />
        </div>
        <div class="flex-middle flex-column">
          <span class="phone-name">小米11</span>
          <span>综合评分: 6122</span>
        </div>
      </section>
    </div>
    <div class="rank-mini-other">
      <section>
        <div class="brand-number flex-center-v">4</div>
        <div class="phone-info flex-column flex-center">
          <span class="phone-name">iphone 12</span>
          <span>综合评分: 6038</span>
        </div>
        <div class="phone-img"></div>
      </section>
      <section>
        <div class="brand-number flex-center-v">5</div>
        <div class="phone-info flex-column flex-center">
          <span class="phone-name">iphone 12</span>
          <span>综合评分: 6038</span>
        </div>
        <div class="phone-img"></div>
      </section>
      <section>
        <div class="brand-number flex-center-v">6</div>
        <div class="phone-info flex-column flex-center">
          <span class="phone-name">iphone 12</span>
          <span>综合评分: 6038</span>
        </div>
        <div class="phone-img"></div>
      </section>
      <section>
        <div class="brand-number flex-center-v">7</div>
        <div class="phone-info flex-column flex-center">
          <span class="phone-name">iphone 12</span>
          <span>综合评分: 6038</span>
        </div>
        <div class="phone-img"></div>
      </section>
      <section>
        <div class="brand-number flex-center-v">8</div>
        <div class="phone-info flex-column flex-center">
          <span class="phone-name">iphone 12</span>
          <span>综合评分: 6038</span>
        </div>
        <div class="phone-img"></div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class RankMini extends Vue {
  @Prop({ type: String })
  type!: string;

  get typeDesc() {
    const typeMap = new Map([
      ['allSite', '全站排行'],
      ['userRate', '用户评分'],
      ['antutu', '安兔兔'],
    ]);
    return typeMap.get(this.type);
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