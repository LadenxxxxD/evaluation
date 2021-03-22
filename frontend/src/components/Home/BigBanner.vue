<template>
  <div class="top-bigbanner">
    <div class="top-bigbanner-main">
      <img src="//nwzimg.wezhan.cn/contents/sitefiles2035/10175394/images/20226789.jpg" alt="1" />
    </div>
    <div class="top-bigbanner-column">
      <div class="top-bigbanner-second">
        <img src="//nwzimg.wezhan.cn/contents/sitefiles2035/10175394/images/20226752.jpg" />
      </div>
      <div class="top-bigbanner-second">
        <img src="http://pic.zaeke.com/img161527818228639.jpeg" />
      </div>
      <div class="top-bigbanner-second">
        <img src="http://pic.zaeke.com/img161527821198819.jpeg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import request from "@/utils/request";

@Component
export default class BigBanner extends Vue {
  mounted() {
    request.get("http://localhost:3000/api/v1/banner");
  }
}
</script>

<style lang="scss" scoped>
.top-bigbanner {
  display: flex;

  & img {
    height: 100%;
    width: 100%;
  }
}
.top-bigbanner-main {
  height: 400px;
  width: 600px;
  border: 1px solid #d1d2d3;
}
.top-bigbanner-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > .top-bigbanner-second {
    width: 250px;
    height: 120px;
    border: 1px solid #d1d2d3;
    margin: 0 0 0 10px;
  }
}
</style>
