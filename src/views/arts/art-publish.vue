<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>发表文章</span>
      <el-button style="float: right; padding: 3px 0" type="text">返回</el-button>
    </div>
    <!-- 表单体 -->
    <el-form :model="ruleForm" :rules="rules" ref="refForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <el-select v-model="ruleForm.cate_id" placeholder="请选择活动区域" style="width:100%">

          <el-option :label="v.cate_name" :value="v.id" v-for="v in tableList" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容">
        <!-- 富文本编辑器使用 v-model 进行双向的数据绑定 -->
        <quill-editor v-model="ruleForm.content"></quill-editor>
      </el-form-item>
      <!-- 上传图片 -->
      <el-form-item>
        <img :src="coverURL" alt="" class="cover-img" ref="imgRef" v-if="coverURL" />
        <img src="../../assets/images/cover.jpg" alt="" class="cover-img" ref="imgRef" v-else />
        <br />
        <!-- 文件选择框，默认被隐藏 -->
        <input type="file" style="display: none" accept="image/*" ref="iptFileRef" @change="onIptChange" />
        <!-- 选择封面的按钮 -->
        <el-button type="text" @click="chooseImg">+ 选择封面</el-button>
      </el-form-item>
      <!-- 提交表单 -->
      <el-form-item>
        <el-button type="primary" @click="publish('已发布')">发布</el-button>
        <el-button>存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { artList, ArtCateListAdd } from '@/api/art.js'
export default {
  name: 'Art-publish',
  data () {
    return {
      // 封面的存放路径
      coverURL: '',
      // 列表数据
      tableList: [],

      // 富文本编辑器
      pubForm: {
        title: ''

        // 文章的内容

      },
      // 表单绑定数据
      ruleForm: {
        title: '',
        state: '',
        content: '',
        cate_id: '最新',
        // 上传图片
        cover_img: ''

      },
      rules: {
        title: [
          { required: true, message: '文章标题是必填项', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        cate_name: [
          { required: true, message: '请选择活动区域', trigger: 'change' }

        ]

      }
    }
  },
  methods: {
    // 获取列表数据分类
    async getList () {
      try {
        const res = await artList()
        if (res.code === 0) {
          this.tableList = res.data
        }
      } catch (error) {
      }
    },
    chooseImg () {
      this.$refs.iptFileRef.click()
    },
    // 监听文件选择器的 change 事件
    onIptChange (e) {
      // 获取文件的伪数组
      const files = e.target.files
      if (files.length === 0) {
        // 没有选择封面
      } else {
        // 选中了封面
        // const 文件的访问路径 = URL.createObjectURL(文件)
        this.coverURL = URL.createObjectURL(files[0])
        // 把选择的图片文件，赋值给 cover_img
        this.ruleForm.cover_img = files[0]
        console.log(this.ruleForm.cover_img)
      }
    },
    // 提交表单按钮
    publish (state) {
      this.ruleForm.state = state
      // 对表单进行验证
      this.$refs.refForm.validate(async valid => {
        if (!valid) return this.$message.error('请完善文章信息')
        if (!this.ruleForm.content) return this.$message.error('this.$message1')
        // if (!this.ruleForm.cover_img) return this.$message.error('this.$message2')

        const fd = new FormData()
        for (const key in this.ruleForm) {
          fd.append(key, this.ruleForm[key])
        }
        console.log(this.ruleForm)
        console.log(fd)
        const res = await ArtCateListAdd(fd)
        // 发表失败
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/art-list')
        this.getList()

        // console.log(ret)
      })
    }

  },
  created () {
    this.getList()
  }

}
</script>

<style lang="less" scoped>
.box-card {
  margin: 10px;
}
.text {
  font-size: 10px;
}
// /deep/.el-input__inner {
//   width: 900px;
// }
/deep/ .ql-editor {
  min-height: 300px;
}
.avatar-uploader .el-upload {
  border: 1px border black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: black;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-icon-plus {
  border: 1px solid red;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
</style>
