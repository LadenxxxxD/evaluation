<template>
  <div class="division-title space-between">
    <span>{{ title }}</span>
    <a v-if="showMore" @click="onMoreClick">{{ moreText }}</a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class DivisionTitle extends Vue {
  @Prop({ type: String, default: 'title' })
  title!: string;
  @Prop({ type: Boolean, default: true })
  showMore!: boolean;
  @Prop({ type: String, default: '查看更多' })
  moreText!: string;

  onMoreClick() {
    this.$emit('moreClick');
  }
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

.division-title {
  background-color: #fff;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  border-radius: 4px;
  z-index: 0;

  a {
    font-size: 12px;
    font-weight: normal;
    // color: #0a28f4;
    color: $mainColor;
  }
}
</style>
