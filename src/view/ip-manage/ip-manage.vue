<template>
  <div class="view-content">
    <div class="title">
      {{activeNb.nbName}} <span>{{activeNb.nbCode}}</span>
    </div>
    <div class="nav-box">
      <div class="nav-bar">
        <div class="nav-item" v-for="(item,index) in navList" :class="activeNav === index ? 'active' : ''"
             @click="changeNav(index)">{{item}}
        </div>
      </div>
      <!--固定ip-->
      <div class="nav-content" v-if="activeNav === 0">
       <ip-config></ip-config>
      </div>
      <!--ip管理-->
      <div class="nav-content" v-if="activeNav === 1">

        <!--<ip-param :nb-code="activeNb.nbCode"></ip-param>-->
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import IP from './component/ip.vue'
  import ipConfig from './component/ipConfig.vue'
  import ipParam from './component/ipParam.vue'
  export default {
    name: 'ipManage',
    components: {
      IP,ipParam, ipConfig
    },
    data () {
      return {
        activeNav: 0,
        navList: [
          'IP配置',
          'IP回收'
        ]
      }
    },
    computed: {
      ...mapState({
        activeNb: state => state.app.activeNb
      })
    },
    watch: {
      /*activeNb: {
        handler (newVal, old) {
          this.$Loading.start()
          // this.getDefaultConfig(this.activeNb.nbCode)
          this.$Loading.finish()
        },
        deep: true
        // immediate: true
      },*/
      $route: {
        handler (val, oldVal) {
          this.activeNav = 0
        },
        // 深度观察监听
        deep: true
      },

    },
    methods: {
      /* 切换tab */
      changeNav (index) {
        this.activeNav = index
      },

    },
    mounted () {

    },

  }
</script>
<style lang="less" scoped>
  @import "ip-manage";
</style>
