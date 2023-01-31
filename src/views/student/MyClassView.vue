<template>
  <el-scrollbar class="main_part">
    <div class="label_part">
      {{ className }}
    </div>
    <div class="left_part">
      <span>班级同学</span>
      <el-table :data="students" height="250" style="width: 300px;font-size: 14px">
        <el-table-column type="index" label="#" width="60"/>
        <el-table-column prop="studentName" label="姓名" width="120"/>
        <el-table-column prop="studentSex" label="性别" width="120">
          <template #default="scope">
            {{ scope.row.studentSex === 0 ? "女" : "男" }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right_part">
      <span>班级教师</span>
      <el-table :data="teachers" height="250" style="width: 420px;font-size: 14px">
        <el-table-column type="index" label="#" width="60"/>
        <el-table-column prop="teacherName" label="姓名" width="120"/>
        <el-table-column prop="teacherName" label="性别" width="120">
          <template #default="scope">
            {{ scope.row.teacherSex === 0 ? "女" : "男" }}
          </template>
        </el-table-column>
        <el-table-column prop="subjectName" label="科目" width="120"/>
      </el-table>
    </div>
  </el-scrollbar>
</template>

<script>
import request from "@/utils/request";

export default {
  studentId: 1,
  studentName: "MyClassView",
  mounted() {
    // TODO 查询用户的班级
    this.classId = 1
    this.className = "B200113"
    request
        .get("/student/query_class_name")
        .then(resp => {
          console.log(resp)
        })

    // TODO 查询班级人列表
    this.students = [
      {
        studentId: 1,
        studentName: "学生1",
        studentSex: 1,
      },
      {
        studentId: 1,
        studentName: "学生2",
        studentSex: 0,
      },
      {
        studentId: 1,
        studentName: "学生3",
        studentSex: 1,
      },
      {
        studentId: 1,
        studentName: "学生4",
        studentSex: 1,
      },
      {
        studentId: 1,
        studentName: "学生5",
        studentSex: 1,
      },
      {
        studentId: 1,
        studentName: "学生6",
        studentSex: 1,
      },
      {
        studentId: 1,
        studentName: "学生7",
        studentSex: 1,
      },
      {
        studentId: 1,
        studentName: "学生8",
        studentSex: 1,
      },
      {
        studentId: 1,
        studentName: "学生9",
        studentSex: 1,
      },
    ]
    request
        .get(`/student/query_student_list_by_class_id/${this.classId}`)
        .then(resp => {
          console.log(resp)
        })

    // TODO 查询班级教师
    this.teachers = [
      {
        teacherId: 1,
        teacherName: "教师1",
        teacherSex: 1,
        subjectId: 1,
        subjectName: "Java",
      },
      {
        teacherId: 1,
        teacherName: "教师2",
        teacherSex: 0,
        subjectId: 1,
        subjectName: "Hadoop",
      },
      {
        teacherId: 1,
        teacherName: "教师3",
        teacherSex: 1,
        subjectId: 1,
        subjectName: "C++",
      },
      {
        teacherId: 1,
        teacherName: "教师4",
        teacherSex: 0,
        subjectId: 1,
        subjectName: "C",
      },
      {
        teacherId: 1,
        teacherName: "教师5",
        teacherSex: 1,
        subjectId: 1,
        subjectName: "Spark",
      },
      {
        teacherId: 1,
        teacherName: "教师6",
        teacherSex: 1,
        subjectId: 1,
        subjectName: "Golang",
      },
      {
        teacherId: 1,
        teacherName: "教师7",
        teacherSex: 0,
        subjectId: 1,
        subjectName: "Python",
      },
      {
        teacherId: 1,
        teacherName: "教师8",
        teacherSex: 1,
        subjectId: 1,
        subjectName: "Java",
      },
      {
        teacherId: 1,
        teacherName: "教师9",
        teacherSex: 1,
        subjectId: 1,
        subjectName: "Java",
      }
    ]
    request
        .get(`/teacher/query_teacher_list_by_class_id/${this.classId}`)
        .then(resp => {
          console.log(resp)
        })

  },
  data() {
    return {
      classId: '',
      className: "",
      students: [],
      teachers: [],
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
  margin: 20px auto 0;
  text-align: left;
  height: 450px;
}

.main_part .label_part {
  width: 150px;
  padding: 20px 0;
  margin-left: 20px;
  text-align: center;
  font-size: 1.7rem;
  border-bottom: solid 1px gray;
}

.main_part .left_part {
  float: left;
  margin: 10px 20px 16px 20px;
  padding: 30px;
  border-radius: 10px;
  border: solid 1px darkgray;
}

.main_part .left_part span {
  display: block;
  font-size: 1.3rem;
  padding-bottom: 20px;
}

.main_part .right_part {
  float: right;
  margin: 10px 20px 16px 20px;
  padding: 30px;
  border-radius: 10px;
  border: solid 1px darkgray;
}

.main_part .right_part span {
  display: block;
  font-size: 1.3rem;
  padding-bottom: 20px;
}

</style>
