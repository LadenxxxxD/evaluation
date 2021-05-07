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
        <section class="right-panel-controller">
          <div class="custom-row" style="margin-bottom: 10px;">
            <a-avatar
              :size="64"
              src="https://pic1.zhimg.com/v2-a97b59854b5dd12e8ba2d0e32abec7c3_is.jpg"
            ></a-avatar>
            <div style="margin: 5px 20px;">
              <div class="info-username">用户名</div>
              <div style="margin-top: 5px;">
                <b-tag type="is-info is-light" size="is-small">Lv 6</b-tag>
                <b-tag type="is-primary" style="margin: 0 10px;">测评达人</b-tag>
              </div>
            </div>
          </div>
          <div class="custom-row flex-space-between" style="padding: 10px;">
            <div class="flex-column flex-middle">
              <span style="font-weight: 600;">4</span>
              <span style="font-size: 12px;">创作</span>
            </div>
            <a-divider type="vertical" style="height: unset;" />
            <div class="flex-column flex-middle">
              <span style="font-weight: 600;">33</span>
              <span style="font-size: 12px;">关注</span>
            </div>
            <a-divider type="vertical" style="height: unset;" />
            <div class="flex-column flex-middle">
              <span style="font-weight: 600;">12</span>
              <span style="font-size: 12px;">收藏</span>
            </div>
            <a-divider type="vertical" style="height: unset;" />
            <div class="flex-column flex-middle">
              <span style="font-weight: 600;">44</span>
              <span style="font-size: 12px;">最近浏览</span>
            </div>
          </div>
          <div class="custom-row flex-space-between" style="padding: 10px;">
            <a href="/article/write" class="flex-column flex-middle" style="color: #2c3e50;">
              <!-- <svg class="iconfont login-title-logo" aria-hidden="true" style="font-size: 28px;">
                <use xlink:href="#icon-bianxie" />
              </svg>-->
              <IconFont icon="bianxie" :size="36" />
              <span style="font-size: 12px;">写评测</span>
            </a>
            <div class="flex-column flex-middle">
              <IconFont icon="chakan1" :size="36" />
              <span style="font-size: 12px;">看评测</span>
            </div>
            <div class="flex-column flex-middle">
              <IconFont icon="jiangbei" :size="36" />
              <span style="font-size: 12px;">看排名</span>
            </div>
            <div class="flex-column flex-middle">
              <IconFont icon="aixin" :size="36" />
              <span style="font-size: 12px;">获取推荐</span>
            </div>
          </div>
        </section>
        <section>
          <div class="info-username">近期活动</div>
          <div style="min-height: 100px;">
            <a-empty :image="emptyImage" description="暂无活动"></a-empty>
          </div>
        </section>
      </div>
    </div>
  </div>
  <!-- </main> -->
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { Empty } from 'ant-design-vue';
import DivisionTitle from "@/components/DivisionTitle.vue";
import BigBanner from "@/components/Home/BigBanner.vue";
import ArticleList from "@/components/Home/ArticleList.vue";
import IconFont from "@/components/IconFont.vue";
import request from "@/utils/request";

@Component({
  components: {
    BigBanner,
    DivisionTitle,
    ArticleList,
    IconFont
  }
})
export default class Home extends Vue {
  emptyImage = Empty.PRESENTED_IMAGE_SIMPLE
}
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

  & > section {
    padding: 30px 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
  }

  // .right-panel-controller {
  //   padding: 30px 20px;
  //   // height: 300px;
  //   background-color: #fff;
  // }

  .custom-row {
    display: flex;
  }

  .info-username {
    font-weight: 600;
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
