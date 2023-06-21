<template>
  <div class="main_part">
    <div class="text">
      <div v-for="i in knowledgeList" v-bind="i">
        <span
            v-text="i.knowledgeTitle.length<fontNum?i.knowledgeTitle:(i.knowledgeTitle.substring(0,fontNum)+'...')"
            @click="jumpUrl(i.knowledgeId)"
        />
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
import {queryKnowledgeList} from "@/api/student";

export default {
  name: "KnowledgeWorldView",
  mounted() {
    // 判断用户身份
    const identity = sessionStorage.getItem("identity")
    switch (identity) {
      case null:
        alert("无账号信息，请重新登录")
        this.$router.push("/")
        return
      case '1':
      case '-1':
        this.$router.push("/teacher")
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

    window.addEventListener('resize', () => {
      this.fontNum = window.innerWidth / 40 + 10;
    });
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 10,
      knowledgeList: [],
      fontNum: window.innerWidth / 40 + 10,
    }
  },
  methods: {
    getKnowledge() {
      // TODO 分页查询知识 this.page.current
      queryKnowledgeList(this.currentPage, this.pageSize)
          .then(resp => {
            if (resp.code === 200) {
              console.log(resp)
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
    handleCurrentChange(page) {
      console.log(page)
      this.currentPage = page
      this.getKnowledge()
      this.$router.push("/student/knowledge_world/" + page)
    },
    jumpUrl(id) {
      window.open("/knowledge/" + id)
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
  width: auto;
  min-width: 600px;
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
