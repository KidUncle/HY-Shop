<template>
  <div>
    <my-tab-bar>
      <my-tab-bar-item link="/home" activeColor="blue">
        <img src="~/assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="~/assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </my-tab-bar-item>
      <my-tab-bar-item link="/category">
        <img src="~/assets/img/tabbar/category.svg" alt="" slot="item-icon">
        <img src="~/assets/img/tabbar/category_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </my-tab-bar-item>
      <my-tab-bar-item link="/cart">
        <img src="~/assets/img/tabbar/cart.svg" alt="" slot="item-icon">
        <img src="~/assets/img/tabbar/cart_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </my-tab-bar-item>
      <my-tab-bar-item link="/profile">
        <img src="~/assets/img/tabbar/profile.svg" alt="" slot="item-icon">
        <img src="~/assets/img/tabbar/profile_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </my-tab-bar-item>
    </my-tab-bar>
  </div>
</template>

<script>
import MyTabBar from './MyTabBar';
import MyTabBarItem from './MyTabBarItem';
export default {
  name: 'MyMainTabBar',
  components: {
    MyTabBar,
    MyTabBarItem
  }
}
</script>

<style scoped>

</style>
