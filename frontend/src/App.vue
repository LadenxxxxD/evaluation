<template>
  <div id="root">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">热门</router-link>
    <router-link to="/daogou">导购</router-link>
    <router-link to="/ceping">评测</router-link>
    <router-link to="/rank">排行榜</router-link>-->
    <!-- </div> -->
    <header class="box-shadow-3" v-if="!$route.meta.noHeader">
      <div class="flex-space-between">
        <div></div>
        <Navbar></Navbar>
        <div></div>
      </div>
      <SubMenu />
    </header>

    <!-- <main>
      <router-view />
    </main>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import SubMenu from "@/components/SubMenu";
import Navbar from "@/components/Navbar";
export default {
  components: {
    SubMenu,
    Navbar,
  },
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
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  // margin-left: calc(100vw - 100%);
}
header {
  overflow: visible;
}
.flex-space-between {
  display: flex;
  justify-content: space-between;
}
.flex-column {
  flex-direction: column;
}
main {
  height: calc(100% - 150px);
  margin: 0 auto;
  padding: 20px 40px;
}
a {
  text-decoration: none;
}
.box-shadow-3 {
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.06);
}
</style>
