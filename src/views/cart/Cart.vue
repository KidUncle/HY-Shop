<template>
  <div>
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list />
    <bottom-bar class="bottom-bar"/>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/Navbar'

import CartList from './childComps/CartList'
import BottomBar from './childComps/BottomBar'

import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components:{
    NavBar,
    CartList,
    BottomBar
  },
  computed:{
    ...mapGetters(['length','cartList'])
  }
}
</script>

<style scoped>
.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.bottom-bar {
  position: fixed;
  bottom: 49px;
  right: 0;
  left: 0;
  z-index: 99;
}
</style>
