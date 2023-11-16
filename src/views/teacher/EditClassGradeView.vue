<template>
  <div class="main_part">
    <el-page-header icon="ArrowLeft" @back="goBack">
      <template #content>
        <span> {{ className }} </span>
      </template>
    </el-page-header>
    <div style="display: inline-block">
      <el-table :data="students" max-height="390" class="table_part">
        <el-table-column type="index" label="#" width="60"/>
        <el-table-column prop="studentName" label="姓名" width="80"/>
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
    </div>
    <div class="right_part">
      <p class="title">
        完成情况
      </p>
      <div class="content">
        <p>已完成：{{ finish }}</p>
        <p>未完成：{{ noFinish }}</p>
      </div>
    </div>
    <div></div>
    <el-button
        class="btn"
        type="primary"
        @click="submit()"
        round
    >
      提交
    </el-button>
  </div>
</template>

<script>

import {ElMessage} from "element-plus";
import {getClassNameById, getStudentScoreList, getSubjectNameById, modifyStudentsScore} from "@/api/teacher";

export default {
  name: "EditClassGradeView",
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

    this.classId = this.$route.params.classId
    this.subjectId = this.$route.params.subjectId
    // TODO 根据id查询班级名称
    this.className = ""
    getClassNameById(this.classId)
        .then(resp => {
          if (resp.code === 200) {
            this.className = resp.data.className
            this.getSubjectName()
          } else {
            ElMessage({
              message: "获取班级失败",
              showClose: true,
              grouping: true,
              type: "error"
            })
          }
        })
  },
  data() {
    return {
      classId: 0,
      className: "",
      subjectId: 0,
      subjectName: "",
      students: [],
      finish: 0,
      noFinish: 0,
    }
  },
  methods: {
    // 获取科目名
    getSubjectName() {
      // TODO 根据id查询科目名称
      this.subjectName = "Java"
      getSubjectNameById(this.subjectId)
          .then(resp => {
            if (resp.code === 200) {
              this.subjectName = resp.data.subjectName
              // 获取学生列表
              this.getStudentList()
            } else {
              ElMessage({
                message: "获取科目失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 查询学生列表
    getStudentList() {
      getStudentScoreList(this.classId, this.subjectId)
          .then(resp => {
            if (resp.code === 200) {
              this.students = resp.data
              this.students.forEach(student => {
                this.noFinish +=
                    student.score === 0 ||
                    student.score === undefined ||
                    student.score === "" ||
                    student.score === null
                        ? 1 : 0;
              })
              this.finish = this.students.length - this.noFinish;
            } else {
              ElMessage({
                message: "获取学生列表失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 返回
    goBack() {
      window.location.href = "../"
    },
    // 完成输入，触发计算完成情况
    finishInputScore(row) {
      if (row.score > 100) {
        row.score = 100;
      } else if (row.score < 0) {
        row.score = 0;
      }
      this.finish = 0
      this.noFinish = this.students.length
      for (let i = 0; i < this.students.length; i++) {
        if (this.students[i].score !== null && this.students[i].score !== '') {
          this.finish++
          this.noFinish--
        }
      }
    },
    // 回车确定
    enterFinishInputScore(row, target) {
      this.finishInputScore(row)
      target.blur()
    },
    // 提交结果
    submit() {
      if (this.noFinish !== 0) {
        ElMessage({
          message: '还有学生未给出分数',
          showClose: true,
          grouping: true,
          type: 'warning',
        })
      } else {
        // TODO 提交打分
        modifyStudentsScore(this.subjectId, this.students)
            .then(resp => {
              if (resp.code === 200) {
                ElMessage({
                  message: '分数提交成功',
                  showClose: true,
                  grouping: true,
                  type: 'success',
                })
                this.$router.push("/teacher/announce_results")
              } else {
                ElMessage({
                  message: '分数提交失败',
                  showClose: true,
                  grouping: true,
                  type: 'error',
                })
              }
            })
      }
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 1100px) {
  .main_part {
    display: inline-block;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    width: 840px;
    height: 450px;
    margin: 20px auto 0 220px;
    text-align: left;
    transition: margin-left 0.8s;
  }
}

@media screen and (max-width: 1100px) {
  .main_part {
    display: inline-block;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    width: 840px;
    height: 450px;
    margin: 20px auto 0 64px;
    text-align: left;
    transition: margin-left 0.8s;
  }
}

.main_part .table_part {
  float: left;
  width: 300px;
  margin-left: 80px;
  margin-top: 10px;
}

.main_part .right_part {
  display: inline-block;
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

.btn {
  float: right;
  width: 130px;
  height: 40px;
  font-size: 20px;
  margin-top: 20px;
  margin-right: 80px;
}

/deep/ .scoreInput input::-webkit-outer-spin-button,
/deep/ .scoreInput input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

/deep/ .scoreInput input[type="number"] {
  -moz-appearance: textfield;
}

</style>
