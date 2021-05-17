<template>
  <div class="details-main-container">
    <div class="baseinfo-container flex-wrapper">
      <div class="left-img-container">
        <img
          src="//img12.360buyimg.com/n1/s450x450_jfs/t1/176279/28/492/99476/605d884fE19b32d50/a3c973652799afa2.jpg"
        />
      </div>
      <div class="right-info-container">
        <h1 class="phone-name-title">OPPO Find X3 Pro</h1>
        <div class="phone-info">
          <div class="baseinfo-row">
              <icon-font icon="CPU" :size="26" />
              <span style="font-weight: 600; margin-left: 8px;">CPU： </span>
              <span>高通骁龙888</span>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="neicun" :size="26" />
              <span style="font-weight: 600; margin-left: 8px;">内存： </span>
              <span>8GB/12GB</span>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="cunchu" :size="24" />
              <span style="font-weight: 600; margin-left: 8px;">存储： </span>
              <span>128GB/256GB/512GB</span>
          </div>
          <div class="baseinfo-row" style="align-items: start;">
              <icon-font icon="shexiangtou" :size="24" style="color: #fff;" />
              <span style="font-weight: 600; margin-left: 8px;">后置摄像头： </span>
              <div style="display: flex; flex-direction: column; align-self: start;">
                <span>5000万主摄</span>
                <span>5000万超广角</span>
                <span>1300万长焦</span>
                <span>300万显微镜镜头</span>
              </div>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="shexiangtou1" :size="24" style="color: #194abd;" />
              <span style="font-weight: 600; margin-left: 10px;">前置摄像头： </span>
              <span>3200万</span>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="phone" :size="26" style="color: #59a292;" />
              <span style="font-weight: 600; margin-left: 8px;">屏幕尺寸： </span>
              <span>6.7英寸</span>
          </div>
          <div class="baseinfo-row">
              <icon-font icon="fenbianlv" :size="22" style="color: #d352a3;" />
              <span style="font-weight: 600; margin-left:10px;">屏幕分辨率： </span>
              <span>3216x1440</span>
          </div>
          <!-- <div>CPU： 高通骁龙888</div>
          <div>内存： 8GB/12GB</div>
          <div>电池： 4500mAh</div>
          <div>后置： 5000万广角主摄 + 5000万超广角 + 1300万长焦 + 300万显微镜镜头</div>
          <div>屏幕尺寸： 6.7英寸</div>
          <div>屏幕分辨率： 3216x1440</div> -->
        </div>
      </div>
    </div>
    <div class="phone-rate">
      <section></section>
      <span>用户评分：</span>
      <!-- <a-rate :default-value="4.5" size="large" allowHalf disabled style="margin-right: 40px;" /> -->
      <b-rate v-model="rate" icon-pack="fas" size="is-large" show-score spaced></b-rate>
      <span>测评分数： </span>
      <span>6342</span>
    </div>
    <div class="details-info">
      <DivisionTitle title="详细参数"></DivisionTitle>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import DivisionTitle from '@/components/DivisionTitle.vue';
import IconFont from '@/components/IconFont.vue';

@Component({
  components: {
    DivisionTitle,
    IconFont
  }
})
export default class Details extends Vue {
  rate: number = 4.8;
}
</script>

<style lang="scss" scoped>
.details-main-container {
  width: 1000px;
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
  font-size: 16px;
  font-weight: 600;
  margin: 30px 0;
  padding: 10px 40px;
  background-color: #fff;
}
</style>
