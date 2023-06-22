<template>
  <div class="main_part">
    <div class="form_part">
      <div class="title_part">
        <label for="title">标题</label>
        <el-input
            class="title_input"
            id="title"
            v-model="form.title"/>
      </div>
      <div class="content_part">
        <label for="content">正文</label>
        <el-input
            id="content"
            class="content_input"
            v-model="form.content"
            :rows="7"
            type="textarea"
            resize="none"
        />
      </div>
      <div class="tag_part">
        <label>标签</label>
        <el-tag
            style="margin-right: 5px"
            v-for="tag in dynamicTags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            style="width: 80px;height: 20px;margin-right: 5px;"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
        />
        <el-button
            v-else
            style="margin-right: 5px;height: 20px;width: 80px"
            size="small"
            @click="showInput">
          +
        </el-button>
      </div>
      <el-button class="submit_btn" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {addKnowledge} from "@/api/teacher";

export default {
  name: "PublishKnowledgeView",
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
      case '2':
        this.$router.push('/professional')
        return
      case '3':
        this.$route.push("/admin")
        return
    }
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        tags: "",
      },
      inputValue: "",
      dynamicTags: [],
      inputVisible: false,
      InputRef: '',
    }
  },
  methods: {
    // 删除标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    // 点击标签加号
    showInput() {
      this.inputVisible = true
    },
    // 确定标签
    handleInputConfirm() {
      if (this.inputValue) {
        this.dynamicTags.push(this.inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 提交发布知识
    submit() {
      this.form.tags = this.dynamicTags.join(",");
      addKnowledge(this.form)
          .then(resp => {
            if (resp.code === 200) {
              ElMessage({
                message: "知识创建成功",
                showClose: true,
                grouping: true,
                type: "success"
              })
              this.form = {
                title: "",
                content: "",
                tags: "",
              }
              this.dynamicTags = []
            } else {
              ElMessage({
                message: "知识创建失败",
                showClose: true,
                grouping: true,
                type: "success"
              })
            }
          })
    }
  }
}
</script>

<style scoped>
.main_part {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  width: 840px;
  margin: 20px auto 0;
  text-align: left;
  height: 450px;
}

label {
  display: block;
  margin-left: 2px;
  font-size: 17px;
  padding-bottom: 10px;
}

.main_part .form_part {
  width: auto;
  height: 420px;
  margin: 15px;
}

.main_part .title_part {
  height: 70px;
  width: auto;
  padding-left: 20px;
}

.main_part .title_part .title_input {
  width: 100%;
  height: 30px;
  font-size: 20px;
}

.main_part .content_part {
  height: 230px;
  padding-left: 20px;
  padding-top: 10px;
}

.main_part .content_part .content_input {
  font-size: 17px;
}

.main_part .tag_part {
  height: 60px;
  padding-left: 20px;
  padding-top: 10px;
}

.submit_btn {
  width: 80px;
  height: 30px;
  float: right;
  margin-right: 30px;
}

</style>
