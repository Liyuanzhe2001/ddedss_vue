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
      <el-table-column label="身份" width="80">
        <template #default="scope">
          <p v-if="scope.row.userIdentity === 0">学生</p>
          <p v-else-if="scope.row.userIdentity === 1">教师</p>
          <p v-else-if="scope.row.userIdentity === 2">教育专家</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button
              link
              type="primary"
              size="small"
              @click="showDialog(scope.$index)"
          >
            修改
          </el-button>
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

  <el-dialog
      v-model="dialogVisible"
      title="修改密码"
      width="400px"
      @keyup.enter="changeInfo()"
  >
    <label class="user_form_label" for="number">学号/工号</label>
    <el-input id="number" v-model="userForm.number" style="width: 200px;"/>
    <label class="user_form_label" for="name">姓名</label>
    <el-input id="name" v-model="userForm.name" style="width: 200px;"/>
    <label class="user_form_label" for="email">邮箱</label>
    <el-input id="email" v-model="userForm.email" style="width: 200px;"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="changeInfo()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import {ElMessage} from "element-plus";
import {deleteUser, initPassword, modifyUser, queryAllUserList} from "@/api/administrator";

export default {
  name: "UserListView",
  created() {
    this.currentPage = this.$route.params.currentPage
  },
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
        this.$router.push("/teacher")
        return
      case '2':
        this.$router.push('/professional')
        return
    }

    // 获取用户列表
    this.getAllUserList()

  },
  data() {
    return {
      userList: [],
      dialogVisible: false,
      userForm: [],
      searchInput: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    // 获取用户列表
    getAllUserList() {
      queryAllUserList(this.searchInput, this.currentPage, this.pageSize)
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
    // 初始化用户信息
    showDialog(index) {
      console.log(this.userList[index])
      this.userForm.id = this.userList[index].userId
      this.userForm.number = this.userList[index].userNumber
      this.userForm.name = this.userList[index].userName
      this.userForm.email = this.userList[index].userEmail
      this.dialogVisible = true
    },
    // 修改用户信息
    changeInfo() {
      modifyUser(this.userForm)
          .then(resp => {
            if (resp.code === 200) {
              ElMessage({
                message: '修改成功',
                showClose: true,
                grouping: true,
                type: 'success'
              })
              location.reload()
              this.dialogVisible = false;
            } else {
              ElMessage({
                message: resp.msg,
                showClose: true,
                grouping: true,
                type: 'warning'
              })
            }
          })
    },
    // 确定删除用户
    confirmDelete(userId) {
      deleteUser(userId)
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
      initPassword(userId)
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
  width: 840px;
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

.user_form_label {
  display: block;
  text-align: left;
  margin-left: 80px;
  margin-bottom: 5px;
  margin-top: 10px;
}

</style>
