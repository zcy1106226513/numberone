<template>
  <div>
    <el-card class="box-card">
      <!-- 文章列表 -->
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 文章列表筛选框 -->
      <el-row>
        <el-form :inline="true" :model="form" class="demo-form-inline" ref="rulesRef">
          <el-col :span="22">

            <el-form-item label="文章分类" prop="cate_name">
              <el-select v-model="form.cate_name" placeholder="请选择分类">
                <el-option :label="v.cate_name" :value="v.id" v-for="v in tableList" :key="v.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发布分类" prop="state">
              <el-select v-model="form.state" placeholder="请选择状态">
                <el-option label="已发布" value="已发布"></el-option>
                <el-option label="草稿" value="草稿"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">筛选</el-button>
              <el-button @click="resit">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="$router.push('/art-publish')">发表文章</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <!--文章列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="文章标题" width="180">
        </el-table-column>
        <el-table-column prop="cate_name" label="文章分类" width="180">
        </el-table-column>
        <el-table-column prop="pub_date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="180">
        </el-table-column>
        <el-table-column prop="name" label="状态" width="180">
          <template slot-scope="scope">

            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1, 3, 5, 10]" :page-size="10" layout="total, prev, pager, next,sizes" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArtCateList, artList, delArtCateList } from '@/api/art.js'
export default {
  name: 'Art-list',
  data () {
    return {
      // 总条数
      total: 0,
      // 列表数据
      tableData: [{
        title: '',
        cate_name: '',
        pub_date: '',
        state: ''

      }],
      currentPage4: 1,
      // 接口请求的参数
      objList: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      // 列表数据
      tableList: [],
      // 表单双向绑定
      form: {
        message: 'qq',
        selected: 'A',
        cate_name: '',
        state: '已发布'

      }

    }
  },
  methods: {
    // 删除列表
    async del (id) {
      // 确认删除弹窗
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      const res = await delArtCateList(id)
      console.log(res)
    },
    // 重置功能
    resit () {
      this.$refs.rulesRef.resetFields()
    },
    // 筛选功能
    onSubmit () {
      this.objList.pagenum = 1
      // 数据双向绑定的值赋值
      this.objList.cate_id = this.form.cate_name
      this.objList.state = this.form.state
      this.getArtCateLists()
    },
    // 每页条数发生变化
    handleSizeChange (newSiae) {
      this.objList.pagesize = newSiae
      this.objList.pagenum = 1
      this.getArtCateLists()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (newPage) {
      this.objList.pagenum = newPage

      this.getArtCateLists()
      // console.log(`当前页: ${val}`)
    },
    async getArtCateLists () {
      const res = await getArtCateList(this.objList)
      this.tableData = res.data
      this.total = res.total
    },
    async getList () {
      try {
        const res = await artList()
        if (res.code === 0) {
          this.tableList = res.data
        }
      } catch (error) {
      }
    }
  },
  created () {
    this.getList()
    this.getArtCateLists()
  }

}
</script>

<style>
</style>
