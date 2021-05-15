<template>
  <div class="eva-main-container">
    <!-- <router-link to="/rank/mobile">查看安兔兔排行</router-link> -->
    <a href="/evaluation/details/123">
      <section class="card-10-hover">
        <img
          src="https://www.oppo.com/content/dam/oppo/product-asset-library/find-x3-series/cn-find-x3-pro/v2/assets/product-design-phone-black.png"
        />
        <div class="phone-name flex-center">OPPO Find X3 Pro</div>
      </section>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class Evaluation extends Vue {

}
</script>

<style lang="scss" scoped>
.eva-main-container {
  width: 1000px;
  margin: 40px auto;
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
