<template>
  <div class="main_part">
    <div class="text">
      <div v-for="i in knowledgeList" v-bind="i">
        <span
            v-text="i.knowledgeTitle.length<50?i.knowledgeTitle:(i.knowledgeTitle.substring(0,50)+'...')"
            @click="jumpUrl(i.knowledgeId)"
        />
        <el-popconfirm
            @confirm="confirmDelete(i.knowledgeId)"
            @cancel="cancelDelete()"
            title="确认删除?"
        >
          <template #reference>
            <el-icon class="icon_part">
              <Delete/>
            </el-icon>
          </template>
        </el-popconfirm>
        <el-divider/>
      </div>
      <el-pagination
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange"
      />
    </div>


  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import request from "@/utils/request";
import teacherRequest from "@/utils/teacherRequest";

export default {
  name: "MyPublishView",
  mounted() {
    // 判断用户身份
    const identity = sessionStorage.getItem("identity")
    switch (identity) {
      case null:
        alert("无账号信息，请重新登录")
        this.$router.push("/")
        return
      case '0':
        this.$router.push("/student")
        return
      case '2':
        this.$router.push('/professional')
        return
      case '3':
        this.$route.push("/admin")
        return
    }

    // TODO 分页 查询知识
    this.currentPage = this.$route.params.currentPage
    this.getKnowledge()
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 10,
      knowledgeList: []
    }
  },
  methods: {
    // 获取知识列表
    getKnowledge() {
      // TODO 分页查询知识 this.page.current
      teacherRequest
          .get("/knowledge/queryKnowledgeListByTeacherId", {
            params: {
              currentPage: this.currentPage,
              pageSize: this.pageSize,
            }
          })
          .then(resp => {
            if (resp.code === 200) {
              this.knowledgeList = resp.data
              this.total = resp.total
            } else {
              ElMessage({
                message: "获取知识列表失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 翻页
    handleCurrentChange(page) {
      this.$router.push("/teacher/my_publish/" + page)
      this.currentPage = page
      this.getKnowledge()
    },
    // 打开知识，跳转页面
    jumpUrl(knowledgeId) {
      window.open("/knowledge/" + knowledgeId)
    },
    // 确定删除知识
    confirmDelete(knowledgeId) {
      teacherRequest
          .delete(`/knowledge/deleteKnowledge/${knowledgeId}`)
          .then(resp=>{
            if(resp.code === 200) {
              this.getKnowledge()
              ElMessage({
                message: "知识删除成功",
                showClose: true,
                grouping:true,
                type: "success",
              })
            }else{
              ElMessage({
                message: resp.msg,
                showClose: true,
                grouping: true,
                type: "success",
              })
            }
          })
    },
    // 取消删除知识
    cancelDelete() {
    }
  }
}
</script>

<style scoped>
.main_part {
  display: inline-block;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  width: 940px;
  margin: 20px auto 0;
  text-align: left;
  height: 450px
}

.main_part .text {
  margin: 30px;
}

.main_part .text span {
  line-height: 10px;
  cursor: pointer;
}

.main_part .text .icon_part {
  float: right;
  cursor: pointer;
}

</style>
