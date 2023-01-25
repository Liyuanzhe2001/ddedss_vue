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
      <el-button class="submit_btn" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublishKnowledgeView",
  data() {
    return {
      form: {
        title: "",
        content: "",
      },
      inputValue: "",
      dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
      inputVisible: false,
      InputRef: '',
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.dynamicTags.push(this.inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
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
  height: 450px;
}

label {
  display: block;
  margin-left: 2px;
  font-size: 17px;
  padding-bottom: 10px;
}

.main_part .form_part {
  width: 910px;
  height: 420px;
  margin: 15px;
}

.main_part .title_part {
  height: 70px;
  padding-left: 20px;
}

.main_part .title_part .title_input {
  width: 870px;
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
  width: 870px;
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
