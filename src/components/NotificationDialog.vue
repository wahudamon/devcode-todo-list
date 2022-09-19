<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <div
        v-if="isShow"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
      >
        <div class="w-2/5 h-16 p-6 bg-white rounded-xl shadow-xl">
          <div class="flex gap-2">
            <span
              data-cy="modal-information-icon"
              class="ml-1 icon_info"
            ></span>
            <p data-cy="modal-information-text" class="text-md">
              Activity berhasil dihapus!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "NotificationDialog",
  data() {
    return {
      isShow: false,
    };
  },
  computed: mapGetters({
    showNotificationDialog: "showNotificationDialog",
  }),
  watch: {
    showNotificationDialog(val) {
      this.isShow = val;
    },
  },
  methods: {
    toggleDialog(value) {
      store.dispatch("toggleNotificationDialog", { value });
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/icons/icons";
</style>
