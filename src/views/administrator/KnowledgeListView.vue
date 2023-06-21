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
import {deleteKnowledge, queryKnowledgeList} from "@/api/administrator";

export default {
  name: "KnowledgeListView",
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
      case '1':
      case '-1':
        this.$router.push("/teacher")
        return
      case '2':
        this.$router.push('/professional')
        return
    }

    this.currentPage = this.$route.params.currentPage
    // TODO 查询所有知识
    this.getAllKnowledge()
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: '',
      knowledgeList: []
    }
  },
  methods: {
    // TODO 分页查询知识
    getAllKnowledge() {
      // TODO 分页查询知识 this.page.current
      queryKnowledgeList(this.currentPage, this.pageSize)
          .then(resp => {
            if (resp.code === 200) {
              this.knowledgeList = resp.data
              this.total = resp.total
            } else {
              ElMessage({
                message: "获取知识列表失败",
                showClose: true,
                grouping: true,
                type: "error",
              })
            }
          })
    },
    // 翻页
    handleCurrentChange(page) {
      this.$router.push("/admin/knowledge_list/" + page)
      this.currentPage = page
      this.getAllKnowledge()
    },
    // 跳转打开知识
    jumpUrl(knowledgeId) {
      window.open("/knowledge/" + knowledgeId)
    },
    // 确定删除知识
    confirmDelete(knowledgeId) {
      deleteKnowledge(knowledgeId)
          .then(resp => {
            if (resp.code === 200) {
              ElMessage({
                message: "删除成功",
                showClose: true,
                grouping: true,
                type: "success",
              })
              this.getAllKnowledge()
            } else {
              ElMessage({
                message: "删除失败",
                showClose: true,
                grouping: true,
                type: "success",
              })
            }
          })
    },
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
  width: 840px;
  margin: 20px auto 0;
  text-align: left;
  height: 450px
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
