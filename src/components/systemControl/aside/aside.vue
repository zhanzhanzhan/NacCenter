<template>
  <div class="aside-wrap">
    <div class="aside-list">
      <div class="aside-item " v-for="(item, index) in menu" :class="path === item.path ? 'active' : ''"  @click="changeItem(item.path)">
        <div class="title">
          <Icon :type="item.meta.icon" class="icon"/>
          {{ item.meta.title }}
          <Badge :count="count" v-if="item.meta.title==='申请管理'"></Badge>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { systemChild } from '../../../router/routers'
import { selNewMessage } from '../../../api/userBind'

export default {
  name: 'controlerAside',
  data () {
    return {
      path: '',
      menu: systemChild,
      count: 0,
    }
  },
  methods: {
    changeItem (path) {
      this.$router.push({ path: path })
      this.path = path
    },
    async selNewMessage () {
    let res = await selNewMessage()
     if (res.data.code === 'success') {
       this.count = res.data.result
     }
    }
  },
  mounted () {
    this.path = this.$route.path
    this.selNewMessage()
    console.log(this.path)
  }
}
</script>
<style scoped lang="less">
@import "aside";
</style>
