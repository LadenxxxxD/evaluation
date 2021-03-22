<template>
  <div class="article-list">
    <img class="article-img" src="http://pic.zaeke.com/img161614266397195.jpeg" alt="article img" />
    <div class="content-container">
      <div class="author">
        <img class="avator" src="http://pic.zaeke.com/user_1533281476_2.png" alt="avator" />
        <span>Kururu</span>
      </div>
      <div class="article-list-title">2021年的游戏手机：风景这边独好</div>
      <div
        class="article-list-content"
      >今年第一季度是手游爱好者的盛宴，因为今年上半年智能手机厂商们纷纷采用了“早鸟”模式，导致整个3月发布的智能手机产品数量几乎赶上了去年整个上半年。在各种各样智能手...</div>
      <footer class="space-between">
        <div class="time">2021.03.19</div>
        <div class="custom-flex-wrapper">
          <div class="time">阅读: 20326</div>
          <div class="time" style="margin-left: 20px;">评论: 0</div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class ArticleList extends Vue {

}
</script>

<style lang="scss" scoped>
.article-list {
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  .article-img {
    height: 280px;
    width: 100%;
  }
}
.content-container {
  position: relative;
  background-color: #fff;
  padding: 0 20px 16px;

  .author {
    padding-left: 80px;
    padding-top: 6px;

    .avator {
      height: 64px;
      width: 64px;
      border-radius: 50%;
      padding: 6px;
      background-color: #fff;
      position: absolute;
      top: -32px;
      left: 20px;
    }
  }
}

.article-list-title {
  font-size: 20px;
  color: #333;
  line-height: 36px;
  margin: 12px 0;
}
.article-list-content {
  margin: 12px 0;
}
</style>