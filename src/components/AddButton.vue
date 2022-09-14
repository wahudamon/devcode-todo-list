<template>
  <button
    data-cy="add-activity-button"
    class="px-8 py-3 rounded-3xl text-white text-lg font-medium add-button"
  >
    <span class="icon-plus"></span>
    Tambah
  </button>
</template>

<script>
export default {
  name: "AddButton",
};
</script>

<style lang="scss">
@import "@/assets/icons/icons";

.add-button {
  background: #16abf8;
}
</style>
