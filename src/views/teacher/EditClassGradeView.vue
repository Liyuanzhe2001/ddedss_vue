<template>
  <div class="main_part">
    <el-page-header icon="ArrowLeft" @back="goBack">
      <template #content>
        <span> {{ title }} </span>
      </template>
    </el-page-header>
    <el-table :data="students" max-height="390" class="table_part">
      <el-table-column type="index" label="#" width="60"/>
      <el-table-column prop="name" label="姓名" width="80"/>
      <el-table-column label="科目" width="80">
        <span>
          {{ subjectName }}
        </span>
      </el-table-column>
      <el-table-column label="分数" width="80">
        <template #default="scope">
          <el-input
              class="scoreInput"
              type="number"
              max="100"
              min="0"
              v-model="scope.row.score"
              @keyup.enter="enterFinishInputScore(scope.row, $event.target)"
              @blur="finishInputScore(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="right_part">
      <p class="title">
        完成情况
      </p>
      <div class="content">
        <p>已完成：{{ finish }}</p>
        <p>未完成：{{ noFinish }}</p>
      </div>
      <el-button
          class="btn"
          type="primary"
          @click="submit()"
          round
      >
        提交
      </el-button>
    </div>
  </div>
</template>

<script>

import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "EditClassGradeView",
  mounted() {
    let classId = this.$route.params.classId
    let subjectId = this.$route.params.subjectId
    // TODO 根据id查询班级名称
    this.title = "B200113"
    // TODO 根据id查询科目名称
    this.subjectName = "Java"
    // TODO 查询学生列表
    this.students = [
      {
        id: 1,
        name: "学生1",
        score: "",
      },
      {
        id: 2,
        name: "学生2",
        score: "",
      },
      {
        id: 3,
        name: "学生3",
        score: "",
      },
      {
        id: 4,
        name: "学生4",
        score: "",
      },
      {
        id: 5,
        name: "学生5",
        score: "",
      },
      {
        id: 6,
        name: "学生6",
        score: "",
      },
      {
        id: 7,
        name: "学生7",
        score: "",
      },
      {
        id: 8,
        name: "学生8",
        score: "",
      },
      {
        id: 9,
        name: "学生9",
        score: "",
      },
      {
        id: 10,
        name: "学生10",
        score: "",
      },
      {
        id: 11,
        name: "学生11",
        score: "",
      },
      {
        id: 12,
        name: "学生12",
        score: "",
      },
      {
        id: 13,
        name: "学生13",
        score: "",
      },
      {
        id: 14,
        name: "学生14",
        score: "",
      },
      {
        id: 15,
        name: "学生15",
        score: "",
      },
    ]

  },
  data() {
    return {
      title: "",
      subjectName: "",
      students: [],
      finish: 0,
      noFinish: 15,
    }
  },
  methods: {
    goBack() {
      window.location.href = "../"
    },
    finishInputScore(row) {
      if (row.score > 100) {
        row.score = 100;
      } else if (row.score < 0) {
        row.score = 0;
      }
      this.finish = 0
      this.noFinish = this.students.length
      for (let i = 0; i < this.students.length; i++) {
        if (this.students[i].score !== '') {
          this.finish++
          this.noFinish--
        }
      }
    },
    enterFinishInputScore(row, target) {
      this.finishInputScore(row)
      target.blur()
    },
    submit() {
      if (this.noFinish !== 0) {
        ElMessage({
          message: '还有学生未给出分数',
          grouping: true,
          type: 'warning',
        })
      } else {
        // TODO 提交打分
        ElMessage({
          type: 'success',
          message: '提交成功',
        })
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
  height: 450px;
  margin: 20px auto 0;
  text-align: left;
}

.main_part .table_part {
  float: left;
  width: 300px;
  margin-left: 80px;
  margin-top: 10px;
}

.main_part .right_part {
  float: right;
  width: 300px;
  margin-right: 40px;
  padding: 80px;
}

.main_part .right_part .title {
  font-size: 30px;
  width: 150px;
  line-height: 40px;
  padding-bottom: 10px;
  padding-left: 8px;
  border-bottom: solid 1px gray;
}

.main_part .right_part .content {
  margin-top: 30px;
  margin-left: 8px;
  line-height: 40px;
  font-size: 20px;
}

.main_part .right_part .btn {
  width: 130px;
  height: 40px;
  font-size: 20px;
  margin-top: 60px;
}

/deep/ .scoreInput input::-webkit-outer-spin-button,
/deep/ .scoreInput input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

/deep/ .scoreInput input[type="number"] {
  -moz-appearance: textfield;
}

</style>
