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

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,500;0,700;1,300;1,500;1,700&display=swap");

body {
  font-family: "Poppins", sans-serif;
  height: "100%";
}
</style>
