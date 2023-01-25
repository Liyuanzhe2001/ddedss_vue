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
import Header from "@/components/student/Header";
import Aside from "@/components/student/Aside";

export default {
  name: "StudentLayout",
  components: {
    Header,
    Aside,
  }

}
</script>

<style scoped>

</style>
