<template>
  <div class="aside-wrap">
    <Input suffix="ios-search" placeholder="输入nbCode搜索" v-model="searchText" clearable @on-clear="clear" @keyup.enter.native="search(searchText)"/>
    <div class="aside-list">
      <div class="aside-item" :class="item.nbCode === activeNb.nbCode  ? 'active' : ''" v-for="(item,index) in asideList"
           @click="changeActive(index,item)"
            :key="item.id">
        <div class="title"> <span class="online" v-if="item.onLineStatus"></span> <span class="offline" v-if="!item.onLineStatus"></span>{{item.nbName}}</div>
        <div class="info">{{item.nbCode}}</div>
        <Icon type="ios-close-circle" class="delete" size="18" color="#555" @click="removeNb(item.nbCode)"/>
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
    changeActive (index, item) {
      this.isActive = index
      this.setActiveNb(item)
      if (this.$route.name === 'chartChild') {
        this.$router.push({ path: `/chart`,query: {nbCode: this.activeNb.nbCode} })
      } else if (this.$route.name === 'configChild') {
        this.$router.push({ path: `/config`,query: {nbCode: this.activeNb.nbCode} })
      } else if (this.$route.name === 'managementChild') {
        this.$router.push({ path: `/management`,query: {nbCode: this.activeNb.nbCode} })
      }
    },
    getAllNbList () {
      this.getAsideList()
    },

    async addNb (nbCode, nbName) {
      this.modal_loading = true
      let res = await addNb({ nbCode: nbCode, nbName: nbName })
      this.modal_loading = false
      if (res.data.code === 'success') {
        this.addNbModel = false
        this.$Message.success('添加成功')
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
          console.log(res)
          if (res.data.code === 'success') {
            this.$Modal.remove()
            this.$Message.info('删除成功')
            this.getAllNbList()
          } else {
            this.$Modal.remove()
            this.$Message.error('删除失败')
          }
        }
      })
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
    clear () {
      this.getAllNbList()
    }
  },
  mounted () {
    this.getAllNbList()
  }
}
</script>
<style lang="less" scoped>
  @import "aside";
</style>
