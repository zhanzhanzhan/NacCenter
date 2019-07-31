<template>
  <div class="view-content">
    <div class="title">
      {{activeNb.nbName}} <span>{{activeNb.nbCode}}</span>
    </div>
    <div class="nav-box">
      <div class="nav-bar">
        <div class="nav-item" v-for="(item,index) in navList" :class="activeNav === index ? 'active' : ''" @click="changeNav(index)">{{item}}</div>
      </div>
      <!--模式参数-->
      <div class="nav-content" v-show="activeNav === 0">
        <div class="form-group">
          <Row :gutter="30">
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">btime:</label>
                <input type="text" class="my-input" v-model="defaultConfig.btime" placeholder="请输入正整数，单位秒">
                <!--<span>请输入正整数，单位秒</span>-->
              </div>
            </Col>
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">ctime:</label>
                <input type="text" class="my-input" v-model="defaultConfig.ctime" placeholder="请输入正整数，单位秒">
               <!-- <span>请输入正整数，单位秒</span>-->
              </div>
            </Col>

          </Row>
          <Row :gutter="30">
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">ltime:</label>
                <input type="text" class="my-input" v-model="defaultConfig.ltime" placeholder="请输入正整数，单位秒">
               <!-- <span>请输入正整数，单位秒</span>-->
              </div>
            </Col>
          </Row>
          <Row :gutter="30">
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">学习模式:</label>
                <i-switch v-model="defaultConfig.learning" />
              </div>
            </Col>
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">单向模式:</label>
                <i-switch v-model="defaultConfig.single" />
              </div>
            </Col>
          </Row>
        </div>
        <div class="save"><span @click="save(defaultConfig)">保存</span></div>
      </div>
      <!--网络配置-->
      <div class="nav-content" v-show="activeNav === 1">
        <div class="form-group">
          <Row :gutter="30">
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">网关:</label>
                <input type="text" class="my-input" v-model.trim="netConfig.gateway" placeholder="请输入网关数据">
                <!-- <span>请输入网关数据</span>-->
              </div>
            </Col>
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">IP地址:</label>
                <input type="text" class="my-input" v-model="netConfig.ipaddress" placeholder="请输入IP地址">
                <!--<span>请输入IP地址</span>-->
              </div>
            </Col>
          </Row>
          <Row :gutter="30">
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">IP子网:</label>
                <input type="text" class="my-input" v-model="netConfig.ipsubnet" placeholder="请输入IP子网">
                <!--<span>请输入IP子网</span>-->
              </div>
            </Col>
            <!--<Col span="12">
              <div class="form-item">
                <label for="" class="my-label">NB序列号:</label>
                <input type="text" class="my-input" v-model="netConfig.nbCode">
                <span>请输入NB序列号</span>
              </div>
            </Col>-->
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">DNS服务地址:</label>
                <input type="text" class="my-input" v-model="netConfig.dnsser" placeholder="请输入DNS服务地址">
<!--
                <span>请输入DNS服务地址</span>
-->
              </div>
            </Col>
          </Row>
        </div>
        <div class="save"><span @click="saveNetInfo">保存</span></div>
      </div>
      <!--白名单-->
      <div class="nav-content2" v-show="activeNav === 2">
        <Row class="list-head" type="flex" justify="space-between" align="top">
          <Col span="6"> <h3>白名单列表:</h3></Col>
          <!--<Col span="6">
            <Input suffix="ios-search" placeholder="Enter text" />
          </Col>-->
        </Row>
        <Row class="table-container">
          <Table :columns="white" :data="whiteList" :loading="loading" height="300" :show-header="false" stripe size="small">
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
            <span @click="addWhiteModel = true">添加</span>
            <span @click="removeAll" v-if="whiteList.length>0">清空列表</span>
          </Col>
        </Row>
        <Modal v-model="addWhiteModel" width="360">
          <p slot="header" style="color:#333;text-align:center">
            <span>添加白名单</span>
          </p>
          <div style="text-align:center">
            <Form :model="addWhiteForm" label-position="left">
              <FormItem label="mac地址">
                <Input v-model="addWhiteForm.macAdress" placeholder="请输入mac地址"></Input>
              </FormItem>
              <FormItem label="ip地址" >
                <Input v-model="addWhiteForm.ipAdress" placeholder="请输入ip地址"></Input>
              </FormItem>
              <FormItem label="导入表格">
                <Upload :action="baseUrl" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
                  <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
                </Upload>
                <Row>
                  <div class="ivu-upload-list-file" v-if="file !== null">
                    <Icon type="ios-stats"></Icon>
                    {{ file.name }}
                    <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
                  </div>
                </Row>
                <Row>
                  <transition name="fade">
                    <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
                      <div v-if="progressPercent == 100">
                        <Icon type="ios-checkmark-circle"></Icon>
                        <span>成功</span>
                      </div>
                    </Progress>
                  </transition>
                </Row>
              </FormItem>

            </Form>
          </div>
          <div slot="footer">
            <Button type="info" size="large" long :loading="addWhiteLoading" @click="handleSubmit">确认添加</Button>
          </div>
        </Modal>
      </div>
      <!--忽略名单-->
      <div class="nav-content2" v-show="activeNav === 3">
        <Row class="list-head" type="flex" justify="space-between" align="top">
          <Col span="6"> <h3>忽略名单列表:</h3></Col>
         <!-- <Col span="6">
            <Input suffix="ios-search" placeholder="Enter text" />
          </Col>-->
        </Row>
        <Row class="table-container">
          <Table :columns="ignore" height="300" :data="ignoreList" :loading="loading" :show-header="false" stripe size="small">
            <template slot-scope="{ row }" slot="mac">
              <span style="font-size: 12px;color: #666">MAC地址：<span style="color: #00e9bc;margin-left: 20px">{{ row.macAddress }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="ip">
              <span style="font-size: 12px;color: #666">IP地址：<span style="color: #00e9bc;margin-left: 20px">{{ row.ipAddress }}</span></span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Icon type="ios-trash" size="24" color="#00e9bc" @click="removeList(row.id, index)"/>
            </template>
          </Table>
        </Row>
        <Row type="flex" justify="space-between" class="opera">
          <Col>
<!--
            <Page :total="ignorePageInfo.totalCount" @on-change="ignorePageChange" prev-text="上一页" next-text="下一页" :page-size="ignorePageInfo.pageSize" />
-->
          </Col>
          <Col class="btn-group">
            <span @click="addIgnoreModel = true">添加</span>
            <span @click="removeAll" v-if="ignoreList.length>0">清空列表</span>
          </Col>
        </Row>
        <Modal v-model="addIgnoreModel" width="360">
          <p slot="header" style="color:#333;text-align:center">
            <span>添加忽略名单</span>
          </p>
          <div style="text-align:center">
            <Form :model="addWhiteForm" label-position="left">
              <FormItem label="mac地址">
                <Input v-model="addIgnoreForm.macAdress" placeholder="请输入mac地址"></Input>
              </FormItem>
              <FormItem label="ip地址" >
                <Input v-model="addIgnoreForm.ipAdress" placeholder="请输入ip地址"></Input>
              </FormItem>
              <!-- <FormItem label="导入表格">
                 <Upload :action="baseUrl" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
                   <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
                 </Upload>
                 <Row>
                   <div class="ivu-upload-list-file" v-if="file !== null">
                     <Icon type="ios-stats"></Icon>
                     {{ file.name }}
                     <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
                   </div>
                 </Row>
                 <Row>
                   <transition name="fade">
                     <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
                       <div v-if="progressPercent == 100">
                         <Icon type="ios-checkmark-circle"></Icon>
                         <span>成功</span>
                       </div>
                     </Progress>
                   </transition>
                 </Row>
               </FormItem>-->

            </Form>
          </div>
          <div slot="footer">
            <Button type="info" size="large" long :loading="addIgnoreLoading" @click="handleSubmit">确认添加</Button>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNbConfig, changeNbConfig, updateNetWork, getNameList, deleteNbList, deleteNbLists, addIp } from '../../api/nbConfig'
import { uploadFile } from '../../api/upload'
import { setSystemStatus, getNetworkInfo } from '../../api/chart'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export default {
  name: 'config',
  data () {
    return {
      baseUrl: baseUrl,
      activeNav: 0,
      navList: [
        '模式参数',
        '网络配置',
        '白名单',
        '忽略名单'
      ],
      loading: false,
      white: [
        {
          title: 'Mac地址',
          slot: 'macAddress',
          width: 350
        },
        {
          title: 'Ip地址',
          slot: 'ipAddress'
        },

        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      whiteList: [
      ],
      ignore: [
        {
          title: 'Mac地址',
          slot: 'mac',
          width: 350
        },
        {
          title: 'Ip地址',
          slot: 'ip'
        },

        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      ignoreList: [],
      defaultConfig: {},
      addWhiteModel: false,
      addWhiteLoading: false,
      addWhiteForm: {
        macAdress: '',
        ipAdress: ''
      },
      addIgnoreLoading: false,
      addIgnoreModel: false,
      addIgnoreForm: {
        macAdress: '',
        ipAdress: ''
      },
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      netConfig: {
        ipaddress: '',
        dnsser: '',
        ipsubnet: '',
        gateway: ''
      }
    }
  },
  computed: {
    ...mapState({
      activeNb: state => state.app.activeNb
    })
  },
  watch: {
    activeNb: {
      handler (newVal, old) {
        this.$Loading.start()
        this.getDefaultConfig(this.activeNb.nbCode)
        this.$Loading.finish()
      },
      deep: true
      // immediate: true
    },
    $route: {
      handler (val, oldVal) {
        this.activeNav = 0
      },
      // 深度观察监听
      deep: true
    }

  },
  methods: {
    ...mapActions([
      'getAsideList'
    ]),
    /* 切换tab */
    changeNav (index) {
      console.log(index)
      this.activeNav = index
      switch (index) {
        case 1:
          this.getNetInfo()
          break
        case 2:
          this.getNameList(4)
          break
        case 3:
          this.getNameList(5)
          break
      }
    },
    /* 获取模式参数 */
    async getDefaultConfig (nbCode) {
      let res = await getNbConfig({ nbCode: nbCode })
      if (res.data.code === 'success') {
        this.defaultConfig = res.data.result[0]
        this.defaultConfig.learning = this.defaultConfig.learning !== 'off'
        this.defaultConfig.single = this.defaultConfig.single !== 'off'
      }
    },
    /* 保存模式设置 */
    async save (arr) {
      let args = Object.assign({}, arr)
      args.learning = arr.learning ? 'on' : 'off'
      args.single = arr.single ? 'on' : 'off'
      let res = await changeNbConfig({ ...args })
      if (res.data.code === 'success') {
        this.$Message.success('保存成功')
      }
    },
    /* 获取网络配置 */
    async getNetInfo () {
      let res = await getNbConfig({ nbCode: this.activeNb.nbCode })
      if (res.data.code === 'success') {
        this.netConfig = {
          ipaddress: res.data.result[0].ipaddress,
          dnsser: res.data.result[0].dnsser,
          ipsubnet: res.data.result[0].ipsubnet,
          gateway: res.data.result[0].gateway
        }
      }
    },
    /* 存储网络配置 */
    async saveNetInfo () {
      let json = {
        nbCode: this.activeNb.nbCode,
        ipaddress: this.netConfig.ipaddress,
        dnsser: this.netConfig.dnsser,
        ipsubnet: this.netConfig.ipsubnet,
        gateway: this.netConfig.gateway
      }
      let res = await updateNetWork(json)
      if (res.data.code === 'success') {
        this.$Message.success('保存成功')
        this.getNetInfo()
      } else {
        this.$Message.error(`保存失败${res.data.msg}`)
      }
    },
    /* 获取名单 */
    async getNameList (type) {
      this.loading = true
      let res = await getNameList({ nbCode: this.activeNb.nbCode, type: type })
      this.loading = false
      if (res.data.code === 'success') {
        if (type === 4) {
          this.whiteList = res.data.result
        } else if (type === 5) {
          this.ignoreList = res.data.result
        }
      }
    },
    handleSubmit (name) {
      this.addIp()
    },
    async upload () {
      let fileFormData = new FormData()
      fileFormData.append('file', this.file)
      let res = await uploadFile(fileFormData)
      console.log(res)
    },
    async addIp () {
      let type = ''
      /* 白名单 */
      if (this.activeNav === 2) {
        type = 4
        this.addWhiteLoading = true
        let json = {
          nbCode: this.activeNb.nbCode,
          type: type,
          ipAddress: this.addWhiteForm.ipAdress,
          macAddress: this.addWhiteForm.macAdress
        }
        let res = await addIp(json)
        this.addWhiteLoading = false
        if (res.data.code === 'success') {
          this.addWhiteModel = false
          this.$Message.success('添加成功')
          this.getNameList(4)
        } else {
          this.$Message.error(res.data.result)
        }
        this.upload()
      }
      /* 忽略名单 */
      else if (this.activeNav === 3) {
        type = 5
        this.addIgnoreLoading = true
        let json = {
          nbCode: this.activeNb.nbCode,
          type: type,
          ipAddress: this.addIgnoreForm.ipAdress,
          macAddress: this.addIgnoreForm.macAdress
        }
        let res = await addIp(json)
        this.addIgnoreLoading = false
        if (res.data.code === 'success') {
          this.addIgnoreModel = false
          this.$Message.success('添加成功')
          this.getNameList(5)
        } else {
          this.$Message.error(res.data.result)
        }
      }
    },
    /* 删除列表 */
    removeList (id, index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除这条列表吗？</p>',
        loading: true,
        onOk: async () => {
          let res = await deleteNbList({ id: id })
          console.log(res)
          if (res.data.code === 'success') {
            this.$Modal.remove()
            this.$Message.info('删除成功')
            if (this.activeNav === 2) {
              this.whiteList.splice(index, 1)
            } else if (this.activeNav === 3) {
              this.ignoreList.splice(index, 1)
            }
          } else {
            this.$Modal.remove()
            this.$Message.error('删除失败')
          }
        }
      })
    },
    /* 清空列表 */
    removeAll () {
      let type = this.activeNav === 2 ? 4 : 5
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定清空当前列表吗？</p>',
        loading: true,
        onOk: async () => {
          let res = await deleteNbLists({ nbCode: this.activeNb.nbCode, type: type })
          console.log(res)
          if (res.data.code === 'success') {
            this.$Modal.remove()
            this.$Message.info('删除成功')
            if (this.activeNav === 2) {
              this.whiteList = []
            } else if (this.activeNav === 3) {
              this.ignoreList = []
            }
          } else {
            this.$Modal.remove()
            this.$Message.error('删除失败')
          }
        }
      })
    },
    initUpload () {
      this.file = null
      this.showProgress = false
      this.loadingProgress = 0
    },
    handleUploadFile () {
      this.initUpload()
    },
    handleRemove () {
      this.initUpload()
      this.$Message.info('上传的文件已删除！')
    },
    handleBeforeUpload (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file)
        this.file = file
      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        })
      }
      return false
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {
        this.uploadLoading = true
        this.showProgress = true
      }
      reader.onprogress = e => {
        this.progressPercent = Math.round(e.loaded / e.total * 100)
      }
      reader.onerror = e => {
        this.$Message.error('文件读取出错')
      }
      reader.onload = e => {
        this.$Message.info('文件读取成功')
        const data = e.target.result
       // const { header, results } = excel.read(data, 'array')
        this.uploadLoading = false
        this.showRemoveFile = true
      }
    },
    /**/

  },
  mounted () {
    this.getDefaultConfig(this.activeNb.nbCode)
  },
  /*beforeDestroy () {
    this.getAsideList()
  }*/
}
</script>
<style lang="less" scoped>
  @import "config";
</style>
