<template>
  <div style="max-width: 1200px; margin: 20px auto;">
    <DivisionTitle></DivisionTitle>
    <div class="home">
      <div class="left">
        <BigBanner />
        <div class="news">
          <div>
            <div class="info short"></div>
            <div class="info"></div>
            <div class="info"></div>
          </div>
          <div>
            <div class="info short"></div>
            <div class="info"></div>
            <div class="info"></div>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="right">
        <div class="info short"></div>
        <div class="info"></div>
        <div class="info"></div>
        <div class="info short"></div>
        <div class="info"></div>
        <div class="info"></div>
        <div class="info short"></div>
        <div class="info"></div>
        <div class="info"></div>
        <div class="info short"></div>
        <div class="info"></div>
        <div class="info"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import DivisionTitle from "@/components/DivisionTitle.vue";
import BigBanner from "@/components/Home/BigBanner.vue";
import Axios from "axios";
import request from "@/utils/request";

@Component({
  components: {
    BigBanner,
    DivisionTitle,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
}
.left {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 0;
}
.right {
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #d1d2d3;
  margin: 20px 0;
  padding: 30px 20px;
}
.info {
  width: 100%;
  height: 16px;
  background-color: #d1d2d3;
  margin: 0 0 10px 0;

  &.short {
    width: 60%;
  }
}
.news {
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  & > div {
    width: 100%;
    height: 100px;
    border: 1px solid #d1d2d3;
    margin: 0 0 10px 0;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
