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
import Aside from "@/components/professional/Aside";
import Header from "@/components/professional/Header";

export default {
  name: "ProfessionalLayout",
  components: {
    Aside,
    Header
  }
}
</script>

<style scoped>

</style>
