<template>
  <div data-cy="navbar" class="w-full h-1/5 py-8 navbar">
    <h3 data-cy="header-title" class="ml-32 text-2xl text-white navbar__brand">
      TO DO LIST APP
    </h3>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="scss">
.navbar {
  background-color: #16abf8;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  &__brand {
    font-weight: 700;
  }
}
</style>
