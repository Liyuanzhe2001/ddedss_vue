<template>
  <div class="main_part">
    <div class="left_part">
      <el-scrollbar class="class_menu" height="380">
        <el-menu
            :default-active="classId"
            v-for="c in classList"
            v-bind="c"
            style="border-right: none"
            @select="handleClassSelect"
        >
          <el-menu-item :index="c.classId">
          <span
              v-text="c.className"
              style="font-size: 17px"
          />
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
      <el-scrollbar class="exam_menu" height="380">
        <el-menu
            :default-active="examId"
            v-for="exam in examList"
            v-bind="exam"
            style="border-right: none"
            @select="handleExamSelect"
        >
          <el-menu-item :index="exam.examId">
          <span
              v-text="exam.examName"
              style="font-size: 15px"
          />
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
    <el-scrollbar class="right_part" height="380">
      <div v-if="classId===''" class="select_tip">
        请选择班级
      </div>
      <div v-else-if="examId===''" class="select_tip">
        请选择考试
      </div>
      <div v-else>
        <div v-for="i in 100">
          <div :id="'echarts_'+i">
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import * as echarts from "echarts";
import professionalRequest from "@/utils/professionalRequest";
import {ElMessage} from "element-plus";
import {getAllClass, getAllExamByClassId, getExaminationResults} from "@/api/Professional";

export default {
  name: "ResultsAnalysisView",
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

    // 获取所有班级
    getAllClass()
        .then(resp => {
          if (resp.code === 200) {
            this.classList = resp.data
          } else {
            ElMessage({
              message: "获取班级列表失败",
              showClose: true,
              grouping: true,
              type: "error"
            })
          }
        })

  },
  data() {
    return {
      classActive: '',
      examActive: '',
      classList: [],
      examList: [],
      subjectList: [],
      classId: '',
      examId: '',
    }
  },
  methods: {
    // 选择班级
    handleClassSelect(key, keyPath) {
      this.classId = key
      this.examId = ''
      this.subjectList = []
      // 获取该班级的考试列表
      getAllExamByClassId(key)
          .then(resp => {
            // examId: 1, year: 2018, month: 6
            if (resp.code === 200) {
              this.examList = []
              const examInfo = resp.data
              examInfo.forEach(exam => {
                let i;
                if (exam.month >= 3 && exam.month <= 8) {
                  i = "下"
                } else {
                  i = "上"
                }
                const examName = exam.year + "年" + i + "学期期末考试"
                this.examList.push({
                  "examId": exam.examId,
                  "examName": examName
                })
              })
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
    // 选择考试
    handleExamSelect(key, keyPath) {
      this.examId = key
      getExaminationResults(this.classId,key)
          .then(resp => {
            if (resp.code === 200) {
              if (resp.data.length === 0) {
                alert("该场考试暂未出成绩")
                return
              }
              this.subjectList = resp.data
              this.renderChart()
            } else {
              ElMessage({
                message: "获取成绩情况失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
            console.log(resp)
          })
    },
    renderChart() {
      for (let i = 0; i < this.subjectList.length; i++) {
        let subject = this.subjectList[i]
        let div = document.getElementById("echarts_" + (i + 1));
        div.setAttribute("class", "echarts_part")
        let myChart = echarts.init(div);
        let option = {
          title: {
            text: subject.subjectName,
            left: 'center'
          },
          tooltip: {
            type: 'item',
            confine: true
          },
          color: ['#32CD32', '#FFA500', '#DC143C'],
          series: [
            {
              label: {
                show: false,
              },
              type: 'pie',
              radius: '50%',
              data: [
                {
                  name: "优秀 80-100",
                  value: subject.good
                },
                {
                  name: "一般 60-80",
                  value: subject.mid
                },
                {
                  name: "不及格 -60",
                  value: subject.bad
                }
              ]
            }
          ]
        };
        myChart.setOption(option)
      }
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
  width: 300px;
  height: 370px;
  margin: 20px;
  padding: 20px;
  border: solid 1px darkgray;
  border-radius: 10px;
}

.main_part .left_part .class_menu {
  display: inline-block;
  width: 120px;
  height: 370px;
}

.main_part .left_part .exam_menu {
  display: inline-block;
  width: 180px;
  height: 370px;
}

.main_part .right_part {
  float: right;
  width: 470px;
  height: 370px;
  margin: 20px;
  padding: 20px;
  border: solid 1px darkgray;
  border-radius: 10px;
}

.main_part .right_part .label_part span {
  font-size: 40px;
  padding: 0 20px;
  border-bottom: solid 1px darkgray;
}

.main_part .right_part .text_part p {
  font-size: 25px;
  line-height: 40px;
}

.main_part .right_part .select_tip {
  width: 470px;
  height: 370px;
  line-height: 370px;
  text-align: center;
  font-size: 60px;
}

.echarts_part {
  width: 214px;
  height: 200px;
  margin: 0 10px 20px 10px;
  float: left;
}

</style>
