<template>
  <nav :class="['sub-menu']">
    <span id="subitem-marker" ref="marker"></span>
    <span
      v-for="item in subList"
      :key="item.id"
      :class="['sub-menu-item', { 'active': activeIndex === item.id }]"
      @click="changeActive(item.id, $event)"
    >{{ item.value }}</span>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class SubMenu extends Vue {
  subList = [
    { id: 0, value: "推荐" },
    { id: 1, value: "主机" },
    { id: 2, value: "笔记本电脑" },
    { id: 3, value: "手机" },
    { id: 4, value: "相机" },
    { id: 5, value: "耳机" },
    { id: 6, value: "硬件" },
    { id: 7, value: "相机" },
    { id: 8, value: "相机" },
  ];
  marker: any = null;
  activeIndex = 0;
  isFixed = false;

  changeActive(currentIndex: number, e: any) {
    // this.marker.style.left = e.target.offsetLeft;
    // this.marker.style.width = e.target.offsetWidth;
    this.activeIndex = currentIndex;
  }
  changeFixed(e: any) {
    console.log(e);
  }
}
</script>

<style lang="scss" scoped>
nav.sub-menu {
  position: relative;
  padding: 20px;
  font-size: 14px;
  position: sticky;
  top: -1px;
  border: 1px solid #f3f4f4;
  text-align: center;

  span {
    color: #6e6d7a;
    margin: 0 16px;
    padding: 10px 12px;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: #959595;
    }

    &.active {
      display: inline-block;
      color: #333;
      font-weight: bold;
      left: 0;
      background-color: #f5f5f5;
      // background-color: #d4dbec;
      border-radius: 8px;
      transition: all 0.5s;
    }
  }
}
// #subitem-marker {
//   position: absolute;
//   height: 8px;
//   width: 100%;
//   background-color: #ddd;
//   left: 0;
//   bottom: 20px;
//   transition: 0.5s;
//   border-radius: 16px;
// }
</style>
