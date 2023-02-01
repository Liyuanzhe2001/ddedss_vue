<template>
  <div class="main_part">
    <el-form
        class="form_part"
        :model="teacherInfo"
        label-width="120px"
        label-position="top"
        size="default"
    >
      <div class="left_part">
        <el-form-item label="工号">
          <el-input v-model="teacherInfo.number"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="teacherInfo.name"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="teacherInfo.sex" size="default">
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="0">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="teacherInfo.email"/>
        </el-form-item>
      </div>
      <div class="right_part">
        <el-form-item label="擅长科目">
          <div class="level_div">
            <label>了解</label>
            <el-tag
                style="margin-right: 5px"
                v-for="tag in teacherInfo.level"
                :key="tag"
                closable
                type="success"
                v-show="tag.level===0"
                :disable-transitions="false"
                @close="subjectClose(tag)"
            >
              {{ tag.subjectName }}
            </el-tag>
            <el-input
                v-if="knowInputVisible"
                ref="InputRef"
                v-model="levelInputValue"
                style="width: 60px;height: 20px;margin-right: 5px;"
                size="small"
                @blur="subjectAdd(0)"
            />
            <el-button
                v-else
                style="margin-right: 5px;height: 20px;width: 60px"
                size="small"
                @click="this.knowInputVisible = true;this.skilledInputVisible = false;this.masterInputVisible = false;">
              +
            </el-button>
          </div>
          <div class="level_div">
            <label>熟练</label>
            <el-tag
                style="margin-right: 5px"
                v-for="tag in teacherInfo.level"
                :key="tag"
                closable
                type="warning"
                v-show="tag.level===1"
                :disable-transitions="false"
                @close="subjectClose(tag)"
            >
              {{ tag.subjectName }}
            </el-tag>
            <el-input
                v-if="skilledInputVisible"
                ref="InputRef"
                v-model="levelInputValue"
                style="width: 60px;height: 20px;margin-right: 5px;"
                size="small"
                @blur="subjectAdd(1)"
            />
            <el-button
                v-else
                style="margin-right: 5px;height: 20px;width: 60px"
                size="small"
                @click="this.knowInputVisible = false;this.skilledInputVisible = true;this.masterInputVisible = false;">
              +
            </el-button>
          </div>
          <div class="level_div">
            <label>精通</label>
            <el-tag
                style="margin-right: 5px"
                v-for="tag in teacherInfo.level"
                :key="tag"
                closable
                type="danger"
                v-show="tag.level===2"
                :disable-transitions="false"
                @close="subjectClose(tag)"
            >
              {{ tag.subjectName }}
            </el-tag>
            <el-input
                v-if="masterInputVisible"
                ref="InputRef"
                v-model="levelInputValue"
                style="width: 60px;height: 20px;margin-right: 5px;"
                size="small"
                @blur="subjectAdd(2)"
            />
            <el-button
                v-else
                style="margin-right: 5px;height: 20px;width: 60px"
                size="small"
                @click="this.knowInputVisible = false;this.skilledInputVisible = false;this.masterInputVisible = true;">
              +
            </el-button>
          </div>
        </el-form-item>
        <el-button type="primary" round class="btn">创建</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "AddTeacherView",
  data() {
    return {
      teacherInfo: {
        number: '',
        name: '',
        email: '',
        sex: '',
        level: [
          {
            subjectName: "Java",
            level: 0,
          }
        ]
      },
      knowInputVisible: false,
      skilledInputVisible: false,
      masterInputVisible: false,
      levelInputValue: '',
    }
  },
  methods: {
    subjectClose(tag) {
      this.teacherInfo.level = this.teacherInfo.level.filter(function (item) {
        return item !== tag
      })
    },
    subjectAdd(n) {
      let input = this.levelInputValue
      if (input === '') {
        this.knowInputVisible = false
        this.skilledInputVisible = false
        this.masterInputVisible = false
      }


      let flag = true
      if (input === '') {
        flag = false
      }
      if (flag) {
        this.teacherInfo.level.forEach(function (value) {
          if (value.subjectName === input) {
            ElMessage({
              message: "该科目已存在",
              type: "warning",
            })
            flag = false
          }
        })
      }

      if (flag) {
        this.teacherInfo.level.push({
          subjectName: input,
          level: n
        })
        switch (n) {
          case 0:
            this.knowInputVisible = false
            break
          case 1:
            this.skilledInputVisible = false
            break
          case 2:
            this.masterInputVisible = false
            break
        }
      }
      this.inputValue = ""
    },
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

.main_part .form_part {
  width: 870px;
  margin: 40px auto;
}

.main_part .form_part .left_part {
  width: 400px;
  float: left;
  padding-right: 30px;
  border-right: solid 1px darkgray;
}

.main_part .form_part .right_part {
  width: 400px;
  float: right;
}

.main_part .form_part .right_part label {
  margin-right: 10px;
  padding-bottom: 10px;
}

.level_div {
  width: 100%;
  margin-bottom: 10px;
}

.main_part .form_part .right_part .btn{
  width: 140px;
  height: 40px;
  font-size: 17px;
  margin-top: 80px;
  margin-left: 20px;
}

</style>
