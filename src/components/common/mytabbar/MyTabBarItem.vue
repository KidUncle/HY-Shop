<template>
  <div class="my-tab-bar-item" @click="btnclick">
    <div class="item-icon" v-if="!isActive"><slot name="item-icon"></slot></div>
    <div class="item-icon" v-else><slot name="item-icon-active"></slot></div>
    <div class="item-text" :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'MyTabBarItem',
  props:{
    link: String,
    activeColor:{
      type: String,
      default: 'red'
    }
  },
  data(){
    return{

    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.link) !== -1;
    },
    activeStyle(){
      return this.isActive ? { color:this.activeColor } : {}
    }
  },
  methods: {
    btnclick(){
      this.$router.replace(this.link)
      console.log(this.$route.path)
    }
  }
}
</script>

<style scoped>
.my-tab-bar-item {
  flex:1;
  height: 49px;
}
.item-icon img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
.item-text {
  font-size: 14px;
  text-align: center;
}
.active {
  color: red;
}
</style>
