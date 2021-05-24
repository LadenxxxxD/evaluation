<template>
  <div class="eva-main-container">
    <!-- <router-link to="/rank/mobile">查看安兔兔排行</router-link> -->
    <DivisionTitle title="热门测评" style="margin-bottom: 10px;"></DivisionTitle>
    <div class="product-container">
      <a v-for="product in productList" :key="product.id" :href="`/evaluation/details/${product.id}`" style="margin: 10px;">
        <section class="card-10-hover">
          <img :src="product['cover_img']"/>
          <!-- <img
            src="https://www.oppo.com/content/dam/oppo/product-asset-library/find-x3-series/cn-find-x3-pro/v2/assets/product-design-phone-black.png"
          /> -->
          <div class="phone-name flex-center">{{ product.name }}</div>
        </section>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import DivisionTitle from '@/components/DivisionTitle.vue';
import IconFont from '@/components/IconFont.vue';
import request from "@/utils/request";

@Component({
  components: {
    DivisionTitle,
    IconFont
  }
})
export default class Evaluation extends Vue {
  productList: Array<any> = [];
  
  mounted() {
    this.getProductList();
  }

  async getProductList(): Promise<void> {
    const response: any = await request.get('http://localhost:3000/api/v1/product/all');
    if (response.code === 0) {
      this.productList = response.data;
    }
  }
}
</script>

<style lang="scss" scoped>
.eva-main-container {
  width: 1120px;
  margin: 20px auto;
}
.product-container {
  display: flex;
  flex-wrap: wrap;
}
section {
  height: 300px;
  width: 260px;

  & > img {
    width: calc(100% - 20px);
    height: 260px;
    margin: 0 auto;
  }
}
</style>
