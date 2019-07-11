<template>
  <Layout class="main" style="height: 100%;">
    <header-bar></header-bar>
    <Layout style="height: 100%;overflow: hidden">
     <div class="container">
       <div class="aside">
         <my-aside></my-aside>
       </div>
       <div class="content">
         <router-view />
       </div>
     </div>
    </Layout>
  </Layout>
</template>
<script>
import HeaderBar from '../my-home/components/header/header'
import MyAside from './components/aside/aside'
export default {
  name: 'my-layout',
  components: { HeaderBar, MyAside }
}
</script>
<style lang="less" scoped>
  @import "./layout";
</style>
