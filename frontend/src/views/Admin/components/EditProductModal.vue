<template>
  <a-modal
    :title="mode === 'create' ? '新增产品' : '编辑产品'"
    :visible="visible"
    :footer="null"
    width="1000px"
    @cancel="close"
  >
    <div class="flex-wrapper">
      <section style="width: 35%;">
        <!-- <img src="//img12.360buyimg.com/n1/s450x450_jfs/t1/176279/28/492/99476/605d884fE19b32d50/a3c973652799afa2.jpg" alt=""> -->
        <img :src="productParams.cover_img" style="max-width: 100%;max-height: 400px;">
        <a-upload
          v-show="!productParams.cover_img"
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://localhost:3000/api/v2/upload"
          style="margin: 100px;"
        >
          <!-- :headers="{'Content-Type': 'multipart/form-data'}" -->
          <div>
            <a-icon :type="'plus'" />
            <div >
              Upload
            </div>
          </div>
        </a-upload>
      </section>
      <section style="flex: 1;">
        <b-tabs>
          <b-tab-item label="基本信息">
            <div class="flex-wrapper">
              <div class="left">
                <b-field
                  label="产品名称"
                  :type="{ 'is-danger': nameValidte.error }"
                  :message="nameValidte.error ? nameValidte.message : ''"
                >
                  <b-input v-model="productParams.name" maxlength="30"
                  >
                  </b-input>
                </b-field>
                <b-field label="品牌">
                  <!-- <b-input  v-model="productParams.brand"> -->
                    <a-select v-model="productParams.brand" style="width: 100%;">
                      <a-select-option v-for="brand in brandList" :key="brand.id">{{ brand.chName }}</a-select-option>
                    </a-select>
                  <!-- </b-input> -->
                </b-field>
                <b-field label="图片地址">
                  <b-input  v-model="productParams.cover_img">
                  </b-input>
                </b-field>
              </div>
              <div class="right" style="margin-left: 40px;">
                <b-field
                  label="价格"
                  :type="{ 'is-danger': nameValidte.error }"
                  :message="nameValidte.error ? nameValidte.message : ''"
                >
                  <b-input  v-model.number="productParams.price" maxlength="30">
                  </b-input>
                </b-field>
                <b-field label="标签">
                  <b-input  v-model="productParams.tags">
                  </b-input>
                </b-field>
                <b-field label="相关测评文章">
                  <b-input  v-model="productParams.related_articles">
                  </b-input>
                </b-field>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="基本参数">
            <div class="flex-wrapper">
              <div class="left">
                <b-field label="CPU">
                  <b-input  v-model="productParams.cpu" maxlength="30">
                  </b-input>
                </b-field>
                <b-field label="内存">
                  <b-input  v-model="productParams.memory">
                  </b-input>
                </b-field>
                <b-field label="前置摄像头">
                  <b-input  v-model="productParams.front_camera">
                  </b-input>
                </b-field>
                <b-field label="屏幕尺寸">
                  <b-input  v-model="productParams.screen_size">
                  </b-input>
                </b-field>
              </div>
              <div class="right" style="margin-left: 40px;">
                <b-field label="电池容量">
                  <b-input  v-model="productParams.battery" maxlength="30">
                  </b-input>
                </b-field>
                <b-field label="存储空间">
                  <b-input  v-model="productParams.storage">
                  </b-input>
                </b-field>
                <b-field label="后置摄像头">
                  <b-input  v-model="productParams.back_camera">
                  </b-input>
                </b-field>
                <b-field label="屏幕分辨率">
                  <b-input  v-model="productParams.screen_ratio">
                  </b-input>
                </b-field>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="详细参数">
            <div class="flex-space-between flex-center-v">
              <span style="font-weight: 600; font-size: 16px;">目标地址:</span>
              <b-input v-model="zolUrl" style="flex: 1; margin: 0 20px;"></b-input>
              <b-button type="is-info" @click="fetchZolParams">抓取</b-button>
            </div>
            <a-spin tip="正在抓取数据..." :spinning="fetchLoading">
              <a-textarea v-model="productParams.params" :auto-size="{ minRows: 10, maxRows: 20 }" style="margin-top: 10px;"></a-textarea>
            </a-spin>
          </b-tab-item>
        </b-tabs>
        <div class="product-modal-footer flex-space-between">
          <span></span>
          <div style="margin-right: 50px;">
            <b-button style="margin: 0 20px;" @click="close">取消</b-button>
            <b-button type="is-primary" @click="submit">提交</b-button>
          </div>
        </div>
      </section>
    </div>
  </a-modal>
</template>

<script lang="ts">
import request from '@/utils/request';
import { Vue, Component, Prop, Emit, Inject, Model, Provide, Watch } from 'vue-property-decorator';

@Component({})
export default class EditProductModal extends Vue {
  @Prop({ type: Boolean, default: false })
  visible!: boolean;
  @Prop({ type: String, default: 'create' })
  mode!: string;
  @Prop({ type: Number, default: 0 })
  productId!: string;

  productParams = {
    name: '',
    brand: '',
    price: null,
    cover_img: '',
    cpu: '',
    memory: '',
    storage: '',
    battery: '',
    front_camera: [],
    back_camera: [],
    screen_size: '',
    screen_ratio: '',
    tags: [],
    params: '',
    official_article: null,
    related_articles: []
  };
  brandList: Array<any> = [];
  fetchLoading: boolean = false;
  nameValidte = {
    error: false,
    message: ''
  }

  priceValidte = {
    error: false,
    message: ''
  }

  zolUrl: string = '';

  created() {
    // this.getBrand();
  }

  close() {
    this.productParams = {
      name: '',
      price: null,
      brand: '',
      cover_img: '',
      cpu: '',
      memory: '',
      storage: '',
      battery: '',
      front_camera: [],
      back_camera: [],
      screen_size: '',
      screen_ratio: '',
      tags: [],
      params: '',
      official_article: null,
      related_articles: []
    };
    this.$emit('close')
  }

  cancel() {
    this.productParams = {
      name: '',
      price: null,
      brand: '',
      cover_img: '',
      cpu: '',
      memory: '',
      storage: '',
      battery: '',
      front_camera: [],
      back_camera: [],
      screen_size: '',
      screen_ratio: '',
      tags: [],
      params: '',
      official_article: null,
      related_articles: []
    };
    this.close();
  }

  async fetchZolParams() {
    if (!this.zolUrl) {
      return this.$toast.open({
        type: "is-danger",
        duration: 5000,
        message: '请先输入目标地址！',
      });
    }
    this.fetchLoading = true;
    const response: any = await request.get(
      `http://localhost:3000/api/v1/product/fetchZolParamsByUrl`,
      { url: this.zolUrl }
    );
    if (response.code === 0) {
      this.productParams.params = response.data;
      this.fetchLoading = false;
    } else {
      this.fetchLoading = false;
    }
  }

  validte(): boolean {
    const { name, price, brand } = this.productParams;
    let result = true;
    if (!name) {
      this.nameValidte.error = true;
      this.nameValidte.message = '产品名称不能为空！';
      result = false;
    }
    if (!price) {
      this.priceValidte.error = true;
      this.priceValidte.message = '价格不能为空！';
      result = false;
    }
    if (!brand) {
      this.$toast.open({
        type: 'is-warning',
        message: '产品品牌不能为空',
      })
      result = false;
    }
    return result;
  }

  async getBrand() {
    const response: any = await request.get('http://localhost:3000/api/v1/product/brand');
    if (response.code === 0) {
      this.brandList = response.data;
    }
  }

  async submit(): Promise<void> {
    if (!this.validte()) return;
    let api = '';
    if (this.mode === 'create') {
      api = 'http://localhost:3000/api/v1/product/add';
    } else {
      api = 'http://localhost:3000/api/v1/product/update';

    }
    const response: any = await request.post(api,
      {
        id: this.productId || 0,
        params: this.productParams
      }
    );
    if (response.code === 0) {
      this.$toast.open({
        type: "is-success",
        duration: 5000,
        message: response.message,
      });
      this.$emit('refresh');
      this.close();
    } else {
      this.$toast.open({
        type: "is-danger",
        duration: 5000,
        message: response.message,
      });
    }
  }

  @Watch('mode')
  async getDefaultValue(mode: string) {
    if (mode === 'create') return;
    const response: any = await request.get(`http://localhost:3000/api/v1/product/${this.productId}`);
    if (response.code === 0) {
      this.productParams = response.data;
    }
    this.getBrand();
  }
};
</script>

<style lang="scss" scoped>
</style>
