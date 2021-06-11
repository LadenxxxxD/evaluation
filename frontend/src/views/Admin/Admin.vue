<template>
  <div class="main-body-container audit-container">
    <h2 class="category-title">产品管理</h2>
      <!-- :columns="columns" -->
    <div class="table-controller">
      <div class="controller-left">
        <b-button type="is-danger">批量删除</b-button>
      </div>
      <div class="controller-right">
        <b-button type="is-info" style="margin-right: 20px;" @click="openEditModal">新增产品</b-button>
        <EditProductModal
          :productId="currProductId" 
          :visible="editModal.visible" 
          :mode="editModal.mode" 
          @refresh="getProductList()"
          @close="closeEditModal"/>
      </div>
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
      <b-table-column label="名称" v-slot="{ row }">
        <span :title="row.name">{{ row.name }}</span>
      </b-table-column>
      <b-table-column label="价格" width="100px" v-slot="props">
        <span>{{ props.row.price }}元</span>
      </b-table-column>
      <b-table-column label="标签" width="200px" v-slot="{ row }">
        <span>{{ row.tags }}</span>
      </b-table-column>
      <b-table-column label="内存" v-slot="{ row }">
        <span>{{ row.memory }}</span>
      </b-table-column>
      <b-table-column label="存储" v-slot="{ row }">
        <span>{{ row.storage }}</span>
      </b-table-column>
      
      <b-table-column label="操作" width="200" v-slot="{ row }">
        <a :href="`/evaluation/details/${row.id}`" target="_blank" rel="noopener noreferrer">查看页面</a>
        <a-divider type="vertical"></a-divider>
        <!-- <a class="action-pass" @click="passArticle(row.id)">通过</a> -->
        <a @click="openEditModal(row.id, 'edit')">编辑</a>
        <a-divider type="vertical"></a-divider>
        <a style="color: #f14668;" @click="deleteProduct(row.id)">删除</a>
      </b-table-column>

      <template #bottom-left>
          <b>当前选中</b>: {{ checkedRows.length }}
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Inject, Model, Provide, Watch } from 'vue-property-decorator';
import EditProductModal from '@/views/Admin/components/EditProductModal.vue';
import request from '@/utils/request';
import { formatTimestampSecond } from '@/utils/util';

@Component({
  components: {
    EditProductModal
  }
})
export default class Audit extends Vue {
  data: Array<any> = [];
  checkedRows: Array<any> = [];
  currentPage: number = 1;
  currProductId: number = 0;
  editModal: any = {
    visible: false,
    mode: 'create',
    defaultValue: {}
  }

  createTime(timeStamp: number) {
    return formatTimestampSecond(timeStamp, '-')
  }

  mounted() {
    this.getProductList();
  }

  async getProductList(): Promise<void> {
    const response: any = await request.get('http://localhost:3000/api/v1/product/all');
    if (response.code === 0) {
      this.data = response.data;
    }
  }

  async addProduct(params: any): Promise<void> {
    const response: any = await request.post(`http://localhost:3000/api/v1/product/add`, { params });
  }

  async deleteProduct(id: number): Promise<void> {
    const response: any = await request.post(`http://localhost:3000/api/v1/product/delete`, { id });
    this.data = this.data.filter((item: any) => item.id !== id);
  }

  openEditModal(id = 0, mode = 'create') {
    console.log("🚀 ~ file: Admin.vue ~ line 108 ~ Audit ~ openEditModal ~ id", id)
    this.currProductId = id;
    this.editModal.visible = true;
    this.editModal.mode = mode;
  }
  
  closeEditModal() {
    this.editModal.visible = false;
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
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }
  .action-pass {
    background-color: #48c774;
    color: #fff;
    padding: 4px 10px;
    border-radius: 2px;
  }
</style>
