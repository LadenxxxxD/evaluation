<template>
  <svg class="iconfont" aria-hidden="true" :style="fontStyle">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component({ name: 'IconFont' })
export default class IconFont extends Vue {
  @Prop({ type: String, default: '' })
  icon!: string;
  @Prop({ type: [String, Number], default: 16 })
  size!: string | number
  @Prop({ type: String, default: '' })
  color!: '';

  get fontStyle() {
    const sizeNumber = Number(this.size);
    return {
      fontSize: isNaN(sizeNumber) ? this.size : `${sizeNumber}px`,
      color: this.color
    }
  }

}
</script>

<style lang="scss" scoped>
.iconfont {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>