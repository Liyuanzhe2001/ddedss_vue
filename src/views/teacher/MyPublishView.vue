<template>
  <div class="main_part">
    <div class="text">
      <div v-for="i in knowledgeList" v-bind="i">
        <span
            v-text="i.knowledgeTitle"
            @click="jumpUrl(i.knowledgeId)"
        />
        <el-popconfirm
            @confirm="confirmDelete(i.knowledgeId)"
            @cancel="cancelDelete()"
            title="确认删除?"
        >
          <template #reference>
            <el-icon style="margin-left: 80px" class="icon_part">
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
import {deleteKnowledge, queryKnowledgeListByTeacherId} from "@/api/teacher";

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
      knowledgeList: [],
    }
  },
  methods: {
    // 获取知识列表
    getKnowledge() {
      // TODO 分页查询知识 this.page.current
      queryKnowledgeListByTeacherId(this.currentPage, this.pageSize)
          .then(resp => {
            console.log(this.currentPage + " " + this.pageSize + " " + resp);
            if (resp.code === 200) {
              this.knowledgeList = resp.data
              this.total = resp.total
            } else {
              ElMessage({
                message: "知识列表获取失败",
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
      deleteKnowledge(knowledgeId)
          .then(resp => {
            if (resp.code === 200) {
              this.getKnowledge()
              ElMessage({
                message: "知识删除成功",
                showClose: true,
                grouping: true,
                type: "success",
              })
            } else {
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
@media screen and (min-width: 1100px) {
  .main_part {
    display: inline-block;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    width: 840px;
    margin: 20px auto 0 220px;
    text-align: left;
    height: 450px;
    transition: margin-left 0.8s;
  }
}

@media screen and (max-width: 1100px) {
  .main_part {
    display: inline-block;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    width: 840px;
    margin: 20px auto 0 64px;
    text-align: left;
    height: 450px;
    transition: margin-left 0.8s;
  }
}

.main_part .text {
  margin: 30px;
}

.main_part .text span {
  cursor: pointer;
  width: 650px;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /*超出部分省略号表示*/
  white-space: nowrap; /*强制单行显示*/
  display: inline-block; /*转换为行内块元素*/
}

.main_part .text .icon_part {
  float: right;
  cursor: pointer;
}

</style>
