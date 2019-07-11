<template>
  <div class="home">
      <div class="content">
        <div class="content-item">
          <div class="title">
            Nacbox在线
          </div>
          <div class="body">
            <div class="progress-num">78%</div>
            <Progress :percent="25" :stroke-width="5" hide-info stroke-color="#fff"/>
          </div>
        </div>
        <div class="content-item">
          <div class="title">
            在线主机
          </div>
          <div class="body">
            <div class="chart-head">
              <span> <i></i>在线</span>
              <span> <i></i>离线</span>
            </div>
            <div class="chart">
                <div class="triangle-1">
                  <div class="triangle-2"></div>
                </div>
          </div>
          </div>
        </div>
        <div class="content-item">
          <div class="title">
            白名单
          </div>
          <div class="body">
            <div class="progress-num">147 <span>个</span></div>
          </div>
        </div>
        <div class="content-item">
          <div class="title">
            活跃主机
          </div>
          <div class="body">
            <div class="chart-head">
              <span> <i></i>活跃 51</span>
              <span> <i></i>不活跃 192</span>
            </div>
            <div class="chart">
              <div class="round-1">
                <div class="round-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="title">
            忽略名单
          </div>
          <div class="body">
            <div class="progress-num">39 <span>个</span></div>
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
<style lang="less" scoped>
  @import './home.less';
</style>
