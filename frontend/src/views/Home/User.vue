<template>
  <div class="main-body-container">
    <div class="user-bg-img"></div>
    <div class="user-header">
      <div class="avatar">
        <img :src="userInfo.avatar" style="height: 100%; width: 100%;">
      </div>
      <div class="header-info">
        <span class="nickname">{{ userInfo.nickname }}</span>
        <b-tag type="is-info is-light" style="margin-left: 20px;">Lv 6</b-tag>
        <b-tag type="is-primary" style="margin-left: 20px;">测评达人</b-tag>
        <div style="margin-top: 6px; color: #666;">这个用户很懒，没有设置签名～</div>
        <b-button type="is-primary" outlined class="user-edit-btn" @click="openEditModal">编辑个人信息</b-button>
      </div>
      <a-modal
        title="个人信息"
        :visible="infoEditModal.visible"
        @cancel="closeEditModal"
        :footer="null"
      >
        <div class="flex-wrapper">
          <img src="https://pic1.zhimg.com/v2-a97b59854b5dd12e8ba2d0e32abec7c3_is.jpg" style="width: 100px; height: 100px;margin-right: 40px;">
          <div style="flex: 1;">
            <b-field label="用户名">
              <b-input v-model="userInfo.username" disabled></b-input>
            </b-field>
            <b-field label="昵称">
              <b-input v-model="userInfo.nickname"></b-input>
            </b-field>
            <b-field label="年龄">
              <b-input v-model="userInfo.age"></b-input>
            </b-field>
            <b-field label="性别">
              <b-radio v-model="userInfo.gender" :native-value="1" style="margin-right: 30px;">男</b-radio>
              <b-radio v-model="userInfo.gender" :native-value="0">女</b-radio>
            </b-field>
            <b-field label="头像地址">
              <b-input  v-model="userInfo.avatar"></b-input>
            </b-field>
          </div>
        </div>
        <div class="flex-space-between" style="margin-top: 20px;">
          <span></span>
          <div>
            <b-button type="is-primary" @click="saveUserInfo">保存</b-button>
          </div>
        </div>
      </a-modal>
    </div>
    <b-tabs style="background-color: #fff; padding: 20px; margin-top: 20px;">
      <b-tab-item label="我发表的">
        <!-- <div v-if="false" class="empty-tips">
          <span>暂无测评文章，</span>
          <a href="/article/write">去发表</a>
        </div> -->
        <a-empty :image="emptyImage">
          <template #description>
            <span>暂无测评文章，</span>
            <a href="/article/write">去发表</a>
          </template>
        </a-empty>
      </b-tab-item>
      <b-tab-item label="回复我的">
        <a-empty :image="emptyImage">
          <template #description>
            <span>暂无回复，去与网友</span>
            <a href="/article/write">讨论</a>
          </template>
        </a-empty>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Inject, Model, Provide, Watch } from 'vue-property-decorator';
import { Empty } from 'ant-design-vue';
import request from '@/utils/request';

@Component({})
export default class UserInfo extends Vue {
  emptyImage = (Empty as any).PRESENTED_IMAGE_SIMPLE;
  currentUserId = 1;
  userInfo: any = {
    username: '',
    nickname: '',
    gender: 1,
    age: 18,
    avatar: ''
  }

  infoEditModal = {
    visible: false,
  }

  mounted() {
    this.getUserInfo();
  }

  openEditModal() {
    this.infoEditModal.visible = true;
  }

  closeEditModal() {
    this.infoEditModal.visible = false;
  }

  async getUserInfo() {
    const response: any = await request.get(`http://localhost:3000/api/v1/user/${this.currentUserId}`);
    if (response.code === 0) {
      this.userInfo = response.data;
    }
  }

  async saveUserInfo() {
    const response: any = await request.post(`http://localhost:3000/api/v1/user/${this.currentUserId}`, this.userInfo);
    if (response.code === 0) {
      this.userInfo = response.data;
    }
  }
};
</script>

<style lang="scss" scoped>
  .main-body-container {
    width: 1000px;
    margin: 20px auto;
    position: relative;
  }
  .user-bg-img {
    width: 100%;
    height: 200px;
    background-color: aquamarine;
    background: url(https://static.zhihu.com/heifetz/assets/guide-cover-1.4423ce0f.jpg);
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
  }
  .user-header {
    position: relative;
    height: 74px;
    background-color: #fff;

    .avatar {
      height: 128px;
      width: 128px;
      background-color: blueviolet;
      position: absolute;
      top: -64px;
      left: 64px;
    }

    .header-info {
      margin-left: 220px;
      padding-top: 6px;
    }
    .nickname {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .user-edit-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .empty-tips {
  height: 100px;
  display: flex;
  justify-content: center ;
  align-items: center;
}
</style>
