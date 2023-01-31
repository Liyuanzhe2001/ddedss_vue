<template>
  <div class="main_part">
    <el-menu
        router
        :default-active="this.$route.matched[1].path"
        class="el_menu"
    >
      <el-menu-item index="/admin/user_list">
        <el-icon>
          <Guide/>
        </el-icon>
        <span>用户列表</span>
      </el-menu-item>
      <el-menu-item route="/admin/knowledge_list/1" index="/admin/knowledge_list/:currentPage"  @click="select()">
        <el-icon>
          <Guide/>
        </el-icon>
        <span>知识列表</span>
      </el-menu-item>
      <el-menu-item index="/admin/modify_password">
        <el-icon>
          <Guide/>
        </el-icon>
        <span>修改密码</span>
      </el-menu-item>
      <el-menu-item index="/admin/add_teacher">
        <el-icon>
          <Guide/>
        </el-icon>
        <span>新增教师</span>
      </el-menu-item>
      <el-menu-item index="/admin/add_professional">
        <el-icon>
          <Guide/>
        </el-icon>
        <span>新增教育专家</span>
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
