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
                :type="scope.row.haveFinish === 0? 'success' : 'error'"
                disable-transitions
            >{{ scope.row.haveFinish === 0 ? '已完成' : '未完成' }}
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

export default {
  name: "AnnounceResultsView",
  created() {
    // TODO 是否有成绩需要公布
    this.haveNotice = true
  },
  mounted() {
    if (this.haveNotice) {
      // TODO 加载教师教的班级和科目
      this.classSubject = [
        {
          classId: 1,
          className: "B200101",
          peopleNum: 40,
          subjectId: 1,
          subjectName: "Java",
          haveFinish: 0,
        },
        {
          classId: 2,
          className: "B200102",
          peopleNum: 41,
          subjectId: 2,
          subjectName: "C",
          haveFinish: 1,
        },
        {
          classId: 3,
          className: "B200101",
          peopleNum: 40,
          subjectName: "Java",
          haveFinish: 0,
        },
        {
          classId: 4,
          className: "B200101",
          peopleNum: 40,
          subjectName: "Java",
          haveFinish: 0,
        },
        {
          classId: 5,
          className: "B200101",
          peopleNum: 40,
          subjectName: "Java",
          haveFinish: 0,
        },
        {
          classId: 6,
          className: "C200101",
          peopleNum: 40,
          subjectName: "Java",
          haveFinish: 1,
        },
        {
          classId: 7,
          className: "B200101",
          peopleNum: 40,
          subjectName: "Java",
          haveFinish: 0,
        },
        {
          classId: 8,
          className: "B200101",
          peopleNum: 40,
          subjectName: "Java",
          haveFinish: 0,
        }, {
          classId: 9,
          className: "B200101",
          peopleNum: 40,
          subjectName: "Java",
          haveFinish: 0,
        },
        {
          classId: 10,
          className: "B200101",
          peopleNum: 40,
          subjectName: "Java",
          haveFinish: 0,
        },
        {
          classId: 11,
          className: "B200110",
          peopleNum: 40,
          subjectName: "Python",
          haveFinish: 1,
        },
        {
          classId: 12,
          className: "B200112",
          peopleNum: 44,
          subjectName: "C++",
          haveFinish: 0,
        },
      ]

      let finishNum = 0;
      let unFinishNum = 0;
      for (let i = 0; i < this.classSubject.length; i++) {
        let class_ = this.classSubject[i]
        if (class_.haveFinish === 0) {
          finishNum++
        } else {
          unFinishNum++
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

      // echarts
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
  },
  data() {
    return {
      haveNotice: false,
      classSubject: [],
      finishDate: [
        {
          name: "已完成",
          value: 1123,
        },
        {
          name: "未完成",
          value: 1230,
        }
      ]
    }
  },
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
