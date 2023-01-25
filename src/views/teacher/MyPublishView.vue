<template>
  <div class="main_part">
    <div class="text">
      <div v-for="i in knowledgeList" v-bind="i">
        <span
            v-text="i.title.length<50?i.title:(i.title.substring(0,50)+'...')"
            @click="jumpUrl(i.id)"
        />
        <el-popconfirm
            @confirm="confirmDelete(i.id)"
            @cancel="cancelDelete()"
            title="确认删除?"
        >
          <template #reference>
            <el-icon class="icon_part">
              <Delete/>
            </el-icon>
          </template>
        </el-popconfirm>
        <el-divider/>
      </div>
      <el-pagination
          layout="prev, pager, next"
          :current-page="page.current"
          :page-size="page.size"
          :total="page.total"
          @current-change="handleCurrentChange"
      />
    </div>


  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "MyPublishView",
  mounted() {
    // TODO 分页 查询知识
    this.getKnowledge()

    // TODO 查询知识总条数
    this.page.total = 10
  },
  data() {
    return {
      page: {
        size: 5,
        current: 1,
        total: 10,
      },
      knowledgeList: []
    }
  },
  methods: {
    getKnowledge(){
      // TODO 分页查询知识 this.page.current

      this.knowledgeList = [
        {
          id: 1,
          title: "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
        },
        {
          id: 2,
          title: "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
        },
        {
          id: 3,
          title: "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
        },
        {
          id: 4,
          title: "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
        },
        {
          id: 5,
          title: "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
        }
      ]
    },
    handleCurrentChange(page) {
      console.log(page)
      this.page.current = page
    },
    jumpUrl(id) {
      window.open("./knowledge/" + id)
    },
    confirmDelete(id) {
      ElMessage({
        message: "删除成功",
        type: "success",
      })
    },
    cancelDelete() {

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
  height: 450px
}

.main_part .text {
  margin: 30px;
}

.main_part .text span {
  line-height: 10px;
  cursor: pointer;
}

.main_part .text .icon_part {
  float: right;
  cursor: pointer;
}

</style>
