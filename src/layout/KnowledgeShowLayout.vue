<template>
  <el-backtop :right="100" :bottom="100"/>
  <div class="main_part">
    <div class="title_part">
      {{ title }}
    </div>

    <div class="author_part">
      {{ teacherName }}
    </div>

    <div class="tags_part">
      <el-tag
          v-for="tag in tags"
          style="font-size:15px;margin-right: 7px"
      >
        {{ tag }}
      </el-tag>
    </div>

    <div class="content_part">
      {{ content }}
    </div>
  </div>
</template>

<script>
import userRequest from "@/utils/userRequest";

export default {
  name: "KnowledgeShowLayout",
  mounted() {
    const knowledgeId = this.$route.params.id
    userRequest
        .get(`/knowledge/queryKnowledgeById/${knowledgeId}`)
        .then(resp => {
          this.title = resp.data.knowledgeTitle
          this.teacherName = resp.data.teacherName
          this.tags = resp.data.tags
          this.content = resp.data.content
        })
  },
  data() {
    return {
      title: "",
      teacherName: "",
      tags: [],
      content: ""
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
  width: auto;
  margin: 20px auto;
  text-align: left;
}

.main_part .title_part {
  display: inline-block;
  margin-top: 20px;
  margin-left: 30px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 28px;
  font-weight: bold;
  border-bottom: solid 1px gray;
}

.main_part .author_part {
  margin-top: 20px;
  margin-left: 30px;
  font-size: 15px;
}

.main_part .tags_part {
  margin-top: 10px;
  margin-left: 30px;
}

.main_part .content_part {
  margin: 10px 30px 30px;
  padding: 10px;
  font-size: 17px;
  line-height: 25px;
  border-radius: 10px;
  white-space: pre-wrap;
  border: solid 1px black;
}

</style>
