<template>
  <!-- <div class="rank-wrap"> -->
  <!-- <div class="rank-items">
      <RankMini></RankMini>
  </div>-->
  <SlideContainer>
    <SlidePage>
      <RankMini type="allSite" style="margin: 0 auto;"></RankMini>
    </SlidePage>
    <SlidePage>
      <RankMini type="userRate" style="margin: 0 auto;"></RankMini>
    </SlidePage>
    <SlidePage>
      <!-- <RankMini type="antutu" style="margin: 0 auto;"></RankMini> -->
      <div class="rank-title-container flex-middle">
        <img src="@/assets/rank/trophy.png" />
        <div class="rank-title">安兔兔排行</div>
        <img src="@/assets/rank/trophy.png" />
      </div>
      <div class="antutu-iframe-wrapper" ref="iframeContainer">
        <iframe
          src="http://www.antutu.com/ranking/rank1.htm"
          frameborder="0"
          width="1000"
          :height="height"
          class="antutu-iframe"
        ></iframe>
      </div>
    </SlidePage>
  </SlideContainer>
  <!-- <div class="rank-items"></div>
    <div class="rank-items"></div>
  <div class="rank-items"></div>-->
  <!-- </div> -->
</template>


<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import RankMini from '@/components/Rank/RankMini.vue';
import { SlideContainer, SlidePage } from 'vue-slidepage';

@Component({
  components: {
    RankMini,
    SlideContainer,
    SlidePage
  }
})
export default class Rank extends Vue {
  height = 0;

  mounted() {
    const { iframeContainer } = this.$refs;
    this.height = (iframeContainer as any).clientHeight + 80;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles";
.rank-wrap {
  // display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap;
  width: 700px;
  height: 800px;
  padding: 20px 40px;
  margin: 0 auto;
}
.rank-items {
  // width: 30%;
  // height: 400px;
  // border: 1px solid #d1d2d3;
  margin: 20px 0;
}
.rank-title-container {
  margin: 20px 0 40px 0;
  img {
    height: 36px;
    width: auto;
    margin: 10px 30px 0;
  }

  .rank-title {
    font-size: 40px;
    font-weight: bold;
    // color: #281765;
    color: #fed330;
  }
}
.antutu-iframe-wrapper {
  // height: 1000px;
  height: calc(100vh - 187px);
  width: 932px;
  overflow: hidden;
  margin: 0 auto;
}
.antutu-iframe {
  margin-top: -80px;
  margin-left: -30px;
}
</style>
