<template>
  <div class="home">
      <div class="content">
        <div class="content-item">
          <div class="title">
            Nacbox在线
          </div>
          <div class="body">
            <div class="progress-num">{{nbPercent}}%</div>
            <Progress :percent="nbPercent" :stroke-width="5" hide-info stroke-color="#fff"/>
          </div>
        </div>
        <div class="content-item">
          <div class="title">
            在线主机
          </div>
          <div class="body">
            <div class="chart-head">
              <span> <i></i>在线 {{online.currentCount}}</span>
              <span> <i></i>全部 {{online.sumCount}}</span>
            </div>
            <div class="chart">
              <i-circle :percent="onlinePercent" stroke-color="#00e9bc" :size="150">
                <span class="demo-Circle-inner" style="font-size:24px">{{onlinePercent}}%</span>
              </i-circle>
          </div>
          </div>
        </div>
        <div class="content-item">
          <div class="title">
            白名单
          </div>
          <div class="body">
            <div class="progress-num">{{whiteList}} <span>个</span></div>
          </div>
        </div>
        <div class="content-item">
          <div class="title">
            活跃主机
          </div>
          <div class="body">
            <div class="chart-head">
              <span> <i></i>活跃 {{activeHost.active}}</span>
              <span> <i></i>在线 {{activeHost.live}}</span>
            </div>
            <div class="chart">
              <div class="round-1">
                <div class="round-2" :style="{width: activePercent + '%', height:activePercent + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="title">
            忽略名单
          </div>
          <div class="body">
            <div class="progress-num">{{ignoreList}} <span>个</span></div>
          </div>
        </div>
        <div class="content-item">
          <div class="title">
            红色警报
          </div>
          <div class="body">
            <div class="progress-num">15</div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { getActiveHostCount, getOnLineTotal, getRosterSum } from '../../api/home'
import { getCurrentCount } from '../../api/chart'

export default {
  name: 'home',
  data () {
    return {
      nbLive: {}, // nb在线
      activeHost: {}, // 活跃主机
      online: {}, // 在线
      whiteList: {}, // 白名单
      ignoreList: {}, // 忽略名单
      timer: null,
    }
  },
  computed: {
    nbPercent () {
      return Math.round(this.nbLive.totalOnline / this.nbLive.totalNB * 10000) / 100.00
    },
    onlinePercent () {
      return Math.round(this.online.currentCount / this.online.sumCount * 10000) / 100.00
    },
    activePercent () {
      return Math.round(this.activeHost.active / this.activeHost.live * 10000) / 100.00
    }
  },
  methods: {
    async getActiveHostCount () {
      let res = await getActiveHostCount()
      console.log(res)
      if (res.data.code === 'success') {
        this.activeHost = res.data.result
      }
    },
    async getOnLineTotal () {
      let res = await getOnLineTotal()
      if (res.status === 200) {
        this.nbLive = res.data.result
      }
      // console.log(res)
    },
    async getRosterSum (rosterType) {
      let res = await getRosterSum(rosterType)
      if (rosterType === 4 && res.status === 200) {
        this.whiteList = res.data.result
      } else if (rosterType === 5 && res.status === 200) {
        this.ignoreList = res.data.result
      }
    },
    async getCurrentCount () {
      let res = await getCurrentCount()
      if (res.status === 200) {
        this.online = res.data
      }
    },
    funhandle () {
      this.getActiveHostCount()
      this.getOnLineTotal()
      this.getRosterSum(4)
      this.getRosterSum(5)
      this.getCurrentCount()
    }

  },
  mounted () {
    this.funhandle()
    if (this.timer) {
      clearInterval(timer)
    } else {
      this.timer = setInterval(() => {
        this.funhandle()
      }, 1000 * 60 * 30)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
  @import './home.less';
</style>
