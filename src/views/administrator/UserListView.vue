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
          <p v-if="scope.row.userIdentity===0">辅导员</p>
          <p v-else-if="scope.row.userIdentity === 1">教师</p>
          <p v-else-if="scope.row.userIdentity === 2">教育专家</p>
          <p v-else-if="scope.row.userIdentity === 3">学生</p>
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
export default {
  name: "UserListView",
  mounted() {
    this.userList = [
      {
        userId: 1,
        userNumber: 202000621,
        userName: "名字一",
        // 身份（0辅导员 1教师 2教育专家 3学生）
        userEmail: "1234567890@qq.com",
        userIdentity: 0,
      },
      {
        userId: 2,
        userNumber: 202000621,
        userName: "名字一",
        // 身份（0辅导员 1教师 2教育专家 3学生）
        userEmail: "1234567890@qq.com",
        userIdentity: 1,
      },
      {
        userId: 3,
        userNumber: 202000621,
        userName: "名字一",
        // 身份（0辅导员 1教师 2教育专家 3学生）
        userEmail: "1234567890@qq.com",
        userIdentity: 2,
      },
      {
        userId: 4,
        userNumber: 202000621,
        userName: "名字一",
        // 身份（0辅导员 1教师 2教育专家 3学生）
        userEmail: "1234567890@qq.com",
        userIdentity: 0,
      },
      {
        userId: 5,
        userNumber: 202000621,
        userName: "名字一",
        // 身份（0辅导员 1教师 2教育专家 3学生）
        userEmail: "1234567890@qq.com",
        userIdentity: 3,
      },
      {
        userId: 6,
        userNumber: 202000621,
        userName: "名字一",
        // 身份（0辅导员 1教师 2教育专家 3学生）
        userEmail: "1234567890@qq.com",
        userIdentity: 3,
      },
      {
        userId: 7,
        userNumber: 202000621,
        userName: "名字一",
        // 身份（0辅导员 1教师 2教育专家 3学生）
        userEmail: "1234567890@qq.com",
        userIdentity: 3,
      },
      {
        userId: 8,
        userNumber: 202000621,
        userName: "名字一",
        // 身份（0辅导员 1教师 2教育专家 3学生）
        userEmail: "1234567890@qq.com",
        userIdentity: 0,
      },
      {
        userId: 9,
        userNumber: 202000621,
        userName: "名字一",
        // 身份（0辅导员 1教师 2教育专家 3学生）
        userEmail: "1234567890@qq.com",
        userIdentity: 0,
      },
      {
        userId: 10,
        userNumber: 202000621,
        userName: "名字一",
        // 身份（0辅导员 1教师 2教育专家 3学生）
        userEmail: "1234567890@qq.com",
        userIdentity: 0,
      },
    ]
  },
  data() {
    return {
      userList: [],
      searchInput: '',
      currentPage: 1,
      pageSize: 10,
      total: 100,
    }
  },
  methods: {
    confirmDelete(userId) {
      // TODO 删除user
    },
    confirmInitPassword(userId) {
      // TODO 重置密码
    },
    handleCurrentChange(page) {
      this.$router.push("/admin/user_list/" + page)
      this.currentPage = page
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
