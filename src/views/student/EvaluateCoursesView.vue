<template>
  <div v-if="haveNotice">
    <div class="main_part" v-loading="loading">
      <el-table :data="teachers" height="370" class="table_part">
        <el-table-column type="index" label="#" width="60"/>
        <el-table-column prop="subjectName" label="课程" width="80"/>
        <el-table-column prop="teacherName" label="教师" width="80"/>
        <el-table-column label="评价" width="120">
          <template #default="scope">
            <el-select
                v-model="scope.row.final_"
                size="default"
                @change="evaluateChange"
            >
              <el-option label="优" value="1"/>
              <el-option label="差" value="0"/>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div style="display:inline-block;">
        <div class="good_bad">
          <p>优：{{ goodNum }}</p>
          <p>差：{{ badNum }}</p>
        </div>
        <el-button
            type="primary"
            class="submit_btn"
            round
            @click="submitEvaluation()"
        >
          提交
        </el-button>
      </div>
    </div>
  </div>
  <div v-else class="no_notice">
    暂无课程需要评价
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import request from "@/utils/request";

export default {
  teacherName: "EvaluateCoursesView",
  mounted() {
    // TODO 是否有课程需要评价
    this.haveNotice = true
    request
        .get("haveEvaluateCourseNotice")
        .then(resp => {
          console.log(resp)
        })

    // TODO 获取教师 课程表
    // 1. 获取班级
    request
        .get("/student/query_class_name")
        .then(resp=>{
          console.log(resp)
        })
    let classId = 1
    // 2. 通过班级id查询教师课程列表表
    request
        .get(`/teacher/query_teacher_list_by_class_id/${classId}`)
        .then(resp=>{
          console.log(resp)
        })

    if (this.haveNotice) {
      this.teachers = [
        {
          teacherId: 0,
          teacherName: "教师1",
          subjectId: 0,
          subjectName: "科目1",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目2",
          teacherId: 0,
          teacherName: "教师2",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目3",
          teacherId: 0,
          teacherName: "教师3",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目4",
          teacherId: 0,
          teacherName: "教师4",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目5",
          teacherName: "教师5",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目6",
          teacherId: 0,
          teacherName: "教师6",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目7",
          teacherId: 0,
          teacherName: "教师7",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目8",
          teacherName: "教师8",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目9",
          teacherId: 0,
          teacherName: "教师9",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目10",
          teacherId: 0,
          teacherName: "教师10",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目11",
          teacherId: 0,
          teacherName: "教师11",
          final_: '',
        },
        {
          subjectId: 0,
          subjectName: "科目12",
          teacherId: 0,
          teacherName: "教师12",
          final_: '',
        }
      ]
    }
  },
  data() {
    return {
      haveNotice: false,
      loading: false,
      teachers: [],
      goodNum: 0,
      badNum: 0,
    }
  },
  methods: {
    evaluateChange() {
      this.goodNum = 0
      this.badNum = 0
      for (let i = 0; i < this.teachers.length; i++) {
        let final_ = this.teachers[i].final_
        if (final_ === "1") {
          this.goodNum++
        } else if (final_ === "0") {
          this.badNum++
        }
      }
    },
    submitEvaluation() {
      this.loading = true
      if (this.goodNum + this.badNum === this.teachers.length) {
        ElMessage({
          message: "提交成功",
          type: "success",
        })
        this.haveNotice = false
      } else {
        ElMessage({
          message: "请完成所有评价",
          type: "warning",
        })
      }
      this.loading = false
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
  display: inline-block;
  width: 340px;
  margin-top: 40px;
  margin-left: 80px;
}

.main_part .submit_btn {
  width: 180px;
  height: 40px;
  font-size: 17px;
  margin-left: 140px;
  margin-bottom: 100px;
}

.main_part .good_bad {
  margin-left: 120px;
  margin-bottom: 80px;
  font-size: 40px;
  line-height: 70px;
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
