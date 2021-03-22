<template>
  <div class="division-title space-between">
    <span>推荐</span>
    <a href="#">查看更多</a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class DivisionTitle extends Vue { };
</script>

<style lang="scss">
@import "../styles/variables.scss";

.division-title {
  background-color: #f5f5f5;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  border-radius: 4px;

  a {
    font-size: 12px;
    font-weight: normal;
    // color: #0a28f4;
    color: $mainColor;
  }
}
</style>