<template>
  <!-- <main class="main-body-container"> -->
  <div style="max-width: 1200px; margin: 20px auto;">
    <DivisionTitle title="推荐" />
    <div class="home">
      <div class="left">
        <BigBanner />
        <div class="news">
          <div class="article-list">
            <ArticleList />
          </div>
        </div>
      </div>
        <div class="right-panel">
          <!-- <a-affix :offset-top="120" :target="() => document.querySelector('#main')" class="right-panel"> -->
            <section class="right-panel-controller"></section>
          <!-- <div class="info short"></div>
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
          <div class="info"></div> -->
          <!-- </a-affix> -->
        </div>
    </div>
  </div>
  <!-- </main> -->
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import DivisionTitle from "@/components/DivisionTitle.vue";
import BigBanner from "@/components/Home/BigBanner.vue";
import ArticleList from "@/components/Home/ArticleList.vue";
import request from "@/utils/request";

@Component({
  components: {
    BigBanner,
    DivisionTitle,
    ArticleList
  }
})
export default class Home extends Vue { }
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
.right-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px 0;
  position: sticky;
  top: 120px;
  // width: calc(1200px - 880px);
  // right: calc((100% - 1200px) / 2 + 10px);
  
  .right-panel-controller {
    padding: 30px 20px;
    height: 300px;
    background-color: #fff;
  }
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
  .article-list {
    width: 860px;
    // border: 1px solid #d1d2d3;
    margin: 0 0 10px 0;
    // padding: 20px;
    box-sizing: border-box;
  }
}
</style>
