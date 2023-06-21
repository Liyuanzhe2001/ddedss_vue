<template>
  <div class="main_part">
    <el-menu
        router
        :collapse="isCollapse"
        :default-active="this.$route.matched[1].path"
        class="el_menu"
    >
      <el-menu-item index="/student/my_class">
        <el-icon>
          <Guide/>
        </el-icon>
        <span>我的班级</span>
      </el-menu-item>
      <el-menu-item route="/student/knowledge_world/1" index="/student/knowledge_world/:currentPage" @click="select()">
        <el-icon>
          <Reading/>
        </el-icon>
        <span>知识天地</span>
      </el-menu-item>
      <el-menu-item index="/student/exam_results">
        <el-icon>
          <Tickets/>
        </el-icon>
        <span>考试成绩</span>
      </el-menu-item>
      <el-menu-item index="/student/evaluate_courses">
        <el-icon>
          <Postcard/>
        </el-icon>
        <span>评价课程</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  inject: ['reload'],
  mounted() {
    window.addEventListener('resize', () => {
      this.isCollapse = window.innerWidth < 930;
    });
  },
  data() {
    return {
      isCollapse: window.innerWidth < 930,
    }
  },
  methods: {
    select() {
      this.reload()
    }
  }

}
</script>

<style scoped>
.main_part {
  width: 100%;
  background-color: white;
}

.main_part .el_menu {
  min-height: 509px;
  padding-top: 30px;
}

.el_menu:not(.el-menu--collapse) {
  width: 220px;
}

</style>
