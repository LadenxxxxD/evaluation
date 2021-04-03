<template>
  <div class="body-container custom-flex-middle bg-gradient">
    <div class="login-container shadow-modern">
      <div class="animate-area">
        <div
          :class="['login-content-wrapper', 'custom-flex-middle', { 'to-login': !showRegister }]"
        >
          <section class="left-show-container">
            <img src="@/assets/bg-sign-up.png" alt="bg-sign-up" />
          </section>
          <section class="middle-input-container">
            <div class="custom-flex-middle logo-title">
              <svg class="iconfont login-title-logo" aria-hidden="true">
                <use xlink:href="#icon-Compass" />
              </svg>
              <span class="login-title-label">All in evaluation</span>
            </div>
            <div class="login-welecome">
              和更多的人,
              <div class="text-rotater-container">
                <transition-group
                  name="text-rotate"
                  tag="div"
                  style="display: inline-flex; flex-direction: column;"
                >
                  <span v-for="text in rotateText" :key="text" class="text-rotate-item">{{ text }}</span>
                </transition-group>
                <!-- <div style="display: inline-flex; flex-direction: column;">
                  <transition
                    name="text-rotate"
                    tag="div"
                    style="display: inline-flex; flex-direction: column;"
                  >
                    <span
                      v-if="rotateText !== ''"
                      :key="rotateText"
                      class="text-rotate-item"
                    >{{ rotateText }}</span>
                  </transition>
                </div>-->
              </div>
            </div>
            <div class="login-input-box">
              <div>
                <label for="username" class="label">用户名</label>
                <input
                  type="text"
                  name="username"
                  class="login-input"
                  placeholder="用来登录的哦"
                  autocomplete="off"
                  v-model="username"
                />
              </div>
              <transition name="show-form">
                <div v-if="showRegisterForm">
                  <label for="username" class="label">昵称</label>
                  <input
                    type="text"
                    name="username"
                    class="login-input"
                    placeholder="起个响亮一点的名字吧"
                    autocomplete="off"
                    v-model="nickname"
                  />
                </div>
              </transition>
              <div>
                <label for="password" class="label">密码</label>
                <input
                  type="password"
                  name="password"
                  class="login-input"
                  placeholder="不要告诉别人"
                  v-model="password"
                />
              </div>
              <transition name="show-form">
                <div v-if="showRegisterForm">
                  <label for="confirmPassword" class="label">确认密码</label>
                  <input
                    type="password"
                    name="password"
                    class="login-input"
                    placeholder="确认没有输错"
                    v-model="confirmPassword"
                  />
                </div>
              </transition>
              <div
                v-if="showRegisterBtn"
                style="margin: 30px 0;"
                class="login-btns"
                key="resigterbtn"
              >
                <button class="login-button" @click="register">注册</button>
                <span>
                  <span>已有账号？</span>
                  <a @click="changeRegister">登录</a>
                </span>
              </div>
              <div v-else style="margin: 30px 0;" class="login-btns">
                <a @click="changeRegister">注册</a>
                <button class="login-button" @click="login">登录</button>
              </div>
              <div style="width: 280px; color: #ccc; font-size: 12px; margin: 0 auto;">
                您通过访问和或使用我方平台网站，即视为您表示同意接受
                <a>使用协议</a>、
                <a>隐私政策</a>的全部内容
              </div>
            </div>
          </section>
          <section class="right-show-container">
            <img src="@/assets/svg-wine.webp" alt="svg-wine" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
// import axios from "axios";
import request from "@/utils/request";
import Cookies from "js-cookie";

@Component({})
export default class Login extends Vue {
  showRegister = true;
  showRegisterForm = true;
  showRegisterBtn = true;
  username = "";
  nickname = "";
  password = "";
  confirmPassword = "";
  rotateText = [''];
  // rotateText = '';
  allRotateText = ['分享体验', '享受科技', '发现好物', '享受生活', '评测']
  currentRotateTextIndex = 1;

  mounted() {
    this.rotateText = this.allRotateText.slice(0, 2);
    // this.rotateText = this.allRotateText[0];
    setInterval(() => {
      this.getRotateText();
    }, 4000);
  }

  getRotateText() {
    if (this.currentRotateTextIndex === this.allRotateText.length - 1) {
      this.currentRotateTextIndex = 0;
    } else {
      this.currentRotateTextIndex += 1;
    }
    this.rotateText.shift();
    this.rotateText.push(this.allRotateText[this.currentRotateTextIndex]);
    // this.rotateText = '';
    // this.rotateText = this.allRotateText[this.currentRotateTextIndex];
  }

  async login() {
    const response: any = await request.post(
      "http://localhost:3000/api/v1/login",
      {
        username: this.username,
        password: this.password,
      }
    );
    if (response && response.code === 200) {
      console.log('登录成功: ', response);
      this.$router.push({
        path: '/'
      })
    } else {
      this.$message.error(response && response.message);
      console.log('登录失败: ', response.message);
    }
  }

  async register() {
    if (this.password !== this.confirmPassword) {
      this.$message.error('两次密码不一致');
      console.log('两次密码不一致');
      return;
    }
    const response: any = await request.post(
      "http://localhost:3000/api/v1/register",
      {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      }
    );
    if (response && response.code === 200) {
      console.log('注册成功: ', response);
      this.$router.push({
        path: '/'
      })
    } else {
      this.$message.error(response && response.message);
    }
  }

  changeRegister() {
    this.showRegister = !this.showRegister;
    setTimeout(() => {
      this.showRegisterForm = this.showRegister;
    }, 800);
    setTimeout(() => {
      this.showRegisterBtn = this.showRegister;
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.bg-gradient {
  background-image: linear-gradient(to bottom right, #ffffff, #bac6e0);
}
.login-container {
  height: 800px;
  width: 1400px;
  border-radius: 30px;
  background-color: #ffffff;
  padding: 30px;

  & .animate-area {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: inherit;
  }
}
.login-content-wrapper {
  width: 150%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: left 0.48s ease-in;

  &.login-status {
    left: 0;
  }
  &.to-login {
    left: -50%;
  }
}
.left-show-container {
  // display: none;
  flex: 1;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
  }
}
.right-show-container {
  flex: 1;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
  }
}
.middle-input-container {
  flex: 1;
  text-align: center;
  .login-title-logo {
    font-size: 48px;
  }
  .login-title-label {
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
    font-weight: 700;
    font-style: italic;
    color: #281765;
  }

  .login-welecome {
    margin: 40px 0;
    font-family: "Open Sans", sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #281765;
    overflow: hidden;

    .text-rotater-container {
      height: 42px;
      overflow: hidden;
      display: inline-block;
      padding: 0 0.3em;
      vertical-align: bottom;
    }
  }
}

.login-input-box {
  display: inline-block;

  label {
    text-align: start;
    display: inline-block;
    width: 60px;
  }

  .label {
    font-weight: 600;
  }
}

.login-input {
  height: 40px;
  padding: 10px 16px;
  background-color: #f3f3f4;
  border: 1px solid transparent;
  margin: 5px;
  outline: none;
  border-radius: 8px;
  color: #0d0c22;
  width: 260px;
  transition: background-color 200ms ease, outline 200ms ease, color 200ms ease,
    box-shadow 200ms ease, -webkit-box-shadow 200ms ease;

  &:active {
    background-color: #fff;
    border-color: #281765;
    box-shadow: none;
  }

  &:focus {
    background-color: #fff;
    border-color: #281765;
    box-shadow: 0 0 0 4px #cfd7ea;
  }

  &:hover {
    background-color: #fff;
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 4px #cfd7ea;
  }
}
.login-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-button {
  width: 200px;
  padding: 10px 16px;
  cursor: pointer;
  border: none;
  text-decoration: none;
  background: #fb4c53;
  color: #fff;
  -webkit-transition: color 200ms ease;
  transition: color 200ms ease;
  border-radius: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  outline: none;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;

  &:active {
    background: #fc6c72;
  }
  &:hover {
    background: #fc6c72;
  }
}

.show-form-enter-active {
  transition: all 0.4s ease;
}
.show-form-leave-active {
  transition: all 0.4s ease;
}
.show-form-enter, .show-form-leave-to
/* .show-form-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.text-rotate-item {
  text-align: left;
  transition: all 1s;
}
.text-rotate-enter-active {
  transition: all 2s ease;
}
.text-rotate-leave-active {
  transition: all 2s ease;
}
.text-rotate-enter {
  transform: translateY(0px);
  opacity: 0;
}
.text-rotate-enter-to {
  // transform: translateY(-42px);
  // opacity: 1;
}
.text-rotate-leave-to {
  opacity: 0;
  transform: translateY(-42px);
}
.text-rotate-leave-active {
  position: absolute;
}
</style>
