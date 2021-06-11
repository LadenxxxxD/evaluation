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
        <div class="test-title">性别</div>
        <div class="test-component">
          <b-radio v-model="formData.gender" native-value="1"> 男 </b-radio>
          <b-radio v-model="formData.gender" native-value="0"> 女 </b-radio>
        </div>
        <div class="test-title">年龄</div>
        <div class="test-component">
          <b-slider :value="formData.age" indicator lazy :tooltip="false" tooltip-always></b-slider>
        </div>
        <div class="test-title">身份</div>
        <div class="test-component">
          <b-radio v-model="formData.identity" :native-value="1"> 学生 </b-radio>
          <b-radio v-model="formData.identity" :native-value="2"> 打工人 </b-radio>
          <b-radio v-model="formData.identity" :native-value="3"> 公职人员 </b-radio>
          <b-radio v-model="formData.identity" :native-value="0"> 其他 </b-radio>
        </div>
      </b-step-item>

      <b-step-item step="2" label="需求信息" :clickable="true" class="test-step-area">
        <div class="test-title-big">
          需求信息
          <span style="font-size: 14px; font-weight: 400;">请勾选您重视的需求项</span>
        </div>
        <div class="test-title">我更注重使用手机过程中的</div>
        <div class="test-component">
          <a-radio-group default-value="a">
            <b-radio v-model="formData.usage" :native-value="1"> 外观颜值 </b-radio>
            <b-radio v-model="formData.usage" :native-value="2"> 操作体验 </b-radio>
            <b-radio v-model="formData.usage" :native-value="3"> 极致性能 </b-radio>
            <b-radio v-model="formData.usage" :native-value="0"> 能用就行 </b-radio>
          </a-radio-group>
        </div>
        <div class="test-title">多数时候，我更倾向使用手机</div>
        <div class="test-component">
          <a-radio-group default-value="a">
            <b-radio v-model="formData.scenery" :native-value="1"> 微博/微信 </b-radio>
            <b-radio v-model="formData.scenery" :native-value="2"> 追剧/看番 </b-radio>
            <b-radio v-model="formData.scenery" :native-value="3"> 游戏狂魔 </b-radio>
            <b-radio v-model="formData.scenery" :native-value="0"> 没有明确使用场景 </b-radio>
          </a-radio-group>
        </div>
        <div class="test-title">该手机将作为我的</div>
        <div class="test-component">
          <a-radio-group default-value="a">
            <b-radio v-model="formData.pa" :native-value="4"> 主力机/长期使用 </b-radio>
            <b-radio v-model="formData.pa" :native-value="3"> 过渡机 </b-radio>
            <b-radio v-model="formData.pa" :native-value="2"> 老年机 </b-radio>
            <b-radio v-model="formData.pa" :native-value="1"> 学生机 </b-radio>
            <b-radio v-model="formData.pa" :native-value="0"> 没有明确使用场景 </b-radio>
          </a-radio-group>
        </div>
        <div class="test-title">手机续航能力是我选择的一项重要指标</div>
        <div class="test-component">
          <a-radio-group default-value="a">
            <b-radio v-model="formData.battery" :native-value="1"> 是 </b-radio>
            <b-radio v-model="formData.battery" :native-value="0"> 否 </b-radio>
          </a-radio-group>
        </div>
        <div class="test-title">对于屏幕，我更倾向于</div>
        <div class="test-component">
          <a-radio-group default-value="a">
            <b-radio v-model="formData.size" :native-value="2"> 屏幕更大 </b-radio>
            <b-radio v-model="formData.size" :native-value="1"> 更钟意小屏幕 </b-radio>
            <b-radio v-model="formData.size" :native-value="0"> 无所谓 </b-radio>
          </a-radio-group>
        </div>
        <div class="test-title">我对手机重量有要求</div>
        <div class="test-component">
          <a-radio-group default-value="a">
            <b-radio v-model="formData.light" :native-value="1"> 更轻 </b-radio>
            <b-radio v-model="formData.light" :native-value="0"> 无所谓 </b-radio>
          </a-radio-group>
        </div>
      </b-step-item>

      <b-step-item step="3" label="详细需求" :clickable="true" class="test-step-area">
        <div class="test-title-big">
          详细需求
          <span style="font-size: 14px; font-weight: 400;">请勾选您重视的需求项</span>
        </div>
        <div class="test-title">我预期购买手机的价格段</div>
        <div class="test-component">
          <b-slider v-model="formData.priceRange" indicator :tooltip="false" type="is-danger" :min="600" :max="10000" :step="100"></b-slider>
        </div>
        <div class="test-title">我喜欢以下颜色作为手机配色</div>
        <div class="test-component">
            <b-checkbox v-model="formData.color" native-value="black">黑色</b-checkbox>
            <b-checkbox v-model="formData.color" native-value="white">白色</b-checkbox>
            <b-checkbox v-model="formData.color" native-value="blue">青色</b-checkbox>
            <b-checkbox v-model="formData.color" native-value="colorful">多彩</b-checkbox>
            <b-checkbox v-model="formData.color" native-value="any">都能接受</b-checkbox>
        </div>
        <div class="test-title">我想从这些品牌中挑选</div>
        <div class="test-component">
          <b-checkbox v-model="formData.brands" native-value="apple">苹果</b-checkbox>
          <b-checkbox v-model="formData.brands" native-value="samsong">三星</b-checkbox>
          <b-checkbox v-model="formData.brands" native-value="huawei">华为</b-checkbox>
          <b-checkbox v-model="formData.brands" native-value="xiaomi">小米</b-checkbox>
          <b-checkbox v-model="formData.brands" native-value="oppo">OPPO</b-checkbox>
          <b-checkbox v-model="formData.brands" native-value="vivo">VIVO</b-checkbox>
          <b-checkbox v-model="formData.brands" native-value="oneplus">一加</b-checkbox>
          <b-checkbox v-model="formData.brands" native-value="meizu">魅族</b-checkbox>
          <b-checkbox v-model="formData.brands" native-value="oneplus">一加</b-checkbox>
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
        <b-button type="is-link" @click="submit">提交</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import user from "@/store/user";
import request from "@/utils/request";
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class GuideTest extends Vue {
  activeStep = '2';
  user: any = {};
  formData: any = {
    gender: 1,
    age: 22,
    identity: 0,

    usage: 0,
    scenery: 0,
    battery: 0,
    size: 0,
    light: 0,

    priceRange: [1000, 2000],
    color: [],
    brands: []
  }

  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  goGuide() {
    this.$router.push('/guide');
  }

  generateTags(): Array<string> {
    const tags = [];
    const { usage ,scenery, size, light, battery } = this.formData;
    switch (usage) {
      case 3:
        tags.push('旗舰性能');
        break;
      case 2:
        tags.push('体验好');
        break;
      case 1:
        tags.push('高颜值');
        break;
      default:
        break;
    }
    switch (scenery) {
      case 3:
        tags.push('旗舰性能');
        break;
      case 2:
        tags.push('性能良好');
        break;
      case 1:
        break;
        default:
        break;
    }
    switch (size) {
      case 2:
        tags.push('大屏幕');
        break;
      case 1:
        tags.push('小屏幕');
        break;
        default:
        break;
    }
    switch (light) {
      case 1:
        tags.push('重量轻');
        break;
      case 0:
        break;
        default:
        break;
    }
    switch (battery) {
      case 1:
        tags.push('大容量电池');
        break;
      case 0:
        break;
        default:
        break;
    }
    return tags;
  }

  async submit() {
    const tags = this.generateTags();
    const { color, priceRange, brands } = this.formData || [];
    const colors = color.includes('any') ? null : this.formData.color;
    const response: any = await request.post(
      'http://localhost:3000/api/v1/product/recommend',
      {
        userId: this.user.id,
        price: priceRange,
        brands,
        colors,
        tags,
      }
    );
    if (response.code === 0) {
      this.$toast.open({
        type: 'is-success',
        duration: 5000,
        message: '提交成功'
      });
      this.goGuide();
    } else {
      this.$toast.open({
        type: 'is-danger',
        duration: 5000,
        message: `提交失败：${response.message}`
      });
    }
  }

}
</script>

<style lang="scss" scoped>
.test-container {
  width: 1000px;
  margin: 20px auto;
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
  min-height: calc(100vh - 300px);
  &:focus {
    outline: none;
  }
}
</style>
