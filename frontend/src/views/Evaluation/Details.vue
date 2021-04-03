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
          <div>CPU： 高通骁龙888</div>
          <div>内存： 8GB/12GB</div>
          <div>电池： 4500mAh</div>
          <div>后置： 5000万广角主摄 + 5000万超广角 + 1300万长焦 + 300万显微镜镜头</div>
          <div>屏幕尺寸： 6.7英寸</div>
          <div>屏幕分辨率： 3216x1440</div>
        </div>
        <div class="phone-rate">
          用户评分：
          <a-rate :default-value="4.5" allowHalf disabled style="margin-right: 40px;" />测评分数： 6436
        </div>
      </div>
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

@Component({
  components: {
    DivisionTitle
  }
})
export default class Details extends Vue {

}
</script>

<style lang="scss" scoped>
.details-main-container {
  width: 1000px;
  margin: 0 auto;
}
.baseinfo-container {
  height: 500px;
}
.left-img-container {
  height: 500px;
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
    margin: 20px 0;
  }
}
.phone-rate {
  font-size: 16px;
  font-weight: 600;
  margin: 30px 0;
}
</style>