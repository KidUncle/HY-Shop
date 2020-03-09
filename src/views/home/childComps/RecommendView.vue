<template>
  <div class="recommend">
    <div v-for="(item,index) in recommend" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommend:{
      type:Array,
      default(){
        return[]
      }
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    padding: 10px 10px 0px 10px;
    border-bottom: 10px solid #eee;
    text-align: center;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 70px;
    height: 70px;
  }
</style>
