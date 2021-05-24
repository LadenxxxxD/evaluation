<template>
  <div class="main-body-container audit-container">
    <h2 class="category-title">测评审核</h2>
      <!-- :columns="columns" -->
    <div class="table-controller">
      <b-button type="is-success" style="margin-right: 20px;" @click="passArticleBatch">批量通过</b-button>
      <b-button type="is-danger">批量拒绝</b-button>
    </div>
    <b-table
      :data="data"
      :checked-rows.sync="checkedRows"
      checkable
      checkbox-position="left"
      paginated
      hoverable
    >
      <b-table-column label="ID" v-slot="props">
        <span>{{ props.row.id }}</span>
      </b-table-column>
      <b-table-column label="标题" width="500" v-slot="{ row }">
        <span :title="row.title">{{ row.title }}</span>
      </b-table-column>
      <b-table-column label="作者" v-slot="props">
        <span>{{ props.row.author }}</span>
      </b-table-column>
      <b-table-column label="创建时间" v-slot="{ row }">
        <span>{{ createTime(row.created) }}</span>
      </b-table-column>
      
      <b-table-column label="操作" width="200" v-slot="{ row }">
        <a :href="`/article/${row.id}`" target="_blank" rel="noopener noreferrer">查看</a>
        <a-divider type="vertical"></a-divider>
        <a class="action-pass" @click="passArticle(row.id)">通过</a>
        <a-divider type="vertical"></a-divider>
        <a style="color: #f14668;">拒绝</a>
      </b-table-column>

      <template #bottom-left>
          <b>当前选中</b>: {{ checkedRows.length }}
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Inject, Model, Provide, Watch } from 'vue-property-decorator';
import request from '@/utils/request';
import { formatTimestampSecond } from '@/utils/util';

@Component({})
export default class Audit extends Vue {
  data: Array<any> = [];
  columns: Array<any> = [
    {
      field: 'id',
      label: 'ID',
      width: '40',
      numeric: true
    },
    {
      field: 'title',
      label: '标题',
    },
    {
      field: 'author',
      label: '作者',
    },
    {
      field: 'created',
      label: '创建时间',
    },
    {
      label: '操作',
    },
  ];
  checkedRows: Array<any> = [];
  currentPage: number = 1;

  createTime(timeStamp: number) {
    return formatTimestampSecond(timeStamp, '-')
  }

  mounted() {
    this.getArticleList();
  }

  async getArticleList() {
    const response: any = await request.get(`http://localhost:3000/api/v1/article/invalid`);
    // const response: any = await request.get(`/api/zaeke/main/column_detail`, { skipnum: 100, length: 10, id: 9 });
    // console.log('response: ', response);
    if (response.code === 0) {
      this.data = response.data;
    } else {
    }
  }

  async passArticle(id: number) {
    const response: any = await request.post(`http://localhost:3000/api/v1/article/pass`, { id });
    console.log("🚀 ~ file: Audit.vue ~ line 101 ~ Audit ~ passArticle ~ response", response)
    this.data = this.data.filter((item: any) => item.id !== id);
  }

  passArticleBatch() {

  }
};
</script>

<style lang="scss" scoped>
  .audit-container {
    width: 1200px;
    background-color: #fff;
    padding: 20px;
  }
  .category-title {
    font-size: 24px;
    font-weight: 600;
  }
  .table-controller {
    margin: 20px 0;
  }
  .action-pass {
    background-color: #48c774;
    color: #fff;
    padding: 4px 10px;
    border-radius: 2px;
  }
</style>
