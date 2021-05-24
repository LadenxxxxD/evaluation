<template>
  <nav>
    <router-link v-for="item in list" :key="item.id" :to="item.link">
      {{ item.value }}
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  list = [
    { id: 1, value: "热门", link: "/" },
    { id: 2, value: "导购", link: "/guide" },
    { id: 3, value: "测评", link: "/evaluation" },
    { id: 4, value: "排行榜", link: "/rank" },
  ];
}
</script>

<style lang="scss" scoped>
nav {
  display: inline-block;
  padding: 20px 30px 16px;
  border-bottom: 1px solid #f3f4f4;

  a {
    font-size: 20px;
    font-weight: bold;
    color: #959595;
    margin: 0 40px;
    text-decoration: none;

    &.router-link-exact-active {
      // color: #281765;
      color: #7957d5;
    }
  }
}
</style>
