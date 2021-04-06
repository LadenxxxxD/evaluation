<template>
  <div>
    <div class="header-container flex-space-between">
      <section class="logo-wrapper flex-center-v">
        <svg class="iconfont login-title-logo" aria-hidden="true" style="font-size: 48px">
          <use xlink:href="#icon-Compass" />
        </svg>
        <span class="login-title-label">All in evaluation</span>
      </section>
      <Navbar></Navbar>
      <section class="user-wrapper flex-center-v">
        <svg
          class="iconfont login-title-logo"
          aria-hidden="true"
          style="font-size: 28px; margin-right: 20px;"
        >
          <use xlink:href="#icon-bianxie" />
        </svg>
        <svg
          class="iconfont login-title-logo"
          aria-hidden="true"
          style="font-size: 28px; margin-right: 20px;"
        >
          <use xlink:href="#icon-huabanfuben" />
        </svg>
        <a-dropdown :trigger="['click']" placement="bottomRight">
          <img :src="avatorImg" class="header-avator" />
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a href="#">个人信息</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <div @click="logout">注销登录</div>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import Navbar from "@/components/NavBar.vue";
import request from '@/utils/request';

@Component({
  components: {
    Navbar
  }
})
export default class Header extends Vue {
  avatorImg = 'https://pic1.zhimg.com/v2-a97b59854b5dd12e8ba2d0e32abec7c3_is.jpg';
  profileMenuVisible = false;

  async logout() {
    const response: any = await request.get(`http://localhost:3000/api/v1/logout`, { username: 'admin' });
    if (response.code === 0) {
      console.log('response: ', response);
      location.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  padding: 0 60px;
  user-select: none;
  .logo-wrapper {
    font-size: 20px;
    font-weight: 600;
    flex: 1;
  }
  .user-wrapper {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    position: relative;
    .header-avator {
      border-radius: 8px;
      height: 38px;
      width: 38px;
      cursor: pointer;
    }
  }
}
</style>
