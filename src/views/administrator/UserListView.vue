<template>
  <div class="main_part">
    <div class="search_part">
      <el-input
          style="width: 160px;"
          placeholder="输入学号/工号或姓名"
          v-model="searchInput"
      />
      <el-button
          type="primary"
          style="width: 50px;height: 24px;margin-left: 6px"
          @click="getAllUserList"
      >
        搜索
      </el-button>
    </div>
    <el-table class="table_part" :data="userList" style="width: 750px">
      <el-table-column type="index" label="#" width="50"/>
      <el-table-column prop="userNumber" label="学号/工号" width="140"/>
      <el-table-column prop="userName" label="姓名" width="140"/>
      <el-table-column prop="userEmail" label="邮箱" width="180"/>
      <el-table-column label="身份" width="120">
        <template #default="scope">
          <p v-if="scope.row.userIdentity===-1">辅导员</p>
          <p v-else-if="scope.row.userIdentity === 0">学生</p>
          <p v-else-if="scope.row.userIdentity === 1">教师</p>
          <p v-else-if="scope.row.userIdentity === 2">教育专家</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-popconfirm
              title="确定删除用户?"
              @confirm="confirmDelete(scope.row.userId)"
          >
            <template #reference>
              <el-button
                  link
                  type="primary"
                  size="small"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
              title="确定重置密码?"
              @confirm="confirmInitPassword(scope.row.userId)"
          >
            <template #reference>
              <el-button
                  link
                  type="primary"
                  size="small"
              >
                重置密码
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="page_part"
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import adminRequest from "@/utils/adminRequest";
import {ElMessage} from "element-plus";

export default {
  name: "UserListView",
  mounted() {
    // 判断用户身份
    const identity = sessionStorage.getItem("identity")
    switch (identity) {
      case null:
        alert("无账号信息，请重新登录")
        this.$router.push("/")
        return
      case '0':
        this.$router.push("/student")
        return
      case '1':
      case '-1':
        this.$router.push("/teacher")
        return
      case '2':
        this.$router.push('/professional')
        return
    }

    this.currentPage = this.$route.params.currentPage
    console.log(this.currentPage)
    // 获取用户列表
    this.getAllUserList()

  },
  data() {
    return {
      userList: [],
      searchInput: '',
      currentPage: '',
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    // 获取用户列表
    getAllUserList() {
      adminRequest
          .get("/admin/queryAllUserList", {
            params: {
              searchInput: this.searchInput,
              currentPage: this.currentPage,
              pageSize: this.pageSize
            }
          })
          .then(resp => {
            if (resp.code === 200) {
              this.userList = resp.data
              this.total = resp.total
            } else {
              ElMessage({
                message: "获取用户列表失败",
                showClose: true,
                grouping: true,
                type: "error",
              })
            }
          })
    },
    // 确定删除用户
    confirmDelete(userId) {
      adminRequest
          .delete(`/admin/deleteUser/${userId}`)
          .then(resp => {
            if (resp.code === 200) {
              ElMessage({
                message: "删除成功",
                showClose: true,
                grouping: true,
                type: "success",
              })
              this.getAllUserList()
            } else {
              ElMessage({
                message: "删除失败",
                showClose: true,
                grouping: true,
                type: "error",
              })
            }
          })
    },
    // 确定重置用户密码
    confirmInitPassword(userId) {
      adminRequest
          .put(`/admin/initPassword/${userId}`)
          .then(resp => {
            if (resp.code === 200) {
              ElMessage({
                message: "重置密码成功",
                showClose: true,
                grouping: true,
                type: "success",
              })
            } else {
              ElMessage({
                message: "删除失败",
                showClose: true,
                grouping: true,
                type: "error",
              })
            }
          })
    },
    // 翻页
    handleCurrentChange(page) {
      this.$router.push("/admin/user_list/" + page)
      this.currentPage = page
      this.getAllUserList()
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

.main_part .search_part {
  width: 700px;
  margin: 10px auto;
  text-align: right;
}

.main_part .table_part {
  margin: 10px auto;
}

.main_part .page_part {
  width: 700px;
  margin: 0 auto;
  text-align: right;
}

</style>
