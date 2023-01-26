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
        <el-table-column prop="score" label="分数" width="60"/>
      </el-table>
      <div id="e_main" class="echarts_part">
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import request from "@/utils/request";

export default {
  name: "ExamResultsView",
  mounted() {
    // TODO 获取考试列表
    this.exams = [
      {
        examId: 1,
        examName: "2022第一学期期末考试",
      },
      {
        examId: 2,
        examName: "2022第二学期期末考试",
      },
      {
        examId: 3,
        examName: "2021第一学期期末考试",
      },
      {
        examId: 4,
        examName: "2021第二学期期末考试",
      },
      {
        examId: 5,
        examName: "2020第一学期期末考试",
      },
      {
        examId: 6,
        examName: "2020第二学期期末考试",
      },
      {
        examId: 7,
        examName: "2019第一学期期末考试",
      },
      {
        examId: 8,
        examName: "2019第二学期期末考试",
      },
      {
        examId: 9,
        examName: "2018第一学期期末考试",
      },
      {
        examId: 10,
        examName: "2018第二学期期末考试",
      },
    ]
    request
        .get(`/exam/get_exam_list_by_student_id`)
        .then(resp => {
          console.log(resp)
        })

    // 根据第一个考试id查询考试数据
    this.result = [
      {
        subjectName: "Java",
        score: 90,
      },
      {
        subjectName: "Golang",
        score: 92,
      },

      {
        subjectName: "C",
        score: 98,
      },
      {
        subjectName: "C++",
        score: 93,
      },
      {
        subjectName: "Java",
        score: 90,
      },
      {
        subjectName: "Java",
        score: 90,
      },
      {
        subjectName: "Java",
        score: 90,
      },
      {
        subjectName: "Java",
        score: 90,
      },
      {
        subjectName: "Java",
        score: 90,
      },
      {
        subjectName: "Java",
        score: 90,
      },
      {
        subjectName: "Java",
        score: 90,
      },
      {
        subjectName: "Java",
        score: 90,
      },
    ]
    this.queryResults(this.exams[0].examId)

    // TODO 获取平均分
    this.getAvgScore(this.exams[0].examId)

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
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [this.totalScore, this.avgScore]
        }
      ]
    };
    myChart.setOption(option);
  },
  data() {
    return {
      activeExam: 1,
      exams: [],
      result: [],
      totalScore: 0,
      avgScore: 1023,
    }
  },
  methods: {
    selectExam(key, keyPath) {
      this.activeExam = key
    },
    queryResults(examId) {
      // TODO 根据id查询分数
      request
          .get(`/result/get_result_by_exam_id/${examId}`)
          .then(resp => {
            console.log(resp)
          })

      // 获取总分
      this.totalScore = 0
      for (let i = 0; i < this.result.length; i++) {
        let r = this.result[i]
        this.totalScore += r.score
      }
    },
    getAvgScore(examId) {
      this.avgScore = 1023
      request
          .get(`/result/get_avg_score_by_exam_id/${examId}`)
          .then(resp => {
            console.log(resp)
          })
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
  height: 450px;
}

.main_part .left_part {
  float: left;
  width: 220px;
  height: 370px;
  margin: 20px;
  padding: 20px;
  border: solid 1px darkgray;
  border-radius: 10px;
}

.main_part .right_part {
  float: right;
  width: 530px;
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
  width: 340px;
  height: 300px;
}


</style>
