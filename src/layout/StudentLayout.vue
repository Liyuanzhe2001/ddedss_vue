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
      <router-view v-if="isRouterAlive"/>
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
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }

}
</script>

<style scoped>

</style>
