<template>
  <div v-if="haveNotice">
    <div class="main_part">
      <el-table :data="classSubject" max-height="390" class="table_part">
        <el-table-column type="index" label="#" width="60"/>
        <el-table-column prop="className" label="班级" width="80"/>
        <el-table-column prop="peopleNum" label="人数" width="60"/>
        <el-table-column prop="subjectName" label="科目" width="80"/>
        <el-table-column prop="haveFinish" label="是否完成打分" width="90">
          <template #default="scope">
            <el-tag
                :type="scope.row.haveFinish === 1? 'success' : 'error'"
                disable-transitions
            >{{ scope.row.haveFinish === 1 ? '已完成' : '未完成' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template #default="scope">
            <el-link
                style="font-size: 13px"
                :underline="false"
                :href="'/teacher/announce_results/'+scope.row.classId+'/'+scope.row.subjectId"
            >
              编辑
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <div id="e_main" class="echarts_part"/>
    </div>
  </div>
  <div v-else class="no_notice">
    暂无成绩发布
  </div>
</template>

<script>
import * as echarts from "echarts";
import teacherRequest from "@/utils/teacherRequest";
import {ElMessage} from "element-plus";

export default {
  name: "AnnounceResultsView",
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

    // 判断有没有成绩公布通知
    teacherRequest
        .get("/result/haveAnnounceResultsNotice")
        .then(resp => {
          if (resp.code === 200) {
            this.haveNotice = resp.data.haveOrNot === 1
            if (this.haveNotice) {
              this.queryClassAndSubject()
            }
          } else {
            ElMessage({
              message: "获取成绩公布通知失败",
              showClose: true,
              grouping: true,
              type: "error"
            })
          }
        })
  },
  data() {
    return {
      haveNotice: true,
      classSubject: [],
      finishDate: []
    }
  },
  methods: {
    // 加载教师教的班级和科目
    queryClassAndSubject() {
      teacherRequest
          .get("/teacher/queryClassAndSubjectByTeacherId")
          .then(resp => {
            console.log(resp)
            if (resp.code === 200) {
              this.classSubject = resp.data
              // 计算完成和未完成的数量
              let finishNum = 0;
              let unFinishNum = 0;
              for (let i = 0; i < this.classSubject.length; i++) {
                let class_ = this.classSubject[i]
                if (class_.haveFinish === 0) {
                  unFinishNum++
                } else {
                  finishNum++
                }
              }
              this.finishDate = [
                {
                  name: "已完成",
                  value: finishNum,
                },
                {
                  name: "未完成",
                  value: unFinishNum,
                }
              ]
              // 绘图
              this.drawECharts()
            } else {
              ElMessage({
                message: "获取班级科目失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 绘制echarts图
    drawECharts() {
      let myChart = echarts.init(document.getElementById('e_main'));
      let option = {
        title: {
          text: '公布成绩完成情况',
          left: 'center'
        },
        tooltip: {
          type: "item",
        },
        color: [
          "#32CD32",
          "#DC143C"
        ],
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: this.finishDate,
          }
        ]
      };
      myChart.setOption(option)
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

.main_part .table_part {
  float: left;
  width: 430px;
  margin: 20px 0 20px 40px;
}

.main_part .echarts_part {
  float: right;
  width: 390px;
  height: 390px;
  margin: 20px 40px;
}

.no_notice {
  background-color: darkgray;
  border-radius: 10px;
  padding: 10px;
  width: 940px;
  height: 450px;
  margin: 20px auto 0;
  line-height: 450px;
  font-size: 60px;
  text-align: center;
  cursor: default;
  user-select: none;
}

</style>
