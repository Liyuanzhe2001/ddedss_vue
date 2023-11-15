<template>
  <div style="min-width: 1000px">
    <!--    头部-->
    <Header/>
    <!--侧边栏-->
    <Aside/>
    <!--主要内容-->
    <div style="position:relative;left:20px;display: inline-block;">
      <router-view v-if="isRouterAlive"/>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/administrator/Aside";
import Header from "@/components/administrator/Header";

export default {
  name: "AdministratorLayout",
  components: {
    Aside,
    Header,
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
