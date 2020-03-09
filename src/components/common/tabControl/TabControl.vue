<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item"
    :class="{'red': index==currentIndex}" @click="tabclick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex: 0,
    }
  },
  methods:{
    tabclick(index){
      this.currentIndex = index;
      this.$emit('tabclick',index);
    }
  }
}
</script>

<style scoped>
  .red{
    color: var(--color-high-text);
  }
  .red span {
    border-bottom: 3px solid var(--color-high-text);
  }
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
</style>
