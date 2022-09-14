<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: { NavBar },
};
</script>

<style lang="scss"></style>
