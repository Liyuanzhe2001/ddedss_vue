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
          <el-table-column prop="teacherName" label="教师" width="150"/>
          <el-table-column prop="subjectName" label="科目" width="150"/>
          <el-table-column prop="good" label="好评" width="150"/>
          <el-table-column prop="bad" label="差评" width="150"/>
        </el-table>
      </div>
      <el-pagination
          layout="prev, pager, next"
          :current-page="page.current"
          :page-size="page.size"
          :total="page.total"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseEvaluationView",
  data() {
    return {
      evaluationList: [
        {
          teacherName: "教师一",
          subjectName: "Java",
          good: 999,
          bad: 0,
        },
        {
          teacherName: "教师二",
          subjectName: "Python",
          good: 989,
          bad: 10,
        },
        {
          teacherName: "教师三",
          subjectName: "C++",
          good: 900,
          bad: 99,
        },
        {
          teacherName: "教师四",
          subjectName: "Golang",
          good: 899,
          bad: 100,
        },
        {
          teacherName: "教师五",
          subjectName: "Linux",
          good: 799,
          bad: 200,
        },
        {
          teacherName: "教师五",
          subjectName: "Linux",
          good: 799,
          bad: 200,
        },
        {
          teacherName: "教师五",
          subjectName: "Linux",
          good: 799,
          bad: 200,
        },
        {
          teacherName: "教师五",
          subjectName: "Linux",
          good: 799,
          bad: 200,
        },
      ],
      inputSearch: "",
      page: {
        size: 5,
        current: 1,
        total: 10,
      },
    }
  },
  methods: {
    search() {
      // 搜索
      console.log(this.inputSearch)
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
  height: 450px;
  margin: 20px auto 0;
  text-align: left;
}

</style>
