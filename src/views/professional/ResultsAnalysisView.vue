<template>
  <div class="main_part">
    <div class="left_part">
      <el-scrollbar class="class_menu" height="380">
        <el-menu
            :default-active="classActive"
            v-for="c in classList"
            v-bind="c"
            style="border-right: none"
            @select="handleClassSelect"
        >
          <el-menu-item :index="c.id">
          <span
              v-text="c.name"
              style="font-size: 17px"
          />
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
      <el-scrollbar class="exam_menu" height="380">
        <el-menu
            :default-active="examActive"
            v-for="exam in examList"
            v-bind="exam"
            style="border-right: none"
            @select="handleExamSelect"
        >
          <el-menu-item :index="exam.id">
          <span
              v-text="exam.name"
              style="font-size: 17px"
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

export default {
  name: "ResultsAnalysisView",
  data() {
    return {
      classActive: '',
      examActive: '',
      classList: [
        {
          id: 1,
          name: "B200101",
          type: 0,
          major: "软件工程",
        },
        {
          id: 2,
          name: "B200102",
          type: 1,
          major: "人工智能",
        },
        {
          id: 3,
          name: "B200103",
          type: 1,
          major: "软件工程",
        },
        {
          id: 4,
          name: "B200104",
          type: 0,
          major: "软件工程",
        },
        {
          id: 5,
          name: "B200105",
          type: 0,
          major: "软件工程",
        },
        {
          id: 6,
          name: "B200106",
          type: 0,
          major: "软件工程",
        },
        {
          id: 7,
          name: "B200107",
          type: 0,
          major: "软件工程",
        },
        {
          id: 8,
          name: "B200108",
          type: 0,
          major: "软件工程",
        },
        {
          id: 9,
          name: "B200109",
          type: 1,
          major: "软件工程",
        },
        {
          id: 10,
          name: "B200110",
          type: 1,
          major: "软件工程",
        },
      ],
      examList: [],
      subjectList: [],
      classId: '1',
      examId: '1',
    }
  },
  methods: {
    handleClassSelect(key, keyPath) {
      this.classActive = key
      this.classId = key
      // 获取该班级的成绩
      this.examList = [
        {
          id: 1,
          name: "2001年上半年期末",
        },
        {
          id: 2,
          name: "2001年下半年期末",
        },
        {
          id: 3,
          name: "2002年上半年期末",
        },
        {
          id: 4,
          name: "2002年下半年期末",
        },
        {
          id: 5,
          name: "2003年上半年期末",
        },
        {
          id: 6,
          name: "2003年下半年期末",
        },
        {
          id: 7,
          name: "2004年上半年期末",
        },
        {
          id: 8,
          name: "2004年下半年期末",
        },
        {
          id: 9,
          name: "2005年上半年期末",
        },
        {
          id: 10,
          name: "2005年下半年期末",
        },
      ]
    },
    handleExamSelect(key, keyPath) {
      this.examActive = key
      this.examId = key
      this.subjectList = [
        {
          name: "Java",
          excellent: 20,
          general: 10,
          failed: 2,
        },
        {
          name: "C",
          excellent: 14,
          general: 9,
          failed: 9,
        },
        {
          name: "Go",
          excellent: 1,
          general: 29,
          failed: 2,
        },
        {
          name: "PHP",
          excellent: 11,
          general: 12,
          failed: 9,
        },
        {
          name: "Rust",
          excellent: 32,
          general: 0,
          failed: 0,
        },
        {
          name: "C++",
          excellent: 18,
          general: 4,
          failed: 10,
        },
      ]
      this.renderChart()
    },
    renderChart() {
      for (let i = 0; i < this.subjectList.length; i++) {
        let subject = this.subjectList[i]
        let div = document.getElementById("echarts_" + (i + 1));
        div.setAttribute("class", "echarts_part")
        let myChart = echarts.init(div);
        let option = {
          title: {
            text: subject.name,
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
                  value: subject.excellent
                },
                {
                  name: "一般 60-80",
                  value: subject.general
                },
                {
                  name: "不及格 -60",
                  value: subject.failed
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
