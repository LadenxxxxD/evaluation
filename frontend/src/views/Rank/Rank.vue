<template>
  <div class="rank-wrap">
    <div class="rank-items">
      <RankMini></RankMini>
    </div>
    <!-- <div class="rank-items"></div>
    <div class="rank-items"></div>
    <div class="rank-items"></div>-->
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import RankMini from '@/components/Rank/RankMini.vue';

@Component({
  components: {
    RankMini
  }
})
export default class Rank extends Vue {

}
</script>

<style lang="scss" scoped>
@import "@/styles";
.rank-wrap {
  // display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap;
  width: 700px;
  padding: 20px 40px;
  margin: 0 auto;
}
.rank-items {
  // width: 30%;
  // height: 400px;
  // border: 1px solid #d1d2d3;
  margin: 20px 0;
}
</style>
