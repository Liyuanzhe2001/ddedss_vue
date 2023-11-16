<template>
  <div style="min-width: 1000px">
    <!--    头部-->
    <Header/>
    <!--侧边栏-->
    <Aside/>
    <!--主要内容-->
    <router-view v-if="isRouterAlive"/>
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
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
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
