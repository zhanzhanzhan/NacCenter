<template>
  <div class="aside-wrap">
    <Input suffix="ios-search" placeholder="Enter text" />
    <div class="aside-list">
      <div class="aside-item" :class=" isActive === index  ? 'active' : ''" v-for="(item,index) in asideList"
           @click="changeActive(index,item)"
            :key="item.id">
        <div class="title"> <span></span>{{item.nbName}}</div>
        <div class="info">{{item.nbCode}}</div>
      </div>
    </div>
    <div class="add-list" @click="addNbModel = true">
      添加机器
    </div>
    <Modal v-model="addNbModel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>添加机器</span>
      </p>
      <div style="text-align:center">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left">
          <FormItem label="NbCode" prop="nbCode">
            <Input v-model="formValidate.nbCode" placeholder="请输入NbCode"></Input>
          </FormItem>
          <FormItem label="NbName" prop="nbName">
            <Input v-model="formValidate.nbName" placeholder="请输入NbName"></Input>
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
import { getAllNbList, addNb } from '../../../../api/config'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'MyAside',
  data () {
    return {
      isActive: 0,
      asideList: [],
      addNbModel: false,
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
      }
    }
  },
  computed: {
    ...mapState({
      activeNb: state => state.app.activeNb
    })
  },
  methods: {
    ...mapMutations({
      'setActiveNb': 'setActiveNb'
    }),
    changeActive (index, item) {
      this.isActive = index
      this.setActiveNb(item)
    },
    async getAllNbList () {
      let res = await getAllNbList()
      if (res.data.code === 'success') {
        this.asideList = res.data.result
        this.setActiveNb(this.asideList[0])
      }
    },
    async addNb (nbCode, nbName) {
      this.modal_loading = true
      let res = await addNb({ nbCode: nbCode, nbName: nbName })
      this.modal_loading = false
      if (res.data.code === 200) {
        this.addNbModel = false
        this.$Message.success('添加成功')
      }
      console.log(res)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addNb(this.formValidate.nbCode, this.formValidate.nbName)
        } else {
          this.$Message.error('Fail!')
        }
      })
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
