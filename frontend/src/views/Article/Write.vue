<template>
  <div style="width: 1200px; margin: 0 auto;">
    <div class="article-title-container">
      <b-input v-model="title" placeholder="请输入标题" style="flex: 1;"></b-input>
      <b-button type="is-primary" style="margin-left: 20px;" @click="submit">提交审核</b-button>
    </div>
    <mavon-editor v-model="value" style="height: calc(100vh - 200px);" @change="onEditorChange" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import request from '@/utils/request';

@Component
export default class WriteArticle extends Vue {
  title: string = '';
  value: string = '';
  htmlValue: string = '';

  onEditorChange(value: string, html: string) {
    this.htmlValue = html;
  }

  async submit() {
    console.log(this.htmlValue);
    const response: any = await request.post(
      `http://localhost:3000/api/v1/article/add`,
      {
        author: 'admin',
        title: this.title,
        content: this.htmlValue
      }
    );
  }
}
</script>

<style lang="scss" scoped>
.article-title-container {
  display: flex;
  margin: 10px 0;
}
</style>