import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $message: any;
    $Modal: any;
    $notification: any;
    $toast: any;
  }
}
