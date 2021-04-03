<template>
  <router-link :to="`/article/${data.id}`">
    <div class="article-list-item">
      <div class="content-container">
        <router-link :to="`/article/${data.author_id}`">
          <div class="author">
            <img class="avator" :src="data.author_img" alt="avator" />
            <span class="author-name">{{ data.author }}</span>
          </div>
        </router-link>
        <div style="display: flex; margin-top: 8px;">
          <div class="article-list-info">
            <div class="article-list-title">{{ data.title }}</div>
            <div class="article-list-content">{{ data.description }}</div>
            <footer class="space-between">
              <div class="time">{{ createTime }}</div>
              <div class="custom-flex-wrapper">
                <div class="time">阅读: {{ data.pv }}</div>
                <div class="time" style="margin-left: 20px;">评论: {{ data.comment }}</div>
              </div>
            </footer>
          </div>
          <img class="article-img" :src="data.img" alt="article img" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { formatTimestampDate } from '@/utils/util'

@Component
export default class ArticleListItem extends Vue {
  @Prop({ type: Object, default: {} })
  data!: any;

  get createTime() {
    return formatTimestampDate(this.data.created, '.')
  }
}
</script>

<style lang="scss" scoped>
.article-list-item {
  // overflow: hidden;
  position: relative;
  width: 100%;
  margin-top: 40px;
  color: #000;
  .article-img {
    height: 140px;
    width: 240px;
    margin-left: 16px;
    border-radius: 6px;
    background-color: #f1f3f4;
  }

  a {
    color: #000;
  }
}
.content-container {
  position: relative;
  background-color: #fff;
  padding: 0 20px 16px;
  border-radius: 16px;

  .author {
    padding-left: 80px;
    padding-top: 6px;

    .avator {
      height: 64px;
      width: 64px;
      border-radius: 50%;
      padding: 6px;
      background-color: #fff;
      position: absolute;
      top: -32px;
      left: 30px;
    }
  }
}

.author-name {
  font-size: 1.25em;
  font-weight: 600;
}

.article-list-title {
  font-size: 20px;
  color: #333;
  line-height: 36px;
  margin: 12px 0;
}
.article-list-content {
  margin: 12px 0;
}
.article-list-info {
  flex: 1;
}
</style>