<template>
  <div class="main_part">
    <el-menu
        router
        :default-active="this.$route.matched[1].path==='/teacher'?'/teacher/my_publish':this.$route.matched[1].path"
        class="el_menu"
    >
      <el-menu-item index="/teacher/my_publish">
        <el-icon>
          <MessageBox/>
        </el-icon>
        <span>我的发布</span>
      </el-menu-item>
      <el-menu-item v-if="this.userIdentity === 1" index="/teacher/class_list">
        <el-icon>
          <Guide/>
        </el-icon>
        <span>班级列表</span>
      </el-menu-item>
      <el-menu-item index="/teacher/publish_knowledge">
        <el-icon>
          <Reading/>
        </el-icon>
        <span>发布知识</span>
      </el-menu-item>
      <el-menu-item
          :index="this.$route.matched[1].path==='/teacher/announce_results/:classId/:subjectId'?'/teacher/announce_results/:classId/:subjectId':'/teacher/announce_results'">
        <el-icon>
          <Tickets/>
        </el-icon>
        <span>公布成绩</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  created() {
    console.log(this.$route.matched[1].path)
  },
  data() {
    return {
      userIdentity: 0,
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
