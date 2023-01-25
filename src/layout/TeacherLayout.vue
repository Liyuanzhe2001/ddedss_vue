<template>
  <div>
    <!--    头部-->
    <Header/>
    <!--侧边栏-->
    <div style="display: inline-block;float: left">
      <Aside/>
    </div>
    <!--主要内容-->
    <div style="display: inline-block;">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/teacher/Header";
import Aside from "@/components/teacher/Aside";

export default {
  name: "TeacherLayout",
  components: {
    Header,
    Aside,
  }

}
</script>

<style scoped>

</style>
