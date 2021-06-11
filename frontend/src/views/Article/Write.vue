<template>
  <div style="width: 1200px; margin: 0 auto">
    <div class="article-title-container">
      <b-input
        v-model="title"
        placeholder="请输入标题"
        style="flex: 1"
      ></b-input>
      <b-button
        type="is-primary"
        style="margin-left: 20px"
        @click="onDrawerOpen"
      >
        提交审核
      </b-button>
    </div>
    <mavon-editor
      v-model="value"
      style="height: calc(100vh - 200px); z-index: 2;"
      @change="onEditorChange"
    />
    <a-drawer
      title="提交审核"
      width="400px"
      placement="right"
      :closable="true"
      :visible="drawerVisible"
      @close="onDrawerClose"
    >
      <b-field label="关联手机">
        <a-select
          mode="multiple"
          size="large"
          :default-value="[]"
          style="width: 100%"
          placeholder="Please select"
        >
          <a-select-option v-for="product in productList" :key="product.id">{{ product.name }}</a-select-option>
          <a-select-option :key="124">一加7Pro</a-select-option>
        </a-select>
      </b-field>
      <b-field label="文章摘要">
        <b-input maxlength="80" type="textarea"></b-input>
      </b-field>
      <!-- <section style="margin-bottom: 20px;">
        <p class="option-title">文章摘要</p>
      </section> -->
      <b-field label="用户标签">
        <div style="width: 100%;">
          <b-tag
            v-for="tag in userTags"
            :key="tag.key"
            type="is-success"
            closable
            closeType='is-danger'
            aria-close-label="Close tag"
            style="margin: 2px;"
            @close="deleteTag(tag.key)"
          >
            {{ tag.value }}
          </b-tag>
        </div>
      </b-field>
      <div class="tag-add-wrapper">
        <b-input v-model="currentAddTag" style="flex: 1; margin-right: 10px;"></b-input>
        <b-button type="is-info is-light" @click="addTag">添加</b-button>
      </div>
      <div style="margin-top: 50px; display: flex; flex-direction: row-reverse;">
        <b-button type="is-primary" @click="submit">提交审核</b-button>
        <b-button style="margin-right: 20px;" @click="cancel">取消</b-button>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import request from "@/utils/request";
// import { v4 as UUID } from 'uuid';
import { uuid } from '@/utils/util';

@Component
export default class WriteArticle extends Vue {
  user: any = {};
  title: string = "";
  value: string = "";
  htmlValue: string = "";
  drawerVisible: boolean = false;
  currentAddTag: string = '';
  userTags: Array<any> = [];
  productList: Array<any> = [];

  created() {
    // this.addData(1)
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  onEditorChange(value: string, html: string) {
    this.htmlValue = html;
  }

  onDrawerOpen() {
    this.drawerVisible = true;
    this.getProductAll();
  }

  onDrawerClose() {
    this.drawerVisible = false;
  }

  deleteTag(key: string): void {
    this.userTags = this.userTags.filter((tag: any) => tag.key !== key);
    console.log('this.userTags: ', this.userTags);
  }

  addTag() {
    if (!this.currentAddTag) return;
    this.userTags.push({
      key: uuid(),
      value: this.currentAddTag
    });
    this.currentAddTag = '';
  }

  async submit() {
    // console.log(this.htmlValue);
    if (!this.title || !this.htmlValue)  {
      this.$toast.open({
        type: "is-danger",
        duration: 5000,
        message: `发布失败: 标题和正文不能为空`,
      });
      return;
    }
    const response: any = await request.post(
      `http://localhost:3000/api/v1/article/add`,
      {
        author: this.user.username,
        title: this.title,
        content: this.htmlValue,
      }
    );
    if (response.code === 0) {
      this.$toast.open({
        type: "is-success",
        duration: 5000,
        message: "发布成功，请耐心等待审核通过",
      });
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    } else {
      this.$toast.open({
        type: "is-danger",
        duration: 5000,
        message: `发布失败: ${response.message}`,
      });
    }
  }

  async getProductAll() {
    const response: any = await request.get(`http://localhost:3000/api/v1/product/all`);
    if (response.code === 0) {
      this.productList = response.data;
    }
  }

  cancel() {
    this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
.article-title-container {
  display: flex;
  margin: 10px 0;
}
.option-title {
  font-size: 16px;
  font-weight: 600;
  margin: 10px;
}
.tag-add-wrapper {
  display: flex;
}
</style>
