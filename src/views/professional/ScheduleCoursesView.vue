<template>
  <div class="main_part">
    <div class="left">
      <div class="common">
        <p>选择班级</p>
        <el-select
            size="default"
            v-model="form.classId"
            placeholder="选择班级"
            @change="initTime"
            placement="right"
        >
          <el-option
              v-for="c in classList"
              :label="c.className"
              :value="c.classId"/>
        </el-select>
      </div>
      <div class="common">
        <p>选择科目</p>
        <el-select
            size="default"
            v-model="form.subjectId"
            placeholder="选择科目"
            @change="loadTeacher"
            placement="right">
          <el-option
              v-for="subject in subjectList"
              :label="subject.subjectName"
              :value="subject.subjectId"/>
        </el-select>
      </div>
      <div class="common">
        <p>选择教师</p>
        <el-select
            size="default"
            v-model="form.teacherId"
            placeholder="选择教师"
            @click="selectTeacher"
            @change="initTime"
            placement="right"
        >
          <el-option
              v-for="teacher in teacherList"
              :label="teacher.teacherName"
              :value="teacher.teacherId"/>
        </el-select>
      </div>
    </div>

    <div class="right">
      <p>选择时间</p>
      <el-table :data="lessonTime" style="width: 300px">
        <el-table-column prop="Monday" label="星期一" width="60">
          <template #default="scope">
            <el-button
                v-if="scope.row.Monday===0"
                style="width: 50px"
                @click="selectTime(1,scope)"
            />
            <el-button
                v-else-if="scope.row.Monday===2"
                disabled
                type="primary"
                style="width: 50px"
            />
            <el-button v-else disabled type="danger" style="width: 50px"/>
          </template>
        </el-table-column>
        <el-table-column prop="Tuesday" label="星期二" width="60">
          <template #default="scope">
            <el-button
                v-if="scope.row.Tuesday===0"
                style="width: 50px"
                @click="selectTime(2,scope)"
            />
            <el-button
                v-else-if="scope.row.Tuesday===2"
                disabled
                type="primary"
                style="width: 50px"
            />
            <el-button v-else disabled type="danger" style="width: 50px"/>
          </template>
        </el-table-column>
        <el-table-column prop="Wednesday" label="星期三" width="60">
          <template #default="scope">
            <el-button
                v-if="scope.row.Wednesday===0"
                style="width: 50px"
                @click="selectTime(3,scope)"
            />
            <el-button
                v-else-if="scope.row.Wednesday===2"
                disabled
                type="primary"
                style="width: 50px"
            />
            <el-button v-else disabled type="danger" style="width: 50px"/>
          </template>
        </el-table-column>
        <el-table-column prop="Thursday" label="星期四" width="60">
          <template #default="scope">
            <el-button
                v-if="scope.row.Thursday===0"
                style="width: 50px"
                @click="selectTime(4,scope)"
            />
            <el-button
                v-else-if="scope.row.Thursday===2"
                disabled
                type="primary"
                style="width: 50px"
            />
            <el-button v-else disabled type="danger" style="width: 50px"/>
          </template>
        </el-table-column>
        <el-table-column prop="Friday" label="星期五" width="60">
          <template #default="scope">
            <el-button
                v-if="scope.row.Friday===0"
                style="width: 50px"
                @click="selectTime(5,scope)"
            />
            <el-button
                v-else-if="scope.row.Friday===2"
                disabled
                type="primary"
                style="width: 50px"
            />
            <el-button v-else disabled type="danger" style="width: 50px"/>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="submit_btn" type="primary" round @click="submit">
        提交
      </el-button>
    </div>
  </div>
</template>

<script>
import professionalRequest from "@/utils/professionalRequest";
import {ElMessage} from "element-plus";

export default {
  name: "ScheduleCoursesView",
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

    // 加载所有班级
    professionalRequest
        .get("/class/getAllClass")
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
    // 获加载所有科目
    professionalRequest
        .get("/subject/getAllSubject")
        .then(resp => {
          if (resp.code === 200) {
            this.subjectList = resp.data
          } else {
            ElMessage({
              message: "获取科目信息失败",
              showClose: true,
              grouping: true,
              type: "error"
            })
          }
        })
  },
  data() {
    return {
      classList: [],
      subjectList: [],
      teacherList: [],
      lessonTime: [
        {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
        },
        {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
        },
        {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
        },
        {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
        },
      ],
      form: {
        classId: "",
        subjectId: "",
        teacherId: "",
        weekday: "",
        section: "",
      }
    }
  }
  ,
  methods: {
    // 选择教师
    selectTeacher() {
      if (this.form.subjectId === "") {
        ElMessage({
          message: "请先选择科目",
          showClose: true,
          grouping: true,
          type: "warning"
        })
      }
    },
    // 加载教师
    loadTeacher() {
      if (this.form.subjectId !== "") {
        professionalRequest
            .get(`/teacherSubject/getTeachersBySubjectId/${this.form.subjectId}`)
            .then(resp => {
              if (resp.code === 200) {
                this.teacherList = resp.data
              } else {
                ElMessage({
                  message: "获取教师信息失败",
                  showClose: true,
                  grouping: true,
                  type: "error"
                })
              }
            })
      }
    },
    // 初始化课程时间
    initTime() {
      this.lessonTime = [
        {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
        },
        {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
        },
        {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
        },
        {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
        },
      ]
      if (this.form.teacherId !== "") {
        this.loadTeacherTime()
      }
      if (this.form.classId !== "") {
        this.loadClassTime()
      }
    },
    // 加载班级课程安排时间
    loadClassTime() {
      professionalRequest
          .get(`/lesson/getLessonsByClassId/${this.form.classId}`)
          .then(resp => {
            if (resp.code === 200) {
              for (let i = 0; i < resp.data.length; i++) {
                // 第几节课
                let section = resp.data[i].section
                // 星期几
                let weekday = resp.data[i].weekday
                switch (weekday) {
                  case 1:
                    this.lessonTime[section - 1].Monday = 1
                    break
                  case 2:
                    this.lessonTime[section - 1].Tuesday = 1
                    break
                  case 3:
                    this.lessonTime[section - 1].Wednesday = 1
                    break
                  case 4:
                    this.lessonTime[section - 1].Thursday = 1
                    break
                  case 5:
                    this.lessonTime[section - 1].Friday = 1
                    break
                }
              }
            } else {
              ElMessage({
                message: "获取课程时间失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 加载教师课程安排时间
    loadTeacherTime() {
      console.log("进入")
      professionalRequest
          .get(`/lesson/getLessonsByTeacherId/${this.form.teacherId}`)
          .then(resp => {
            if (resp.code === 200) {
              for (let i = 0; i < resp.data.length; i++) {
                // 第几节课
                let section = resp.data[i].section
                // 星期几
                let weekday = resp.data[i].weekday
                switch (weekday) {
                  case 1:
                    this.lessonTime[section - 1].Monday = 1
                    break
                  case 2:
                    this.lessonTime[section - 1].Tuesday = 1
                    break
                  case 3:
                    this.lessonTime[section - 1].Wednesday = 1
                    break
                  case 4:
                    this.lessonTime[section - 1].Thursday = 1
                    break
                  case 5:
                    this.lessonTime[section - 1].Friday = 1
                    break
                }
              }
            } else {
              ElMessage({
                message: "获取课程时间失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    // 选择课程时间
    selectTime(weekday, scope) {
      if (this.form.classId === '') {
        ElMessage({
          message: "请先选择班级",
          showClose: true,
          grouping: true,
          type: "warning"
        })
        return
      }
      if (this.form.weekday !== null || this.form.weekday !== '') {
        switch (this.form.weekday) {
          case 1:
            this.lessonTime[this.form.section - 1].Monday = 0;
            break;
          case 2:
            this.lessonTime[this.form.section - 1].Tuesday = 0;
            break;
          case 3:
            this.lessonTime[this.form.section - 1].Wednesday = 0;
            break;
          case 4:
            this.lessonTime[this.form.section - 1].Thursday = 0;
            break;
          case 5:
            this.lessonTime[this.form.section - 1].Friday = 0;
            break;
        }
      }

      let row = scope.row
      let section = scope.$index + 1
      this.form.weekday = weekday
      this.form.section = section
      switch (weekday) {
        case 1:
          row.Monday = 2;
          break;
        case 2:
          row.Tuesday = 2;
          break;
        case 3:
          row.Wednesday = 2;
          break;
        case 4:
          row.Thursday = 2;
          break;
        case 5:
          row.Friday = 2;
          break;
      }
    },
    // 提交
    submit() {
      if (this.form.classId === "") {
        ElMessage({
          message: "请选择班级",
          showClose: true,
          grouping: true,
          type: "warning"
        })
      } else if (this.form.subjectId === "") {
        ElMessage({
          message: "请选择科目",
          showClose: true,
          grouping: true,
          type: "warning"
        })
      } else if (this.form.teacherId === "") {
        ElMessage({
          message: "请选择教师",
          showClose: true,
          grouping: true,
          type: "warning"
        })
      } else if (this.form.weekday === "" || this.form.section === "") {
        ElMessage({
          message: "请选择课程时间",
          showClose: true,
          grouping: true,
          type: "warning"
        })
      } else {
        console.log(this.form)
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

.main_part .left {
  float: left;
  margin-top: 30px;
  margin-left: 80px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-right: solid 1px gray;
}

p {
  font-size: 20px;
  line-height: 40px;
}

.common {
  margin: 30px;
}

.right {
  float: right;
  margin: 20px 0 0 80px;
  width: 460px;
  height: 400px;
}

.right .submit_btn {
  margin-top: 80px;
  margin-left: 40px;
  width: 200px;
  height: 40px;
  font-size: 17px;
}

</style>
