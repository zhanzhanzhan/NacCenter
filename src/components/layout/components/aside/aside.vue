<template>
  <div class="aside-wrap">
    <Input suffix="ios-search" placeholder="输入nbCode搜索" v-model="searchText" clearable @on-clear="clear" @keyup.enter.native="search(searchText)"/>
    <div class="aside-list">
      <div class="aside-item" :class="item.nbCode === activeNb.nbCode  ? 'active' : ''" v-for="(item,index) in asideList"
           @click="changeActive(index,item)"
            :key="item.id">
        <div class="title">
        <!--  <span class="online" v-if="item.onLineStatus"></span>
          <span class="offline" v-if="!item.onLineStatus"></span>-->
          <Icon type="md-power" size="20" color="#ccc" v-if="!item.onLineStatus"/>
          <Icon type="md-power" size="20" color="#00e9bc" title="点击重启" @click="changeStatus(item.nbCode,2)" v-if="item.onLineStatus"/>
          {{item.nbName}}
        </div>
        <div class="info">{{item.nbCode}}</div>
        <Icon type="ios-close-circle" title="删除此项" class="delete" size="18" color="#555" @click="removeNb(item.nbCode)"/>
      </div>
    </div>
    <div class="add-list" @click="addNbModel = true">
      <span>添加</span>
    </div>
    <Modal v-model="addNbModel" width="360">
      <p slot="header" style="color:#333;text-align:center">
        <span>添加机器</span>
      </p>
      <div style="text-align:center">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left">
          <FormItem label="机器序列号" prop="nbCode">
            <Input v-model="formValidate.nbCode" placeholder="请输入机器序列号"></Input>
          </FormItem>
          <FormItem label="自定义名称" prop="nbName">
            <Input v-model="formValidate.nbName" placeholder="请输入自定义名称"></Input>
          </FormItem>

        </Form>
      </div>
      <div slot="footer">
        <Button type="info" size="large" long :loading="modal_loading" @click="handleSubmit('formValidate')">确认添加</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { addNb, findNb, delNb } from '../../../../api/config'
import { changeStatus } from '../../../../api/chart'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'MyAside',
  data () {
    return {
      isActive: 0,
      addNbModel: false, // 添加nb 弹窗
      modal_loading: false,
      formValidate: {
        nbName: '',
        nbCode: ''
      },
      ruleValidate: {
        nbCode: [
          { required: true, message: 'nbCode不能为空', trigger: 'blur' }
        ],
        nbName: [
          { required: true, message: 'nbName不能为空', trigger: 'blur' }
        ]
      },
      searchText: ''
    }
  },
  computed: {
    ...mapState({
      activeNb: state => state.app.activeNb,
      asideList: state => state.app.asideList
    })
  },
  methods: {
    ...mapMutations({
      'setActiveNb': 'setActiveNb',
      'setAsideList': 'setAsideList'
    }),
    ...mapActions([
      'getAsideList'
    ]),
    clear () {
      this.getAllNbList()
    },
    changeActive (index, item) {
      this.isActive = index
      this.setActiveNb(item)
      if (this.$route.name === 'chartChild') {
        this.$router.push({ path: `/chart`, query: { nbCode: this.activeNb.nbCode } })
      } else if (this.$route.name === 'configChild') {
        this.$router.push({ path: `/config`, query: { nbCode: this.activeNb.nbCode } })
      } else if (this.$route.name === 'managementChild') {
        this.$router.push({ path: `/management`, query: { nbCode: this.activeNb.nbCode } })
      }
    },
    getAllNbList (refresh) {
      this.getAsideList(refresh)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addNb(this.formValidate.nbCode, this.formValidate.nbName)
        } else {
          // this.$Message.error('Fail!')
        }
      })
    },
    async addNb (nbCode, nbName) {
      this.modal_loading = true
      let res = await addNb({ nbCode: nbCode, nbName: nbName })
      this.modal_loading = false
      if (res.data.code === 'success') {
        this.addNbModel = false
        this.$Message.success('添加成功')
        this.formValidate = {
          nbName: '',
          nbCode: ''
        }
        this.getAllNbList()
      } else {
        this.$Message.error('添加失败')
        this.addNbModel = false
      }
    },
    async removeNb (nbCode) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要删除这条Nb吗？</p>',
        loading: true,
        onOk: async () => {
          let res = await delNb(nbCode)
          if (res.data.code === 'success') {
            this.$Modal.remove()
            this.$Message.info('删除成功')
            this.getAllNbList(true)
            console.log(this.asideList)
            this.$router.push({ path: this.$route.path, query: { nbCode: this.asideList[0].nbCode } })
          } else {
            this.$Modal.remove()
            this.$Message.error('删除失败')
          }
        }
      })
    },
    async search (nbCode) {
      let res = await findNb(nbCode)
      console.log(res)
      if (res.data.code === 'success' && res.data.result !== null) {
        let arr = []
        arr.push(res.data.result)
        this.setAsideList(arr)
      } else {
        this.$Message.error('没有找到，请检查输入的nbCode是否正确')
      }
    },
    /* 重启nb */
    async changeStatus (nbCode, type) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要重启这个Nb吗？</p>',
        loading: true,
        onOk: async () => {
          let res = await changeStatus({ nbCode: nbCode, type: type })
          console.log(res)
          if (res.data.code === 'success') {
            this.$Modal.remove()
            this.$Message.info('重启成功')
          } else {
            this.$Modal.remove()
            this.$Message.error('重启失败')
          }
        }
      })
    }
  },
  mounted () {
    this.getAllNbList(true)
  }
}
</script>
<style lang="less" scoped>
  @import "aside";
</style>
