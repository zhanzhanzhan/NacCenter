<template>
  <div class="aside-wrap">
    <div class="aside-list">
      <div class="aside-item " v-for="(item, index) in menu" :class="path === item.path ? 'active' : ''"  @click="changeItem(item.path)">
        <div class="title">
          <Icon :type="item.meta.icon" class="icon"/>
          {{ item.meta.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { systemChild } from '../../../router/routers'

export default {
  name: 'controlerAside',
  data () {
    return {
      path: '',
      menu: systemChild
    }
  },
  methods: {
    changeItem (path) {
      this.$router.push({ path: path })
      this.path = path
    }
  },
  mounted () {
    this.path = this.$route.path
    console.log(this.path)
  }
}
</script>
<style scoped lang="less">
@import "aside";
</style>
