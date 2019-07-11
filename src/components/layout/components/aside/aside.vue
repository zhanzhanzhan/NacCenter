<template>
  <div class="aside-wrap">
    <Input suffix="ios-search" placeholder="Enter text" />
    <div class="aside-list">
      <div class="aside-item" :class=" isActive === index  ? 'active' : ''" v-for="(item,index) in asideList"
           @click="changeActive(index)"
            :key="item.id">
        <div class="title"> <span></span>{{item.title}}</div>
        <div class="info">{{item.info}}</div>
      </div>
    </div>
    <div class="add-list">
      添加名单
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyAside',
  data () {
    return {
      isActive: 0,
      asideList: [
        {
          id: 0,
          title: 'NginxLB',
          info: 'Nginx 1.10.103'
        },
        {
          id: 1,
          title: 'NginxLB',
          info: 'Nginx 1.10.103'
        },
        {
          id: 2,
          title: 'NginxLB',
          info: 'Nginx 1.10.103'
        }
      ]
    }
  },
  methods: {
    changeActive (index) {
      this.isActive = index
    }
  }
}
</script>
<style lang="less" scoped>
  @import "aside";
</style>
