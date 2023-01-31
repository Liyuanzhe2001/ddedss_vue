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
