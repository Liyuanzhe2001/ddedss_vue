<template>
  <div class="main_part">
    <el-form
        class="form_part"
        :model="professionalInfo"
        label-width="120px"
        label-position="top"
        size="default"
    >
      <el-form-item label="工号">
        <el-input v-model="professionalInfo.number"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="professionalInfo.name"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="professionalInfo.email"/>
      </el-form-item>
      <el-button class="btn" round type="primary">
        创建
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddProfessionalView",
  data() {
    return {
      professionalInfo: {
        number: '',
        name: '',
        email: '',
      }
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

.main_part .form_part {
  width: 870px;
  margin: 20px auto;
}

.main_part .form_part .btn {
  width: 140px;
  height: 40px;
  font-size: 17px;
  margin-top: 80px;
}


</style>
