import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $bus: any
  }
}

// declare module 'vue/types/vue' {
//   // 可以使用 `VueConstructor` 接口 来声明全局 property
//   interface VueConstructor {
//     $myGlobal: string
//   }
// }

// declare module 'vue/types/options' {
//   interface ComponentOptions<V extends Vue> {
//     myOption?: string
//   }
// }
