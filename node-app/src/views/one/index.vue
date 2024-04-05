<template>
  <el-form @submit.native.prevent="savaArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.name"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <!-- <el-button type="primary" @click="onSubmit">立即创建</el-button> -->
      <el-button type="primary" native-type="submit">立即创建</el-button>

      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>





<script>

// 引入去除空格工具 暂时不用
// import { validUsername } from '@/utils/validate'

import { articles } from '../../api/user'


export default {
  data() {
    return {
      article: {}
    }
  },
  methods: {
    // 提交文章
    savaArticle() {
      console.log(this.article);
      alert("表单函数执行")
      this.loading = true
      

      articles(this.article).then((res) => {
        console.log(res, "resss");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.loading = false
          this.$router.push('/home/two'); 



          // 设置状态码
        } else if (res.data.code == 1100) {
          this.$message.error(res.data.msg);
          this.loading = false
        }

        // this.$router.push({ path: this.redirect || '/' })
      })
        .catch((err) => { // eslint-disable-line no-unused-vars
          // this.$message.error(err.response.data.msg);
          this.$message.error("报错了");
          console.log('error submit!! 报错');
          this.loading = false
          return false
        })


    }
  }
}
</script>
