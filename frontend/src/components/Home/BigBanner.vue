<template>
  <div class="top-bigbanner">
    <div class="top-bigbanner-main">
      <img :src="images[0]" alt="1" />
    </div>
    <div class="top-bigbanner-column">
      <template v-for="img, i in images">
        <div class="top-bigbanner-second" v-if="i !== 0" :key="img">
          <img :src="img" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import request from "@/utils/request";

@Component
export default class BigBanner extends Vue {
  images: Array<string> = [];

  mounted() {
    this.getBanner();
  }

  async getBanner() {
    const response: any = await request.get("http://localhost:3000/api/v1/banner");
    console.log('response: ', response);
    const data = response.data || [];
    this.images = data.map((item: any) => item.url)
  }
}
</script>

<style lang="scss" scoped>
.top-bigbanner {
  display: flex;
  z-index: 0;

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
