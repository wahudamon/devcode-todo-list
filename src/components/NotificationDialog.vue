<template>
  <div data-app class="flex justify-center">
    <v-dialog v-model="isShow" width="500">
      <div class="p-3 h-12 bg-white rounded-xl shadow-xl">
        <div class="flex gap-2">
          <span data-cy="modal-information-icon" class="ml-1 icon_info"></span>
          <p data-cy="modal-information-text" class="text-md">
            {{ deletedItem }} berhasil dihapus!
          </p>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "NotificationDialog",
  props: {
    deletedItem: String,
  },
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
