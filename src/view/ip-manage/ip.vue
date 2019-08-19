<template>
  <div>
    <Row class="list-head" type="flex" justify="space-between" align="top">
      <Col span="6"><h3>白名单列表:</h3></Col>
      <!--<Col span="6">
        <Input suffix="ios-search" placeholder="Enter text" />
      </Col>-->
    </Row>
    <Row class="table-container">
      <Table :columns="white" :data="whiteList" :loading="loading" height="300" :show-header="false" stripe
             size="small">
        <template slot-scope="{ row }" slot="macAddress">
          <span style="font-size: 12px;color: #666">MAC地址：<span style="color: #00e9bc;margin-left: 20px">{{ row.macAddress }}</span></span>
        </template>
        <template slot-scope="{ row }" slot="ipAddress">
          <span style="font-size: 12px;color: #666">IP地址：<span style="color: #00e9bc;margin-left: 20px">{{ row.ipAddress }}</span></span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-trash" size="24" color="#00e9bc" @click="removeList(row.id, index)"/>
        </template>
      </Table>
    </Row>
    <Row type="flex" justify="space-between" class="opera">
      <Col>
      </Col>
      <Col class="btn-group">
        <span @click="ipModifyModal = true">添加</span>

      </Col>
    </Row>
    <Modal v-model="ipModifyModal" width="360">
      <p slot="header" style="color:#333;text-align:center">
        <span>添加白名单</span>
      </p>
      <div style="text-align:center">
        <Form :model="ipModifyForm"  label-position="left" ref="ipModifyForm" :rules="ipModifyFormRules">
          <FormItem label="mac地址" prop="macAddress">
            <Input v-model.trim="ipModifyForm.macAddress" placeholder="请输入mac地址"></Input>
          </FormItem>
          <FormItem label="ip地址" prop="ipAddress">
            <Input v-model.trim="ipModifyForm.ipAddress" placeholder="请输入ip地址"></Input>
          </FormItem>
          <FormItem label="类型" prop="type">
            <Select v-model="ipModifyForm.type" placeholder="请选择类型">
              <Option :value="0">游客</Option>
              <Option :value="1">普通</Option>

            </Select>
          </FormItem>

        </Form>
      </div>
      <div slot="footer">
        <Button type="info" size="large" long :loading="loading" @click="handleSubmit('ipModifyForm')">确认添加</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'ip',
    data () {
      const ipaddressRules = (rule, value, callback) => {
        if (!value) callback(new Error('请输入ip地址！'))
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        if (!reg.test(value)) {
          callback(new Error('请检查IP地址格式！'))
        }
        callback()
      }
      const macAddressRules = (rule, value, callback) => {
        if (!value) callback(new Error('请输入mac地址！'))
        let reg = /^[a-fA-F0-9]{2}([:-][a-fA-F0-9]{2}){5}$/
        if (!reg.test(value)) {
          callback(new Error('请检查IP地址格式！'))
        }
        callback()
      }
      return {
        ipModifyModal: false,
        ipModifyForm: {},
        ipModifyFormRules: {
          macAdress: [
            { validator: macAddressRules, trigger: 'blur' }
          ],
          ipAdress: [
            { validator: ipaddressRules, trigger: 'blur' }
          ]
        },
        type: 0, // 修改
      }
    }
  }
</script>
