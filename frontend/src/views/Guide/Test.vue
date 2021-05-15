<template>
  <div class="test-container">

    <b-steps
      v-model="activeStep"
      vertical
      icon-prev="chevron-left"
      icon-next="chevron-right"
      position="is-left"
      label-position="bottom"
      :has-navigation="true"
    >
      <b-step-item step="1" :clickable="true" label="基本信息" class="test-step-area">
        <div class="test-title-big">
          基本信息
          <span style="font-size: 14px; font-weight: 400;">用于筛选用户群体</span>
        </div>
        <div class="test-title">我的性别</div>
        <div class="test-component">
          <!-- <a-radio-group default-value="gender" button-style="solid">
            <a-radio-button value="gender" style="width: 80px; text-align: center;">男</a-radio-button>
            <a-radio-button value="womon" style="width: 80px; text-align: center;">女</a-radio-button>
          </a-radio-group> -->
          <b-radio 
            v-model="gender"
            native-value="1">
            男
          </b-radio>
          <b-radio
            v-model="gender"
            native-value="0">
            女
          </b-radio>
        </div>
        <div class="test-title">我的年龄</div>
        <div class="test-component">
          <!-- <a-slider :default-value="22" :tooltip-visible="true" /> -->
          <b-field>
            <b-slider :value="22" indicator lazy :tooltip="false" tooltip-always></b-slider>
          </b-field>
        </div>
      </b-step-item>

      <b-step-item step="2" label="需求信息" :clickable="true" class="test-step-area">
        <div class="test-title-big">
          需求信息
          <span style="font-size: 14px; font-weight: 400;">请勾选您重视的需求项</span>
        </div>
        <div class="test-title">我预期购买手机的价格段</div>
        <div class="test-component">
          <!-- <a-slider range :default-value="[20, 50]" :min="600" :max="20000" /> -->
          <b-slider v-model="priceRange" indicator :tooltip="false" type="is-danger" :min="600" :max="10000" :step="100"></b-slider>
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
      </b-step-item>

      <b-step-item step="3" label="详细需求" :clickable="true" class="test-step-area">
        <div class="test-title-big">
          详细需求
          <span style="font-size: 14px; font-weight: 400;">请勾选您重视的需求项</span>
        </div>
        <div class="test-title">我喜欢以下颜色作为手机配色</div>
        <div class="test-component">
          <a-radio-group default-value="a">
            <a-radio value="a">黑色</a-radio>
            <a-radio value="b">白色</a-radio>
            <a-radio value="c">青色</a-radio>
            <a-radio value="d">多彩</a-radio>
            <a-radio value="e">都能接受</a-radio>
          </a-radio-group>
        </div>
        <div class="test-title">我想从这些品牌中挑选</div>
        <div class="test-component">
          <a-checkbox-group>
            <b-checkbox v-model="brands" native-value="apple">苹果</b-checkbox>
            <b-checkbox v-model="brands" native-value="samsong">三星</b-checkbox>
            <b-checkbox v-model="brands" native-value="huawei">华为</b-checkbox>
            <b-checkbox v-model="brands" native-value="xiaomi">小米</b-checkbox>
            <b-checkbox v-model="brands" native-value="oppo">OPPO</b-checkbox>
            <b-checkbox v-model="brands" native-value="vivo">VIVO</b-checkbox>
            <b-checkbox v-model="brands" native-value="oneplus">一加</b-checkbox>
            <b-checkbox v-model="brands" native-value="meizu">魅族</b-checkbox>
            <b-checkbox v-model="brands" native-value="oneplus">一加</b-checkbox>
            <b-checkbox v-model="brands" native-value="oneplus">一加</b-checkbox>
            <b-checkbox v-model="brands" native-value="oneplus">一加</b-checkbox>
            <b-checkbox v-model="brands" native-value="oneplus">一加</b-checkbox>
            <b-checkbox v-model="brands" native-value="oneplus">一加</b-checkbox>
            <!-- <a-checkbox value="apple">苹果</a-checkbox>
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
            <a-checkbox value="IQOO">IQOO</a-checkbox> -->
          </a-checkbox-group>
        </div>
      </b-step-item>
      <template #navigation="{previous, next}">
        <div style="display: flex; flex-direction: row-reverse; width: 100%; padding: 40px 40px;">
          <b-button type="is-success" style="margin: 0 20px;" :disabled="next.disabled" @click.prevent="next.action">下一页</b-button>
          <b-button type="is-link is-light" style="margin: 0 20px;" :disabled="previous.disabled" @click.prevent="previous.action">上一页</b-button>
        </div>
      </template>
    </b-steps>





    <div style="margin: 40px auto; width: 200px; display: flex; justify-content: space-between;">
        <b-button type="is-link" outlined @click="goGuide">取消</b-button>
        <b-button type="is-link" @click="goGuide">提交</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class GuideTest extends Vue {
  activeStep = '2';
  gender = 1;
  brands: Array<string> = [];
  priceRange: Array<number> = [1000, 2000];

  goGuide() {
    this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
.test-container {
  width: 1000px;
  margin: 0 auto 20px;
  padding: 30px 50px;
  background-color: #fff;
}
.test-title {
  font-size: 20px;
  font-weight: 600;
  // color: #281765;
  // color: #7957d5;
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
.test-step-area {
  margin-left: 100px;
  height: calc(100vh - 300px);
  &:focus {
    outline: none;
  }
}
</style>
