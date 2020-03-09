<template>
  <div class="cart-list">
    <scroll ref="scroll" class="content"
    :probe-type="3">
      <div>
        <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '../../../components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import { mapGetters } from 'vuex';
	export default {
		name: "CartList",
    components: {
      Scroll,
      CartListItem,
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    props: {

    },
    activated(){
      this.$refs.scroll.scroll.refresh();
    },
	}
</script>

<style scoped>
.cart-list{
  height: calc(100vh - 44px - 49px);
}
.content{
 height: 100%;
 overflow: hidden;
}
</style>
