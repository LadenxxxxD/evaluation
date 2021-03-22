<template>
  <div>{{ articleContent }} 123</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import request from '@/utils/request';

@Component
export default class Article extends Vue {
  articleContent: string = '';
  mounted() {
    this.getArticle();
  }
  async getArticle() {
    const response = await request.get('http://manager.zaeke.com:9999/main/article', { id: 16184 })
    console.log('response: ', response);
  }
}
</script>

<style lang="scss" scoped>
</style>