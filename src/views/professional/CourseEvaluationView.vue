<template>
  <div class="main_part">
    <div style="width: 660px;margin: 0 auto;">
      <div style="height: 37px;margin-top: 40px;">
        <el-input style="width: 200px" v-model="inputSearch"/>
        <el-button icon="Search" style="margin-left: 4px;width: 30px" @click="search()"/>
      </div>
      <div style="height: 300px">
        <el-table :data="evaluationList" border>
          <el-table-column type="index" label="#" width="60"/>
          <el-table-column prop="teacherName" label="教师" width="120"/>
          <el-table-column prop="subjectName" label="科目" width="120"/>
          <el-table-column prop="goodNum" label="好评" width="120"/>
          <el-table-column prop="badNum" label="差评" width="120"/>
          <el-table-column prop="goodAvg" label="好评比(%)" width="120">
          </el-table-column>
        </el-table>
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
import professionalRequest from "@/utils/professionalRequest";
import {ElMessage} from "element-plus";
import {getEvaluationByTeacherName} from "@/api/professional";

export default {
  name: "CourseEvaluationView",
  mounted() {
    // 判断用户身份
    const identity = sessionStorage.getItem("identity")
    switch (identity) {
      case null:
        alert("无账号信息，请重新登录")
        this.$router.push("/")
        return
      case '0':
        this.$router.push('/student')
        return
      case '1':
      case '-1':
        this.$router.push("/teacher")
        return
      case '3':
        this.$route.push("/admin")
        return
    }

    this.currentPage = this.$route.params.currentPage

    this.search()

  },
  data() {
    return {
      evaluationList: [],
      inputSearch: "",
      currentPage: 1,
      pageSize: 8,
      total: 0,
    }
  },
  methods: {
    // 搜索
    search() {
      getEvaluationByTeacherName(this.inputSearch, this.currentPage, this.pageSize)
          .then(resp => {
            if (resp.code === 200) {
              this.evaluationList = resp.data
              // 计算好评比
              this.evaluationList.forEach(evaluation => {
                const good = evaluation.goodNum
                const bad = evaluation.badNum
                evaluation.goodAvg = 0
                if (good !== "" && good !== undefined && good !== null && bad !== "" && bad !== undefined && bad !== null) {
                  const sum = good + bad
                  if (sum !== 0) {
                    evaluation.goodAvg = (100 * (good / sum)).toFixed(2)
                  }
                }
              })
              this.total = resp.total
            } else {
              ElMessage({
                message: "获取评价列表失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 翻页
    handleCurrentChange(page) {
      this.$router.push("/professional/course_evaluation/" + page)
      this.currentPage = page
      this.search()
    },
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
  height: 450px;
  margin: 20px auto 0;
  text-align: left;
}

</style>
