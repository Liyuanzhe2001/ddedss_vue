<template>
  <div class="main_part">
    <el-menu
        router
        :default-active="this.$route.matched[1].path"
        class="el_menu"
    >
      <el-menu-item index="/professional/student_list">
        <el-icon>
          <Guide/>
        </el-icon>
        <span>学生列表</span>
      </el-menu-item>
      <el-menu-item index="/professional/schedule_courses">
        <el-icon>
          <Finished/>
        </el-icon>
        <span>安排课程</span>
      </el-menu-item>
      <el-menu-item index="/3">
        <el-icon>
          <Switch/>
        </el-icon>
        <span>选课倾向</span>
      </el-menu-item>
      <el-menu-item route="/professional/course_evaluation/1" index="/professional/course_evaluation/:currentPage" @click="select()">
        <el-icon>
          <Postcard/>
        </el-icon>
        <span>课程评价</span>
      </el-menu-item>
      <el-menu-item index="/5">
        <el-icon>
          <Link/>
        </el-icon>
        <span>学习分组</span>
      </el-menu-item>
      <el-menu-item index="/professional/results_analysis">
        <el-icon>
          <PieChart/>
        </el-icon>
        <span>成绩分析</span>
      </el-menu-item>
      <el-menu-item index="/7">
        <el-icon>
          <DataLine/>
        </el-icon>
        <span>成绩预测</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  inject: ['reload'],
  methods:{
    select(){
      this.reload()
    }
  }
}
</script>

<style scoped>
.main_part {
  width: 240px;
  background-color: white;
}

.main_part .el_menu {
  min-height: 509px;
  padding-top: 30px;
}

</style>
