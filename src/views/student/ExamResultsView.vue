<template>
  <div class="main_part">
    <el-scrollbar class="left_part" height="380">
      <el-menu
          :default-active="activeExam"
          v-for="exam in exams"
          v-bind="exam"
          style="border-right: none"
          @select="selectExam"
      >
        <el-menu-item :index="exam.examId">
          <span v-text="exam.examName"/>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <div class="right_part">
      <el-table height="370" :data="result" style="width: 180px;display: inline-block">
        <el-table-column type="index" label="#" width="60"/>
        <el-table-column prop="subjectName" label="科目" width="60"/>
        <el-table-column label="分数" width="60">
          <template #default="scope">
            <span>{{ scope.row.score === -1 ? 0 : scope.row.score }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div id="e_main" class="echarts_part">
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import studentRequest from "@/utils/studentRequest";
import {ElMessage} from "element-plus";
import {getAvgScoreByExamId, getExamListByStudentId, getResultByExamId} from "@/api/student";

export default {
  name: "ExamResultsView",
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

    // TODO 获取考试列表
    getExamListByStudentId()
        .then(resp => {
          if (resp.code === 200) {
            this.exams = resp.data
            // 如果exams不为空
            if (this.exams.length !== 0) {
              // TODO 根据第一个考试id查询考试数据
              this.queryResults(this.exams[0].examId)
            }
          } else {
            ElMessage({
              message: "获取考试列表失败",
              showClose: true,
              grouping: true,
              type: "error"
            })
          }
        })
  },
  data() {
    return {
      activeExam: 1,
      exams: [],
      result: [],
      totalScore: 0,
      avgScore: 0,
    }
  },
  methods: {
    // 选择考试
    selectExam(key, keyPath) {
      this.activeExam = key
      this.queryResults(key)
    },
    // 获取考试分数，获取成功后计算总分，再获取平均分
    queryResults(examId) {
      // TODO 根据id查询分数
      getResultByExamId(examId)
          .then(resp => {
            if (resp.code === 200) {
              this.result = resp.data
              // 获取总分
              this.totalScore = 0
              for (let i = 0; i < this.result.length; i++) {
                let r = this.result[i]
                this.totalScore += r.score
              }

              // 成功获取总分，再获取平均分
              this.getAvgScore(examId)

            } else {
              ElMessage({
                message: "获取成绩失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 获取平均分，获取成功后绘制echarts表
    getAvgScore(examId) {
      getAvgScoreByExamId(examId)
          .then(resp => {
            if (resp.code === 200) {
              this.avgScore = resp.data.avgScore

              // 成功获取平均分 绘制echarts图
              this.drawECharts()

            } else {
              ElMessage({
                message: "获取平均分失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 绘制echarts表
    drawECharts() {
      let myChart = echarts.init(document.getElementById('e_main'));
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['我的分数', '平均分'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '60%',
            data: [this.totalScore, this.avgScore]
          }
        ]
      };
      myChart.setOption(option);
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
  height: 450px;
}

.main_part .left_part {
  float: left;
  width: 190px;
  height: 370px;
  margin: 20px;
  padding: 20px;
  border: solid 1px darkgray;
  border-radius: 10px;
}

.main_part .right_part {
  float: right;
  width: 480px;
  height: 370px;
  margin: 20px;
  padding: 20px;
  border: solid 1px darkgray;
  border-radius: 10px;
}

.main_part .right_part .echarts_part {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 300px;
}


</style>
