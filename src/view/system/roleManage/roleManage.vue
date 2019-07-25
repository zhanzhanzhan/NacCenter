<template>
  <div class="main-content">
    <Tabs :value="tab" @on-click="tabChange" >
      <TabPane label="角色列表" name="tab1">
        <Table border :columns="tableColumns" :data="roleList">
          <template slot-scope="{ row }" slot="userName">
            <strong>{{ row.userName }}</strong>
          </template>
          <template slot-scope="{ row }" slot="activation">
            {{ row.activation? '是' : '否' }}
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index, row)">修改</Button>
          </template>
        </Table>
        <!-- <Table border :columns="columns7" :data="data6" max-height="500"></Table>-->
      </TabPane>
      <TabPane label="新增角色" name="tab2">
        <Row justify="center" type="flex" style="margin-top: 50px;">
          <Col span="8">
            <!--<Form :model="insUserForm" :label-width="80" ref="addUser" :rules="insUserFormValidate"  label-position="left">
              <FormItem label="账号" prop="userNo">
                <Input v-model="insUserForm.userNo" placeholder="请输入用户账号"></Input>
              </FormItem>
              <FormItem label="用户名" prop="userName">
                <Input v-model="insUserForm.userName" placeholder="请输入用户名"></Input>
              </FormItem>
              <FormItem label="密码" prop="password">
                <Input v-model="insUserForm.password" placeholder="请输入密码"></Input>
              </FormItem>
              <FormItem label="角色名称" prop="roleId">
                <Select v-model="insUserForm.roleId">
                  <Option :value="item.roleId" v-for="(item, index) in roleNameList">{{item.roleName}}</Option>
                </Select>
              </FormItem>
              <FormItem label="激活" style="text-align: right">
                <i-switch v-model="insUserForm.activation" size="large">
                  <span slot="open">On</span>
                  <span slot="close">Off</span>
                </i-switch>
              </FormItem>
            </Form>
            <Row justify="center" type="flex" style="margin-top: 40px;">
              <Button type="primary" long :loading="saveLoading" @click="handleSubmit('addUser')" ghost>保存</Button>
            </Row>-->
          </Col>
        </Row>

      </TabPane>
      <Input search v-model="searchText" placeholder="输入用户名查询" slot="extra" @on-search="selUserInfo(searchText)" v-if="tab === 'tab1'"/>
      <!--对话框-->
      <Modal
        v-model="modal"
        title="修改用户信息"
        @on-ok="ok">
        <div style="padding: 20px">
          <!--<Form :model="activeUserInfo" :label-width="80" ref="uptUser" :rules="uptUserValidate">
            <FormItem label="用户名" prop="userName">
              <Input v-model="activeUserInfo.userName" placeholder="请输入用户名"></Input>
            </FormItem>
            &lt;!&ndash; <FormItem label="账号">
               <Input v-model="activeUserInfo.userNo" disabled></Input>
             </FormItem>&ndash;&gt;
            <FormItem label="角色名称">
              <Select v-model="activeUserInfo.roleName">
                <Option :value="item.roleName" v-for="(item, index) in roleNameList">{{item.roleName}}</Option>
              </Select>
            </FormItem>
            <FormItem label="激活" style="text-align: right">
              <i-switch v-model="activeUserInfo.activation" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
              </i-switch>
            </FormItem>
          </Form>-->
        </div>

      </Modal>
    </Tabs>
  </div>
</template>
<script>
export default {
  name: 'roleManage',
  data () {
    return {
      tableColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'userName',
          slot: 'userName'
        },
        {
          title: '用户账号',
          key: 'userNo'
        },
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '是否激活',
          key: 'activation',
          slot: 'activation'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          slot: 'action'
        }
      ],
      roleList: [],
    }
  }
}
</script>
<style lang="less" scoped>
  @import "roleManage";
</style>
