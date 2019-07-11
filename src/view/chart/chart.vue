<template>
  <div class="view-content">
    <div class="title">
      NginxLB <span>Nginx 1.10.103</span>
    </div>
    <div class="info-list">
      <Row :gutter="10">
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              当前网络信息
            </div>
            <div class="item-content">
              <div class="list-item" v-for="i in 15">
                <span class="name">IP地址</span>：
                <span class="value">192.168.0.1</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              当前模式设置
            </div>
            <div class="item-content">
              <div class="list-item" v-for="i in 15">
                <span class="name">IP地址</span>：
                <span class="value">192.168.0.1</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              当前白名单
            </div>
            <div class="item-content">
              <div class="list-item2" v-for="i in 15">
                <span>00:0c:29 07:b7:e2</span>
                <span>192.168.0.1</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              当前活动主机列表
            </div>
            <div class="item-content">
              <div class="list-item2" v-for="i in 15">
                <span>00:0c:29 07:b7:e2</span>
                <span>192.168.0.1</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              当前白名单
            </div>
            <div class="item-content">
              <div class="list-item2" v-for="i in 15">
                <span>00:0c:29 07:b7:e2</span>
                <span>192.168.0.1</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              当前白名单
            </div>
            <div class="item-content">
              <div class="list-item2" v-for="i in 15">
                <span>00:0c:29 07:b7:e2</span>
                <span>192.168.0.1</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              当前现状
            </div>
            <div class="item-content">
              <div class="list-item" v-for="i in 15">
                <span class="name">IP地址</span>：
                <span class="value">192.168.0.1</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chart',
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
  @import "chart";
</style>
