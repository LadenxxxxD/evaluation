<template>
  <div id="root">
    <header class="box-shadow-3" v-if="!$route.meta.noHeader">
      <Header />
      <!-- <SubMenu /> -->
    </header>
    <main
      id="main"
      :class="{ 'with-header': !$route.meta.noHeader }"
    >
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import SubMenu from "@/components/SubMenu.vue";
import Header from "@/components/Header.vue";
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component({
  components: {
    SubMenu,
    Header
  }
})
export default class App extends Vue {
};
</script>

<style lang="scss">
@import "@/styles";

#root {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: linear-gradient(to bottom right, #f3f5fa1c, #c6d0e5af),
    url("assets/bg1.png");
  background-size: cover;
  overflow: hidden;
}
header {
  overflow: visible;
  background: #fff;
}
main {
  height: 100vh;
  margin: 0 auto;
  padding: 0;

  &.with-header {
    height: calc(100vh - 67px);
    padding: 20px 40px;
  }
}

#main {
  overflow: auto;
  position: relative;
}
</style>
