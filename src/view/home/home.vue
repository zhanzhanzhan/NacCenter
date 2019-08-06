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
            <div class="progress-num">{{whiteList}} <span></span></div>
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
           <!--   <chart-pie style="height: 150px;width: 150px;" :value="pieData" text="活跃主机"></chart-pie>-->
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
            <div class="progress-num">{{ignoreList}} <span></span></div>
          </div>
        </div>
        <div class="content-item">
          <div class="title">
            红色警报
          </div>
          <div class="body">
            <div class="progress-num">{{warning}}</div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { getActiveHostCount, getOnLineTotal, getRosterSum, getBlockHostCount } from '../../api/home'
import { getCurrentCount } from '../../api/chart'
import { ChartPie } from '_c/charts'
export default {
  name: 'home',
  components: {
    ChartPie
  },
  data () {
    return {
      nbLive: {}, // nb在线
      activeHost: {}, // 活跃主机
      online: {}, // 在线
      whiteList: {}, // 白名单
      ignoreList: {}, // 忽略名单
      timer: null,
      warning: '',
      pieData: [
        { value: 335, name: '活跃' },
        { value: 310, name: '在线' },
      ]
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
    /* 活跃 */
    async getActiveHostCount () {
      let res = await getActiveHostCount()
      if (res.data.code === 'success') {
        this.activeHost = res.data.result
        this.pieData = [
          { value: this.activeHost.live, name: '活跃' + this.activeHost.live },
          { value: this.activeHost.active, name: '不活跃' + this.activeHost.active },
        ]
      }
    },
    async getOnLineTotal () {
      let res = await getOnLineTotal()
      if (res.data.code === 'success') {
        this.nbLive = res.data.result
      }
    },
    async getRosterSum (rosterType) {
      let res = await getRosterSum(rosterType)
      if (rosterType === 4 && res.data.code === 'success') {
        this.whiteList = res.data.result
      } else if (rosterType === 5 && res.data.code === 'success') {
        this.ignoreList = res.data.result
      }
    },
    async getCurrentCount () {
      let res = await getCurrentCount()
      if (res.data.code === 'success') {
        this.online = res.data.result
      }
    },
    /* 获取入侵主机 /报警 */
    async getBlockHostCount () {
      let res = await getBlockHostCount()
      console.log(res)
      if (res.data.code === 'success') {
        this.warning = res.data.result.blockHostCount || 0
      }
    },
    funhandle () {
      this.getActiveHostCount()
      this.getOnLineTotal()
      this.getRosterSum(4)
      this.getRosterSum(5)
      this.getCurrentCount()
      this.getBlockHostCount()
    }

  },
  mounted () {
    this.funhandle()
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        this.funhandle()
      }, 1000 * 60)
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
