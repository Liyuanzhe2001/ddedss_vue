<template>
  <div class="main_part">
    <div style="width: 660px;margin: 0 auto;">
      <div style="height: 37px;margin-top: 40px;">
        <el-input style="width: 200px" v-model="inputSearch"/>
        <el-button icon="Search" style="margin-left: 4px;width: 30px" @click="search()"/>
      </div>
      <div style="height: 300px;">
        <el-table :data="classList" border>
          <el-table-column type="index" label="#" width="60"/>
          <el-table-column prop="name" label="班级" width="120"/>
          <el-table-column prop="num" label="人数" width="120"/>
          <el-table-column label="注册码" width="120">
            <template #default="scope">
              <el-popover
                  v-if="scope.row.code !== null"
                  placement="top-start"
                  title="注册码"
                  :width="200"
                  trigger="hover"
                  :content="scope.row.code"
              >
                <template #reference>
                  <p class="m-2">{{ scope.row.code }}</p>
                </template>
              </el-popover>
              <p v-else class="m-2">{{ scope.row.code }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作1" width="120">
            <template #default="scope">
              <el-popconfirm
                  title="确定删除注册码？"
                  @confirm="deleteCode(scope.$index,scope.row.id)"
              >
                <template #reference>
                  <el-button
                      link
                      type="primary"
                      size="small"
                  >
                    删除注册码
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
          <el-table-column label="操作2" width="120">
            <template #default="scope">
              <el-popconfirm
                  title="确定生成注册码？"
                  @confirm="createCode(scope.$index,scope.row.id)"
              >
                <template #reference>
                  <el-button
                      link
                      type="primary"
                      size="small"
                  >
                    生成注册码
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {createInvite, deleteInvite, getAllClassCodeInfo} from "@/api/administrator";
import {ElMessage} from "element-plus";

export default {
  name: "AddStudentView",
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

    this.search()

  },
  data() {
    return {
      inputSearch: "",
      currentPage: 1,
      pageSize: 8,
      total: 0,
      classList: []
    }
  },
  methods: {
    search() {
      getAllClassCodeInfo(this.inputSearch, this.currentPage, this.pageSize)
          .then(resp => {
            console.log(resp)
            this.classList = resp.data
            this.total = resp.total
          })
    },
    deleteCode(index, id) {
      deleteInvite(id)
          .then(resp => {
            if (resp.code === 200) {
              ElMessage({
                message: "删除成功",
                showClose: true,
                grouping: true,
                type: "success"
              })
              location.reload()
            } else {
              ElMessage({
                message: "删除失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
    },
    createCode(index, id) {
      createInvite(id)
          .then(resp => {
            if (resp.code === 200) {
              ElMessage({
                message: "创建成功",
                showClose: true,
                grouping: true,
                type: "success"
              })
              location.reload()
            } else {
              ElMessage({
                message: "创建失败",
                showClose: true,
                grouping: true,
                type: "error"
              })
            }
          })
      console.log("创建注册码" + id)
    },
    handleCurrentChange(page) {
      this.$router.push("/professional/add_student/" + page)
      this.currentPage = page
      this.search()
    },
    submit() {
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

.m-2 {
  height: 28px;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
}

.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 32px;
}

</style>
