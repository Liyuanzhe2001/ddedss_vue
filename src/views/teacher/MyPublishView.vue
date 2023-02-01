<template>
  <div class="main_part">
    <div class="text">
      <div v-for="i in knowledgeList" v-bind="i">
        <span
            v-text="i.title.length<50?i.title:(i.title.substring(0,50)+'...')"
            @click="jumpUrl(i.knowledgeId)"
        />
        <el-popconfirm
            @confirm="confirmDelete(i.knowledgeId)"
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
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange"
      />
    </div>


  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import request from "@/utils/request";

export default {
  name: "MyPublishView",
  mounted() {
    // TODO 分页 查询知识
    this.getKnowledge()
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 10,
      knowledgeList: []
    }
  },
  methods: {
    getKnowledge() {
      // TODO 分页查询知识 this.page.current
      request
          .get("/knowledge/query_knowledge_list_by_id", {
            "currentPage": this.currentPage,
            "pageSize": this.pageSize,
          })
          .then(resp => {
            console.log(resp)
          })

      this.total = 10
      this.knowledgeList = [
        {
          knowledgeId: 1,
          title: "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
        },
        {
          knowledgeId: 2,
          title: "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
        },
        {
          knowledgeId: 3,
          title: "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
        },
        {
          knowledgeId: 4,
          title: "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
        },
        {
          knowledgeId: 5,
          title: "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十",
        }
      ]
    },
    handleCurrentChange(page) {
      this.$router.push("/teacher/my_publish/" + page)
      this.currentPage = page
    },
    jumpUrl(knowledgeId) {
      window.open("/knowledge/" + knowledgeId)
    },
    confirmDelete(knowledgeId) {
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
