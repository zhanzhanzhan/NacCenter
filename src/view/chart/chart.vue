<template>
  <div class="view-content">
    <div class="title">
      {{activeNb.nbName}} <span>{{activeNb.nbCode}}</span>
    </div>
    <div class="info-list">
      <Row type="flex" :gutter="10" style="flex-wrap: wrap" class="info-item-wrap">
        <Col :xxl="6" :xl="8" :lg="12" :xs="13" :sm="13" :md="13">
          <div class="info-item">
            <div class="item-title">
              网络信息
            </div>
            <div class="item-content" v-if="networkInfo">
              <div class="list-item">
                <span class="name">IP地址</span>：
                <span class="value">{{networkInfo.ipAddress}}</span>
              </div>
              <div class="list-item">
                <span class="name">IP子网</span>：
                <span class="value">{{networkInfo.ipSubnet}}</span>
              </div>
              <div class="list-item">
                <span class="name">网关</span>：
                <span class="value">{{networkInfo.geteway}}</span>
              </div>
              <div class="list-item">
                <span class="name">DNS服务器</span>：
                <span class="value">{{networkInfo.serverAddress}}</span>
              </div>
            </div>
            <div class="item-content" v-if="!networkInfo" style="text-align: center">暂无数据</div>
          </div>
        </Col>
        <Col :xxl="6" :xl="8" :lg="12" :xs="13" :sm="13" :md="13" >
          <div class="info-item">
            <div class="item-title">
              系统现状
            </div>
            <div class="item-content" v-if="system">
              <div class="list-item">
                <span class="name">系统负载</span>：
                <span class="value">{{system.systemLoad}}</span>
              </div>
              <div class="list-item">
                <span class="name">运行时长</span>：
                <span class="value">{{system.squadLeader !== '' ? system.squadLeader : '未开始运行'}}</span>
              </div>
              <div class="list-item">
                <span class="name">在线主机</span>：
                <span class="value">{{system.liveHost}}</span>
              </div>
              <div class="list-item">
                <span class="name">白名单</span>：
                <span class="value">{{system.nameList}}</span>
              </div>
              <div class="list-item">
                <span class="name">忽略名单</span>：
                <span class="value">{{system.ignoreHost}}</span>
              </div>
              <div class="list-item">
                <span class="name">入侵主机</span>：
                <span class="value">{{system.blockingHost}}</span>
              </div>
              <div class="list-item">
                <span class="name">阻挡进程</span>：
                <span class="value">{{system.runningBlk}}</span>
              </div>
              <div class="list-item">
                <span class="name">学习时长</span>：
                <span class="value">{{system.le_time ? system.le_time : '未开启学习模式'}}</span>
              </div>
              <div class="list-item">
                <span class="name">nb序列号</span>：
                <span class="value">{{system.nbCode}}</span>
              </div>
              <div class="list-item">
                <span class="name">版本号</span>：
                <span class="value">{{system.version}}</span>
              </div>
            </div>
            <div class="item-content" v-if="!system" style="text-align: center">暂无数据</div>
          </div>
        </Col>

        <Col :xxl="6" :xl="8" :lg="12" :xs="13" :sm="13" :md="13">
          <div class="info-item">
            <div class="item-title">
              白名单
            </div>
            <div style="text-align: center" class="item-content" v-if="!whiteList.length ">暂无数据</div>
            <div class="item-content" v-if="whiteList.length">
              <div class="list-item2" v-for="(item, index) in whiteList">
                <span>{{item.ipAddress}}</span>
                <span>{{item.macAddress}}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col :xxl="6" :xl="8" :lg="12" :xs="13" :sm="13" :md="13" >
          <div class="info-item">
            <div class="item-title">
              忽略名单
            </div>
            <div class="item-content">
              <div style="text-align: center" v-if="!ignoreList.length">暂无数据</div>
              <div class="list-item2" v-for="(item, index) in ignoreList" v-if="ignoreList.length">
                <span>{{item.ipAddress}}</span>
                <span>{{item.macAddress}}</span>
              </div>
            </div>
          </div>
        </Col>

        <Col :xxl="6" :xl="8" :lg="12" :xs="13" :sm="13" :md="13" >
          <div class="info-item">
            <div class="item-title">
              在线主机列表
            </div>
            <div class="item-content">
              <div style="text-align: center" v-if="!onlineMasteList.length">暂无数据</div>
              <div class="list-item2" v-for="(item, index) in onlineMasteList" v-if="onlineMasteList.length">
                <span>{{item.macAddress}}</span>
                <span>{{item.ipAddress}}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col :xxl="6" :xl="8" :lg="12" :xs="13" :sm="13" :md="13" >
          <div class="info-item">
            <div class="item-title">
              入侵主机列表
            </div>
            <div class="item-content">
              <div style="text-align: center" v-if="!blockingHost.length">暂无数据</div>
              <div class="list-item2" v-for="(item, index) in blockingHost" v-if="blockingHost.length">
                <span>{{item.macAddress}}</span>
                <span>{{item.ipAddress}}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col :xxl="6" :xl="8" :lg="12" :xs="13" :sm="13" :md="13" >
          <div class="info-item">
            <div class="item-title">
              活跃主机列表
            </div>
            <div class="item-content">
              <div style="text-align: center" v-if="!liveMasteList.length">暂无数据</div>
              <div class="list-item2" v-for="(item, index) in liveMasteList" v-if="liveMasteList.length">
                <span>{{item.macAddress}}</span>
                <span>{{item.ipAddress}}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col :xxl="6" :xl="8" :lg="12" :xs="13" :sm="13" :md="13" >
          <div class="info-item">
            <div class="item-title">
              模式设置
            </div>
            <div class="item-content" v-if="system">
              <div class="list-item" >
                <span class="name">单向模式</span>：
                <span class="value">{{system.single}}</span>
              </div>
              <div class="list-item" >
                <span class="name">学习模式</span>：
                <span class="value">{{system.studyMode}}</span>
              </div>
              <div class="list-item" >
                <span class="name">btime</span>：
                <span class="value">{{system.ctime}}</span>
              </div>
              <div class="list-item" >
                <span class="name">ctime</span>：
                <span class="value">{{system.btime}}</span>
              </div>
              <div class="list-item" >
                <span class="name">ltime</span>：
                <span class="value">{{system.ltime}}</span>
              </div>
            </div>
            <div style="text-align: center" class="item-content" v-if="!modeSet">暂无数据</div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNetworkInfo, getStudyMode, getMasterInfo, getSystemStatus } from '../../api/chart'

export default {
  name: 'chart',
  data () {
    return {
      timer: null,
      networkInfo: {}, // 网络信息
      modeSet: {}, // 模式
      whiteList: [], // 白名单
      ignoreList: [], // 忽略名单
      liveMasteList: [], // 活跃主机
      onlineMasteList: [], // 在线主机
      system: {
      }, // 当前现状
      blockingHost: {} // 入侵主机
    }
  },
  methods: {
    ...mapActions([
      'getAsideList'
    ]),
    /* 网络信息*/
    async getNetworkInfo (nbCode) {
      let res = await getNetworkInfo({ nbCode: nbCode })
      if (res.data.code === 'success') {
        this.networkInfo = res.data.result
      }
    },
    /*模式设置*/
    async getStudyMode (nbCode) {
      let res = await getStudyMode({ nbCode: nbCode })
      if (res.data.code === 'success') {
        this.modeSet = res.data.result
      } else {
        this.modeSet = null
      }
    },
    // /* 名单列表 */
    // async nbGetNameList (nbCode, type) {
    //   let res = await nbGetNameList({ nbCode: nbCode, type: type })
    //
    //   if (res.data.code === 'success') {
    //
    //     if (type === 4) {
    //       this.whiteList = res.data.result
    //     } else if (type === 5) {
    //       console.log(res)
    //       this.ignoreList = res.data.result
    //     }
    //   }
    // },
    /* 主机列表*/
    async getMasterInfo (nbCode, type) {
      let res = await getMasterInfo({ nbCode: nbCode, type: type })
      if (res.data.code === 'success') {
       // console.log(res)
        switch (type) {
          case 1:
            this.onlineMasteList = res.data.result ? res.data.result : []
            break
          case 2:
            this.liveMasteList = res.data.result ? res.data.result : []
            break
          case 3:
            this.blockingHost = res.data.result ? res.data.result : []
            break
          case 4:
            this.whiteList = res.data.result ? res.data.result : []
            break
          case 5:
            this.ignoreList = res.data.result ? res.data.result : []
            break
        }
      }
    },
    forMateDate (date) {
      if (!date) return 0
      let day, hour, minute, second
      if (date.split('-')[1]) {
        day = date.split('-')[0] + '天'
        hour = date.split('-')[0].split(':')[0] + '时'
        minute = date.split('-')[0].split(':')[1] + '分'
        second = date.split('-')[0].split(':')[2] + '秒'
      } else if (date.split('-')[0].split(':').length === 3) {
        day = ''
        hour = date.split('-')[0].split(':')[0] + '时'
        minute = date.split('-')[0].split(':')[1] + '分'
        second = date.split('-')[0].split(':')[2] + '秒'
      } else if (date.split('-')[0].split(':').length === 2) {
        day = ''
        hour = ''
        minute = date.split('-')[0].split(':')[0] + '分'
        second = date.split('-')[0].split(':')[1] + '秒'
      } else if (date.split('-')[0].split(':').length === 1) {
        day = ''
        hour = ''
        minute = ''
        second = date.split('-')[0].split(':')[0] + '秒'
      } else {

      }

      let time = {
        day: day,
        hour: hour,
        minute: minute,
        second: second
      }
      return `${time.day}${time.hour}${time.minute}${time.second}`
    },
    /* 系统现状 */
    async getSystemStatus (nbCode) {
      let res = await getSystemStatus({ nbCode: nbCode })
      console.log(res)
      if (res.data.code === 'success') {
        this.system = res.data.result
        if (!res.data.result) return

        this.system.squadLeader = this.forMateDate(res.data.result.squadLeader)
        this.system.le_time = this.forMateDate(res.data.result.le_time)
      }
    },
    funHandle () {
      this.getNetworkInfo(this.activeNb.nbCode)
      this.getStudyMode(this.activeNb.nbCode)
      this.getMasterInfo(this.activeNb.nbCode, 1)
      this.getMasterInfo(this.activeNb.nbCode, 2)
      this.getMasterInfo(this.activeNb.nbCode, 3)
      this.getMasterInfo(this.activeNb.nbCode, 4)
      this.getMasterInfo(this.activeNb.nbCode, 5)
      this.getSystemStatus(this.activeNb.nbCode)
    }
  },
  computed: {
    ...mapState({
      activeNb: state => state.app.activeNb,
      asideList: state => state.app.asideList
    })
  },
  watch: {
    $route: {
      handler (newVal, old) {
        this.$Loading.start()
        this.funHandle()
        this.$Loading.finish()
      }
    }

  },
  mounted () {
    this.funHandle()
    this.timer = setInterval(() => {
      this.funHandle()
    }, 1000 * 60)
  },
  destroyed () {
    clearInterval(this.timer) // 清除定时器
    this.timer = null
  }
}
</script>
<style lang="less" scoped>
  @import "chart";
</style>
