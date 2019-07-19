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
                <input type="text" class="my-input" v-model="defaultConfig.btime">
                <span>请输入正整数，单位秒</span>
              </div>
            </Col>
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">ctime:</label>
                <input type="text" class="my-input" v-model="defaultConfig.ctime">
                <span>请输入正整数，单位秒</span>
              </div>
            </Col>

          </Row>
          <Row :gutter="30">
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">ltime:</label>
                <input type="text" class="my-input" v-model="defaultConfig.ltime">
                <span>请输入正整数，单位秒</span>
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
                <label for="" class="my-label">单个:</label>
                <i-switch v-model="defaultConfig.single" />
              </div>
            </Col>
          </Row>
        </div>
        <div class="save"><span @click="save(defaultConfig)">保存</span></div>
      </div>
      <!--白名单-->
      <div class="nav-content2" v-show="activeNav === 1">
        <Row class="list-head" type="flex" justify="space-between" align="top">
          <Col span="6"> <h3>白名单列表:</h3></Col>
          <!--<Col span="6">
            <Input suffix="ios-search" placeholder="Enter text" />
          </Col>-->
        </Row>
        <Row class="table-container">
          <Table :columns="white" :data="whiteList" :loading="loading" :show-header="false" stripe size="small">
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
            <Page :total="whitePageInfo.totalCount" @on-change="whitePageChange" prev-text="上一页" next-text="下一页" :page-size="this.whitePageInfo.pageSize" />
          </Col>
          <Col class="btn-group">
            <span @click="addWhiteModel = true">添加白名单</span>
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
            <Button type="info" size="large" long :loading="addWhiteLoading" @click="handleSubmit">确认添加</Button>
          </div>
        </Modal>
      </div>
      <!--忽略名单-->
      <div class="nav-content2" v-show="activeNav === 2">
        <Row class="list-head" type="flex" justify="space-between" align="top">
          <Col span="6"> <h3>忽略名单列表:</h3></Col>
         <!-- <Col span="6">
            <Input suffix="ios-search" placeholder="Enter text" />
          </Col>-->
        </Row>
        <Row class="table-container">
          <Table :columns="ignore" :data="ignoreList" :loading="loading" :show-header="false" stripe size="small">
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
            <Page :total="ignorePageInfo.totalCount" @on-change="ignorePageChange" prev-text="上一页" next-text="下一页" :page-size="ignorePageInfo.pageSize" />
          </Col>
          <Col class="btn-group">
            <span @click="addIgnoreModel = true">添加忽略名单</span>
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
import { mapState } from 'vuex'
import { getNbConfig, changeNbConfig, getNameList, deleteNbList, deleteNbLists, addIp} from '../../api/nbConfig'
import { uploadFile } from '../../api/upload'
import config from '@/config'
import qs from 'qs'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export default {
  name: 'config',
  data () {
    return {
      baseUrl: baseUrl,
      activeNav: 0,
      navList: [
        '模式参数',
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
      whitePageInfo: {
        pageNo: 1,
        pageSize: 8
      },
      ignorePageInfo: {
        pageNo: 1,
        pageSize: 8
      },
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
    /* 切换tab */
    changeNav (index) {
      this.activeNav = index
      switch (index) {
        case 1:
          this.getNameList(this.activeNb.nbCode, 4, this.whitePageInfo.pageNo, this.whitePageInfo.pageSize)
          break
        case 2:
          this.getNameList(this.activeNb.nbCode, 5, this.ignorePageInfo.pageNo, this.ignorePageInfo.pageSize)
          break
      }
    },
    async getDefaultConfig (nbCode) {
      let res = await getNbConfig({ nbCode: nbCode })
      //console.log(res)
      if (res.data.code) {
        this.defaultConfig = res.data.result[0]
        this.defaultConfig.learning = this.defaultConfig.learning !== 'off'
        this.defaultConfig.single = this.defaultConfig.single !== 'off'
      }
    },
    async save (arr) {
      let args = Object.assign({}, arr)
      args.learning = arr.learning ? 'on' : 'off'
      args.single = arr.single ? 'on' : 'off'
      let res = await changeNbConfig({ ...args })
      if (res.status === 200) {
        this.$Message.success('保存成功')
      }
    },
    async getNameList (nbCode, type, pageNo, pageSize) {
      this.loading = true
      let res = await getNameList({ nbCode: nbCode, type: type, pageNo: pageNo, pageSize: pageSize })
      this.loading = false
      if (res.status === 200) {
        if (type === 4) {
          this.whiteList = res.data.list
          this.whitePageInfo.totalCount = res.data.totalCount
        } else if (type === 5) {
          console.log('忽略名单')
          this.ignoreList = res.data.list
          console.log(this.ignoreList)
          this.ignorePageInfo.totalCount = res.data.totalCount
        }
      }
    },
    handleSubmit (name) {
      this.addIp()
    },
    async upload () {
      let fileFormData = new FormData()
      console.log(this.file)
      fileFormData.append('file', this.file)
      console.log(fileFormData)
      let res = await uploadFile({ file: 1232432 })
      console.log(res)
    },
    async addIp () {
      let type = ''
      if (this.activeNav === 1) {
        type = 4
        this.addWhiteLoading = true
        let res = await addIp({ nbCode: this.activeNb.nbCode, type: type, ipAddress: this.addWhiteForm.ipAdress, macAddress: this.addWhiteForm.macAdress })
        this.addWhiteLoading = false
       // console.log(res)
        if (res.data.code === 'success') {
          this.addWhiteModel = false
          this.$Message.success('添加成功')
          this.getNameList(this.activeNb.nbCode, 4, this.whitePageInfo.pageNo, this.whitePageInfo.pageSize)
        } else {
          this.$Message.error(res.data.result)
        }
      } else if (this.activeNav === 2) {
        type = 5
        this.addIgnoreLoading = true
        let res = await addIp({ nbCode: this.activeNb.nbCode, type: type, ipAddress: this.addIgnoreForm.ipAdress, macAddress: this.addIgnoreForm.macAdress })
        this.addIgnoreLoading = false
        if (res.data.code === 'success') {
          this.addIgnoreModel = false
          this.$Message.success('添加成功')
          this.getNameList(this.activeNb.nbCode, 5, this.ignorePageInfo.pageNo, this.ignorePageInfo.pageSize)
        } else {
          this.$Message.error(res.data.result)
        }
      }
    },
    /* 切换页码 */
    whitePageChange (page) {
      this.getNameList(this.activeNb.nbCode, 4, page, this.whitePageInfo.pageSize)
    },
    ignorePageChange (page) {
      this.getNameList(this.activeNb.nbCode, 5, page, this.whitePageInfo.pageSize)
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
            if (this.activeNav === 1) {
              this.whiteList.splice(index, 1)
            } else if (this.activeNav === 2) {
              this.ignoreList.splice(index, 1)
            }
          } else {
            this.$Modal.remove()
            this.$Message.error('删除失败')
          }
        }
      })
    },
    removeAll () {
      let ids = []
      if (this.activeNav === 1) {
        this.whiteList.map((item, index) => {
          ids.push(item.id)
        })
      } else if (this.activeNav === 2) {
        this.ignoreList.map((item, index) => {
          ids.push(item.id)
        })
      }
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定清空当前列表吗？</p>',
        loading: true,
        onOk: async () => {
          let res = await deleteNbLists({ ids: ids.toString() })
          console.log(res)
          if (res.data.code === 'success') {
            this.$Modal.remove()
            this.$Message.info('删除成功')
            if (this.activeNav === 1) {
              this.whiteList = []
            } else if (this.activeNav === 2) {
              this.ignoreList = []
            }
            ids = []
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
    }
  },
  mounted () {
    console.log(this.defaultConfig)
    this.getDefaultConfig(this.activeNb.nbCode)
  }
}
</script>
<style lang="less" scoped>
  @import "config";
</style>
