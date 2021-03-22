<template>
  <div id="root">
    <header class="box-shadow-3" v-if="!$route.meta.noHeader">
      <div class="flex-space-between">
        <div></div>
        <Navbar></Navbar>
        <div></div>
      </div>
      <SubMenu />
    </header>
    <main>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import SubMenu from "@/components/SubMenu.vue";
import Navbar from "@/components/Navbar.vue";
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component({
  components: {
    SubMenu,
    Navbar,
  }
})
export default class App extends Vue {
};
</script>

<style lang="scss">
@import "@/styles";

#root {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  //   "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  font-family: apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  position: relative;
  // margin-left: calc(100vw - 100%);
}
header {
  overflow: visible;
}
main {
  height: calc(100% - 150px);
  margin: 0 auto;
  padding: 20px 40px;
  background-color: $mainBgColor;
}
</style>
