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
        <!-- 消息提醒 -->
        <a-popover placement="bottomRight" trigger="click">
          <template slot="content">
            <div v-if="notice.length">
              <a v-for="n in notice" :key="n.id" :href="`/article/write`">
                <div class="notice-title">您有一篇文章审核未通过，请修改后重新提交</div>
                <div class="notice-description">{{ n.title }}</div>
              </a>
          </div>
          <div v-else style="width: 200px; height: 100px;">
            <a-empty :image="emptyImage">
              <template #description>
                <span>暂无消息</span>
              </template>
            </a-empty>
          </div>
          </template>
          <IconFont icon="huabanfuben" :size="28" style="margin-right: 20px; outline: none;"></IconFont>
        </a-popover>
        
        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu">
          <template #trigger>
            <img :src="user.avatar" class="header-avator" />
          </template>
          <b-dropdown-item aria-role="menuitem" @click="toUserInfo">个人中心</b-dropdown-item>
          <b-dropdown-item v-if="user.isAdmin" aria-role="menuitem" @click="toAdmin">平台管理</b-dropdown-item>
          <b-dropdown-item v-if="user.isAdmin" aria-role="menuitem" @click="toAudit" style="padding-right: 1rem;">
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
import { Empty } from 'ant-design-vue';

@Component({
  components: {
    Navbar,
    IconFont
  }
})
export default class Header extends Vue {
  user: any = {};
  emptyImage = (Empty as any).PRESENTED_IMAGE_SIMPLE;
  avatorImg = 'https://pic1.zhimg.com/v2-a97b59854b5dd12e8ba2d0e32abec7c3_is.jpg';
  profileMenuVisible = false;
  avatorMenu = 'home';
  auditCount = 0;
  notice: Array<any> = [];

  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  mounted() {
    this.getAuditCount();
    this.getNotice();
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

  async getNotice() {
    const response: any = await request.get(`http://localhost:3000/api/v1/article/reject`, { id: this.user.id});
    if (response.code === 0) {
      this.notice = response.data;
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
      background-color: #ccc;
      cursor: pointer;
    }
  }
}

.notice-title {
  font-weight: 600;
  font-size: 14px;
  color: #777;
}

.notice-description {
  font-size: 12px;
  color: #888;
  padding-bottom: 6px;
  border-bottom: 1px solid #f1f2f3;
}
</style>
