<template>
  <div>
    <div class="antutu-iframe-wrapper" ref="iframeContainer">
      <iframe
        src="http://www.antutu.com/ranking/rank1.htm"
        frameborder="0"
        width="1000"
        :height="height"
        class="antutu-iframe"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class AntutuIframe extends Vue {
  height = 0;
  mounted() {
    const { iframeContainer } = this.$refs;
    this.height = (iframeContainer as any).clientHeight + 80;
  }
}
</script>

<style lang="scss" scoped>
.antutu-iframe-wrapper {
  height: 1000px;
  width: 932px;
  overflow: hidden;
  margin: 0 auto;
}
.antutu-iframe {
  margin-top: -80px;
  margin-left: -30px;
}
</style>