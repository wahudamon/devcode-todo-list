<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <div
        v-show="isOpen"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
      >
        <div class="w-3/5 h-3/5 p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Activity berhasil dihapus</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotificationDialog",
  props: {
    showDialog: Boolean,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    showDialog(val) {
      this.isOpen = val;
    },
  },
};
</script>
