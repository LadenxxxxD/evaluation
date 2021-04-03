<template>
  <div class="test-container">
    <div class="test-title-big">
      基本信息
      <span style="font-size: 14px; font-weight: 400;">用于筛选用户群体</span>
    </div>
    <div class="test-title">我的性别</div>
    <div class="test-component">
      <a-radio-group default-value="gender" button-style="solid">
        <a-radio-button value="gender" style="width: 80px; text-align: center;">男</a-radio-button>
        <a-radio-button value="womon" style="width: 80px; text-align: center;">女</a-radio-button>
      </a-radio-group>
    </div>
    <div class="test-title">我的年龄</div>
    <div class="test-component">
      <a-slider :default-value="22" :tooltip-visible="true" />
    </div>
    <div class="test-title-big">
      需求信息
      <span style="font-size: 14px; font-weight: 400;">请勾选您所重视的需求项</span>
    </div>
    <div class="test-title">我预期购买手机的价格段</div>
    <div class="test-component">
      <a-slider range :default-value="[20, 50]" :min="600" :max="20000" />
    </div>
    <div class="test-title">多数时候，我更倾向使用手机</div>
    <div class="test-component">
      <a-radio-group default-value="a">
        <a-radio value="a">追剧/看番</a-radio>
        <a-radio value="b">微博/微信</a-radio>
        <a-radio value="c">游戏狂魔</a-radio>
        <a-radio value="d">没有明确的目标</a-radio>
      </a-radio-group>
    </div>
    <div class="test-title">我更注重使用手机过程中的</div>
    <div class="test-component">
      <a-radio-group default-value="a">
        <a-radio value="a">极致性能</a-radio>
        <a-radio value="b">操作体验</a-radio>
        <a-radio value="c">外观</a-radio>
        <a-radio value="d">能用就行</a-radio>
      </a-radio-group>
    </div>
    <div class="test-title">我喜欢以下颜色作为手机配色</div>
    <div class="test-component">
      <a-radio-group default-value="a">
        <a-radio value="a">黑色</a-radio>
        <a-radio value="b">白色</a-radio>
        <a-radio value="c">青色</a-radio>
        <a-radio value="c">多彩</a-radio>
        <a-radio value="d">都能接受</a-radio>
      </a-radio-group>
    </div>
    <div class="test-title">我想从这些品牌中挑选</div>
    <div class="test-component">
      <a-checkbox-group>
        <a-checkbox value="apple">苹果</a-checkbox>
        <a-checkbox value="samsong">三星</a-checkbox>
        <a-checkbox value="huawei">华为</a-checkbox>
        <a-checkbox value="xiaomi">小米</a-checkbox>
        <a-checkbox value="oppo">OPPO</a-checkbox>
        <a-checkbox value="vivo">VIVO</a-checkbox>
        <a-checkbox value="oneplus">一加</a-checkbox>
        <a-checkbox value="meizu">魅族</a-checkbox>
        <a-checkbox value="smart">锤子</a-checkbox>
        <a-checkbox value="redmi">红米</a-checkbox>
        <a-checkbox value="honor">荣耀</a-checkbox>
        <a-checkbox value="realme">Real Me</a-checkbox>
        <a-checkbox value="IQOO">IQOO</a-checkbox>
      </a-checkbox-group>
    </div>
    <a-row style="margin-top: 40px;">
      <a-col :span="4" :offset="1">
        <a-button>取消</a-button>
      </a-col>
      <a-col :span="4">
        <a-button type="primary">确定</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class GuideTest extends Vue {

}
</script>

<style lang="scss" scoped>
.test-container {
  width: 1000px;
  margin: 0 auto;
}
.test-title {
  font-size: 20px;
  font-weight: 600;
  color: #281765;
  margin: 30px 20px;
}
.test-title-big {
  @extend .test-title;
  font-size: 28px;
  margin: 30px 0;
}
.test-component {
  width: 600px;
  margin: 10px 40px;
}
</style>