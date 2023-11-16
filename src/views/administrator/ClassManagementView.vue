<template>
  <div class="main_part">
    <div class="search_part">
      <el-input
          style="width: 160px;"
          placeholder="输入班级名"
          v-model="searchInput"
      />
      <el-button
          type="primary"
          style="width: 50px;height: 24px;margin-left: 6px"
          @click="getAllClasses"
      >
        搜索
      </el-button>
    </div>
    <el-table class="table_part" :data="classList" style="width: 650px">
      <el-table-column type="index" label="#" width="50"/>
      <el-table-column prop="className" label="班级名" width="120"/>
      <el-table-column prop="grade" label="年级" width="120"/>
      <el-table-column prop="major" label="专业" width="120"/>
      <el-table-column prop="status" label="类型" width="120">
        <template #default="scope">
          <p v-if="scope.row.type===0">
            本科
          </p>
          <p v-else>
            专科
          </p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
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
              title="确定删除班级?"
              @confirm="open(scope.row.classId)"
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
      title="修改班级"
      width="400px"
      @keyup.enter="changeInfo()"
  >
    <label class="class_form_label" for="name">班级名</label>
    <el-input id="name" v-model="classForm.name" style="width: 200px;"/>
    <label class="class_form_label" for="grade">年级</label>
    <el-input id="grade" v-model="classForm.grade" style="width: 200px;"/>
    <label class="class_form_label" for="major">专业</label>
    <el-input id="major" v-model="classForm.major" style="width: 200px;"/>
    <label class="class_form_label" for="major">类型</label>
    <el-input id="major" v-model="classForm.type" style="width: 200px;"/>
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
import {deleteClass, getAllClasses, modifyClass} from "@/api/administrator";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "ClassManagementView",
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
    this.getAllClasses()
  },
  data() {
    return {
      classList: [],
      dialogVisible: false,
      classForm: [],
      searchInput: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    // 获取班级
    getAllClasses() {
      getAllClasses(this.searchInput, this.currentPage, this.pageSize)
          .then(resp => {
            if (resp.code === 200) {
              this.classList = resp.data;
            }
          })
    },
    // 初始化用户信息
    showDialog(index) {
      this.classForm.id = this.classList[index].classId
      this.classForm.name = this.classList[index].className
      this.classForm.grade = this.classList[index].grade
      this.classForm.major = this.classList[index].major
      this.classForm.type = this.classList[index].type === 0 ? "本科" : "专科";
      this.dialogVisible = true
    },
    // 修改用户信息
    changeInfo() {
      var t = this.classForm.type
      this.classForm.type = t === "本科" ? 0 : 1;
      console.log(this.classForm)
      modifyClass(this.classForm)
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
    open(classId) {
      ElMessageBox.confirm(
          '删除后会失去所有相关的课程及用户，确定删除？',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
          }
      )
          .then(() => {
            this.confirmDelete(classId)
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消删除',
            })
          })
    },
    // 确定删除班级
    confirmDelete(classId) {
      deleteClass(classId)
          .then(resp => {
            if (resp.code === 200) {
              ElMessage({
                message: "删除成功",
                showClose: true,
                grouping: true,
                type: "success",
              })
              this.getAllClasses()
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
@media screen and (min-width: 1100px) {
  .main_part {
    display: inline-block;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    width: 840px;
    height: 450px;
    margin: 20px auto 0 220px;
    text-align: left;
    transition: margin-left 0.8s;
  }
}

@media screen and (max-width: 1100px) {
  .main_part {
    display: inline-block;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    width: 840px;
    height: 450px;
    margin: 20px auto 0 64px;
    text-align: left;
    transition: margin-left 0.8s;
  }
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

.class_form_label {
  display: block;
  text-align: left;
  margin-left: 80px;
  margin-bottom: 5px;
  margin-top: 10px;
}

</style>
