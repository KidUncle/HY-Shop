<template>
  <div id="tab-menu">
    <scroll class="content">
      <div class="menu-list">
        <div class="menu-list-item"
        v-for="(item,index) in categories"
        :key="index"
        :class="{active: currentIndex == index}"
        @click="itemClick(index)">
          {{ item.title }}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'common/scroll/Scroll.vue'
export default {
  name: 'TabMenu',
  props: {
    categories: {
      type: Array,
      default: []
    }
  },
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('selectItem', index);
    }
  }
}
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: calc(100vh - 49px - 44px);
    width: 100px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .content {
    height: 100%;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
