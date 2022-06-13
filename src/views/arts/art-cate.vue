<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">

      <span style="float: left">文章分类</span>
      <el-button type="primary" size="small" @click="dialogFormVisible=true">添加分类</el-button>
    </div>
    <div class="">
      <el-table :data="tableList" style="width: 100%">
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="{row}">
            <el-button type="primary" size="mini" @click="revise(row.id)">修改</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加分类的弹窗 -->
    <el-dialog title="添加文章分类" :visible.sync="dialogFormVisible" width="35%">
      <el-form :model="addForm" label-width="70px" :rules="addRules" ref="addRef">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改的弹窗 -->
    <el-dialog title="修改文章分类" :visible.sync="edditVisible" width="35%">
      <el-form :model="eddit" label-width="70px" :rules="addRules" ref="addRef">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="eddit.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="eddit.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="提示" :visible.sync="show" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="deletSure()">确 定</el-button>
      </span>
    </el-dialog>

  </el-card>

</template>

<script>
import { artList, addartCate, getMyArtlist, subMyArtlist, deleteArt } from '@/api/art.js'
export default {
  data () {
    return {
      // 添加分类弹窗
      dialogFormVisible: false,
      // 修改的弹窗
      edditVisible: false,
      // 删除的弹窗
      show: false,
      tableList: [],
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 修改数据
      eddit: {

      },
      columnId: '',
      // 添加表单验证规则
      addRules: {
        cate_name: [
          { required: true, message: '请输入名称分类', teigger: blur }

        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', teigger: blur }
        ]
      }

    }
  },
  methods: {
    async getArtlist () {
      try {
        const res = await artList()
        if (res.code === 0) {
          this.tableList = res.data
        }
        console.log(res)
      } catch (error) {

      }
    },
    // 提交添加文章分类的弹窗
    submit () {
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return
        const res = await addartCate(this.addForm)
        if (res.code !== 0) return this.$message.error('添加分类失败')
        this.$message.success('添加文章分类成功')
        this.dialogFormVisible = false
        this.getArtlist()
      })
    },
    // 修改文章分类数据回显
    async revise (id) {
      const res = await getMyArtlist(id)
      console.log(res)
      if (res.code === 0) {
        this.eddit = res.data
        console.log(this.eddit)
        this.edditVisible = true
      }
    },
    // 修改文章分类数据提交
    async submitEdit () {
      try {
        const res = await subMyArtlist(this.eddit)
        console.log(res)
        this.getArtlist()
        this.edditVisible = false
      } catch (error) {

      }
    },
    handleDelete (id) {
      this.columnId = id
      this.show = true
    },
    deletSure () {
      deleteArt(this.columnId).then(res => {
        this.show = false
        this.getArtlist()
      })
    }
  },
  created () {
    this.getArtlist()
  }

}
</script>

<style lang="less" scoped>
.clearfix {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
