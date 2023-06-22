<template>
  <div class="main_part">
    <div class="top_part">
      <el-select class="select_part" v-model="subjectIndex[0]" size="default">
        <el-option
            v-for="(item,index) in subjectList"
            :key="index"
            :label="item.subjectName"
            :value="index"
        />
      </el-select>
      <el-select class="select_part" v-model="subjectIndex[1]" size="default">
        <el-option
            v-for="(item,index) in subjectList"
            :key="index"
            :label="item.subjectName"
            :value="index"
        />
      </el-select>
      <el-select class="select_part" v-model="subjectIndex[2]" size="default">
        <el-option
            v-for="(item,index) in subjectList"
            :key="index"
            :label="item.subjectName"
            :value="index"
        />
      </el-select>
      <el-select class="select_part" v-model="subjectIndex[3]" size="default">
        <el-option
            v-for="(item,index) in subjectList"
            :key="index"
            :label="item.subjectName"
            :value="index"
        />
      </el-select>
      <el-select class="select_part" v-model="subjectIndex[4]" size="default">
        <el-option
            v-for="(item,index) in subjectList"
            :key="index"
            :label="item.subjectName"
            :value="index"
        />
      </el-select>
      <el-button class="btn_part" type="primary" @click="search()">查询</el-button>
    </div>
    <div id="echarts" class="echarts_part">
    </div>
  </div>
</template>

<script>

import * as echarts from "echarts";
import {ElMessage} from "element-plus";
import {getAllSubject, getFiveYearResult} from "@/api/professional";

export default {
  name: "PerformanceTrendView",
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
    // 获取所有科目
    getAllSubject()
        .then(resp => {
          if (resp.code === 200) {
            this.subjectList = resp.data
            this.search()
          } else {
            ElMessage({
              message: "获取课程失败",
              showClose: true,
              grouping: true,
              type: "error"
            })
          }
        })
  },
  data() {
    return {
      subjectList: [],
      subjectIndex: [0, 1, 2, 3, 4],
      subjectIds: [],
      showEcharts: {
        subjectNameList: [],
        yearList: [],
        resultData: []
      }
    }
  },
  methods: {
    drawEcharts() {
      let div = document.getElementById("echarts");
      let myChart = echarts.init(div);
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.showEcharts.subjectNameList
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {
              name:"成绩趋势"
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.showEcharts.yearList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.showEcharts.subjectNameList[0],
            type: 'line',
            stack: 'Total',
            data: this.showEcharts.resultData[0]
          },
          {
            name: this.showEcharts.subjectNameList[1],
            type: 'line',
            stack: 'Total',
            data: this.showEcharts.resultData[1]
          },
          {
            name: this.showEcharts.subjectNameList[2],
            type: 'line',
            stack: 'Total',
            data: this.showEcharts.resultData[2]
          },
          {
            name: this.showEcharts.subjectNameList[3],
            type: 'line',
            stack: 'Total',
            data: this.showEcharts.resultData[3]
          },
          {
            name: this.showEcharts.subjectNameList[4],
            type: 'line',
            stack: 'Total',
            data: this.showEcharts.resultData[4]
          }
        ]
      };
      myChart.setOption(option)
    },
    search() {
      this.subjectIds = []
      this.showEcharts.subjectNameList = []
      this.subjectIndex.forEach(index => {
        this.subjectIds.push(this.subjectList[index].subjectId)
        this.showEcharts.subjectNameList.push(this.subjectList[index].subjectName)
      })
      const date = new Date();
      const year = date.getFullYear()
      this.showEcharts.yearList = [year - 4, year - 3, year - 2, year - 1, year]

      getFiveYearResult([...this.subjectIds] + "")
          .then(resp => {
            if (resp.code === 200) {
              this.showEcharts.resultData = []
              for (let i = 0; i < resp.data.length; i++) {
                for (let j = 0; j < resp.data[i].resultData.length; j++) {
                  if (resp.data[i].resultData[j] === null) {
                    resp.data[i].resultData[j] = "0"
                  }
                }
                this.showEcharts.resultData.push(resp.data[i].resultData)
              }
              console.log(this.showEcharts.resultData)

              this.drawEcharts()
            } else {
              ElMessage({
                message: "获取每年平均成绩失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
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
  width: 840px;
  height: 450px;
  margin: 20px auto 0;
  text-align: left;
}

.top_part {
  margin: 20px auto;
  width: 800px;
}

.top_part .select_part {
  width: 100px;
  margin-left: 30px;
}

.top_part .btn_part {
  width: 80px;
  margin-left: 30px;
  height: 32px;
}

.echarts_part {
  width: 800px;
  height: 370px;
  margin: 0 auto;
}

</style>
