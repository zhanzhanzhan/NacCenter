<template>
    <Row class="header">
      <div class="logo"></div>
      <div class="tags-nav">
        <router-link :to="{path: '/home'}">系统概览</router-link>
        <router-link :to="{path: '/chart'}">图表</router-link>
        <router-link :to="{path: '/config'}">配置</router-link>
        <router-link :to="{path: '/overview'}">报警</router-link>
      </div>
      <div class="profile">
        <Dropdown style="margin-left: 20px" placement="bottom-end" trigger="click">
          <a href="javascript:void(0)"  class="trigger">
            userName
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

    </row>
</template>
<script>
export default {
  name: 'my-header'
}
</script>
<style scoped lang="less">
  .router-link-exact-active{
    color: #00c5a2!important;
  }
  .header{
    display: flex;
    height: 94px;
    min-width: 996px;
    background: #fff;
    align-items: center;
    .logo{
      width: 239px;
      height: 69px;
      margin-left: 20px;
      background: url(../../../../assets/images/logo.png) no-repeat;
    }
    .tags-nav{
      flex: 1;
      margin-left: 50px;
      a{
        font-size: 24px;
        color: #505050;
        margin: 0 20px;
      }
    }
    .profile{
      //background: #e5e5e5;
      &:hover{
        background: #e5e5e5;
      }
      height: 100%;
      display: flex;
      align-items: center;
      /deep/.ivu-dropdown{
        height: 100%;
      }
      /deep/.ivu-dropdown-rel{
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 24px;
        padding: 0 30px;
        a{
          color: #666;
        }
      }
    }
  }

</style>
