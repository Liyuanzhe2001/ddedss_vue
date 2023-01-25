<template>
  <div class="main_part">
    <el-scrollbar class="left_part" height="380">
      <el-menu
          :default-active="active"
          v-for="c in classList"
          v-bind="c"
          style="border-right: none"
          @select="handleSelect"
      >
        <el-menu-item :index="c.id" @click="selectClass(c)">
          <span
              v-text="c.name"
              style="font-size: 17px"
          />
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <div class="right_part">
      <div v-if="classType!==''&&classMajor!==''">
        <el-table :data="classStudents" height="370" class="table_part">
          <el-table-column type="index" label="#" width="60"/>
          <el-table-column prop="name" label="姓名" width="60"/>
          <el-table-column prop="sex" label="性别" width="60"/>
        </el-table>
        <div class="label_part">
          <span>
            {{ classType === 0 ? '专科' : '本科' }}-{{ classMajor }}
          </span>
        </div>
        <div class="text_part">
          <p>
            总人数：{{ studentNum }}人
          </p>
          <p>
            男：{{ boyNum }}人
          </p>
          <p>
            女：{{ girlNum }}人
          </p>
        </div>
      </div>
      <div v-else class="select_class_tip">
        请选择班级
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentListView",
  data() {
    return {
      active: '',
      classList: [
        {
          id: 1,
          name: "B200101",
          type: 0,
          major: "软件工程",
        },
        {
          id: 2,
          name: "B200102",
          type: 1,
          major: "人工智能",
        },
        {
          id: 3,
          name: "B200103",
          type: 1,
          major: "软件工程",
        },
        {
          id: 4,
          name: "B200104",
          type: 0,
          major: "软件工程",
        },
        {
          id: 5,
          name: "B200105",
          type: 0,
          major: "软件工程",
        },
        {
          id: 6,
          name: "B200106",
          type: 0,
          major: "软件工程",
        },
        {
          id: 7,
          name: "B200107",
          type: 0,
          major: "软件工程",
        },
        {
          id: 8,
          name: "B200108",
          type: 0,
          major: "软件工程",
        },
        {
          id: 9,
          name: "B200109",
          type: 1,
          major: "软件工程",
        },
        {
          id: 10,
          name: "B200110",
          type: 1,
          major: "软件工程",
        },
      ],
      classStudents: [
        {
          name: "学生1",
          sex: "男",
        },
        {
          name: "学生2",
          sex: "女",
        },
        {
          name: "学生3",
          sex: "男",
        },
        {
          name: "学生4",
          sex: "男",
        },
        {
          name: "学生5",
          sex: "男",
        },
        {
          name: "学生6",
          sex: "男",
        },
        {
          name: "学生7",
          sex: "男",
        },
        {
          name: "学生8",
          sex: "男",
        },
        {
          name: "学生9",
          sex: "男",
        },
        {
          name: "学生10",
          sex: "男",
        },
        {
          name: "学生11",
          sex: "男",
        },
        {
          name: "学生12",
          sex: "男",
        },
        {
          name: "学生13",
          sex: "男",
        },
        {
          name: "学生14",
          sex: "男",
        },
        {
          name: "学生15",
          sex: "男",
        },
      ],
      classType: '',
      classMajor: '',
      studentNum: '',
      boyNum: '',
      girlNum: '',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.active = key
    },
    selectClass(c) {
      this.classType = c.type
      this.classMajor = c.major
      // 查询班级人数，男性人数，女性人数
      this.studentNum = 40
      this.boyNum = 30
      this.girlNum = 10
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
  margin: 20px auto 0;
  text-align: left;
  height: 450px;
}

.main_part .left_part {
  float: left;
  width: 220px;
  height: 370px;
  margin: 20px;
  padding: 20px;
  border: solid 1px darkgray;
  border-radius: 10px;
}

.main_part .right_part {
  float: right;
  width: 530px;
  height: 370px;
  margin: 20px;
  padding: 20px;
  border: solid 1px darkgray;
  border-radius: 10px;
}

.main_part .right_part .table_part {
  float: left;
  width: 180px;
  font-size: 14px;
}

.main_part .right_part .label_part {
  display: inline-block;
  float: top;
  width: 300px;
  margin-left: 30px;
  height: 100px;
}

.main_part .right_part .label_part span {
  font-size: 40px;
  padding: 0 20px;
  border-bottom: solid 1px darkgray;
}

.main_part .right_part .text_part {
  display: inline-block;
  clear: both;
  width: 300px;
  margin-left: 30px;
  height: 200px;
}

.main_part .right_part .text_part p {
  font-size: 25px;
  line-height: 40px;
}

.main_part .right_part .select_class_tip {
  width: 530px;
  height: 370px;
  line-height: 370px;
  text-align: center;
  font-size: 60px;
}

</style>
