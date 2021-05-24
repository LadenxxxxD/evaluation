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
        <a href="/article/write">
          <IconFont
            icon="bianxie"
            :size="28"
            style="margin-right: 20px; cursor: pointer;"
          ></IconFont>
        </a >
        <IconFont icon="huabanfuben" :size="28" style="margin-right: 20px;"></IconFont>
        <b-dropdown v-model="avatorMenu" position="is-bottom-left" append-to-body aria-role="menu">
          <template #trigger>
            <img :src="avatorImg" class="header-avator" />
          </template>
          <b-dropdown-item aria-role="menuitem" @click="toUserInfo">个人中心</b-dropdown-item>
          <b-dropdown-item aria-role="menuitem" @click="toAdmin">平台管理</b-dropdown-item>
          <b-dropdown-item aria-role="menuitem" @click="toAudit" style="padding-right: 1rem;">
            <span>待我审核</span>
            <a-badge v-show="auditCount !== 0" :count="auditCount" style="float: right;" />
          </b-dropdown-item>
          <b-dropdown-item aria-role="menuitem" @click="logout">退出登录</b-dropdown-item>
        </b-dropdown>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import Navbar from "@/components/NavBar.vue";
import IconFont from '@/components/IconFont.vue';
import request from '@/utils/request';

@Component({
  components: {
    Navbar,
    IconFont
  }
})
export default class Header extends Vue {
  avatorImg = 'https://pic1.zhimg.com/v2-a97b59854b5dd12e8ba2d0e32abec7c3_is.jpg';
  profileMenuVisible = false;
  avatorMenu = 'home';
  auditCount = 0;

  mounted() {
    this.getAuditCount();
  }

  async logout() {
    const response: any = await request.get(`http://localhost:3000/api/v1/logout`, { username: 'admin' });
    if (response.code === 0) {
      location.reload();
    }
  }

  async getAuditCount() {
    const response: any = await request.get(`http://localhost:3000/api/v1/article/invalidCount`);
    if (response.code === 0) {
      this.auditCount = response.data;
    }
  }

  toUserInfo() {
    this.$router.push('/user')
  }

  toAdmin() {
    this.$router.push('/admin')
  }

  toAudit() {
    this.$router.push('/admin/audit')
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
