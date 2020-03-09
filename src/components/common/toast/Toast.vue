<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props:{},
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message,duration){
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;

    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
  }
</style>
