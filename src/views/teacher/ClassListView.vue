<template>
  <el-scrollbar class="main_part">
    <div class="label_part">
      {{ className }}
    </div>
    <div class="left_part">
      <span>班级同学</span>
      <el-table :data="studentList" height="250" style="width: 300px;font-size: 14px">
        <el-table-column type="index" label="#" width="60"/>
        <el-table-column prop="name" label="姓名" width="120"/>
        <el-table-column prop="sex" label="性别" width="120">

        </el-table-column>
      </el-table>
    </div>
    <div class="right_part">
      <span>班级教师</span>
      <el-table :data="classTeachers" height="250" style="width: 420px;font-size: 14px">
        <el-table-column type="index" label="#" width="60"/>
        <el-table-column prop="name" label="姓名" width="120"/>
        <el-table-column prop="sex" label="性别" width="120"/>
        <el-table-column prop="subject" label="科目" width="120"/>
      </el-table>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: "MyClassView",
  mounted() {
    // TODO 查询用户的班级
    this.classId = 1
    this.className = "B200113"

    // TODO 查询班级人列表
    this.studentList = [
      {
        name: "学生1",
        sex: 1,
      },
      {
        name: "学生2",
        sex: 0,
      },
      {
        name: "学生3",
        sex: 1,
      },
      {
        name: "学生4",
        sex: 1,
      },
      {
        name: "学生5",
        sex: 1,
      },
      {
        name: "学生6",
        sex: 1,
      },
      {
        name: "学生7",
        sex: 1,
      },
      {
        name: "学生8",
        sex: 1,
      },
      {
        name: "学生9",
        sex: 1,
      },
    ]

    // TODO 查询班级教师
    this.classTeachers = [
      {
        name: "教师1",
        sex: 1,
        subject: "Java",
      },
      {
        name: "教师2",
        sex: 0,
        subject: "Hadoop",
      },
      {
        name: "教师3",
        sex: 1,
        subject: "C++",
      },
      {
        name: "教师4",
        sex: 0,
        subject: "C",
      },
      {
        name: "教师5",
        sex: 1,
        subject: "Spark",
      },
      {
        name: "教师6",
        sex: 1,
        subject: "Golang",
      },
      {
        name: "教师7",
        sex: 0,
        subject: "Python",
      },
      {
        name: "教师8",
        sex: 1,
        subject: "Java",
      },
      {
        name: "教师9",
        sex: 1,
        subject: "Java",
      }
    ]

  },
  data() {
    return {
      classId: '',
      className: "",
      studentList: [],
      classTeachers: [],
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
  border: solid 1px darkgray;
}

.main_part .right_part span {
  display: block;
  font-size: 1.3rem;
  padding-bottom: 20px;
}

</style>
