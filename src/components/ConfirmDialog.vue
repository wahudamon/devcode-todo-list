<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <div
        v-show="isShow"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
      >
        <div class="w-2/5 h-2/5 p-6 bg-white rounded-xl shadow-xl">
          <div class="flex items-center justify-center">
            <span data-cy="confirm-dialog-icon" class="icon-danger-md"></span>
          </div>
          <div class="mt-4 text-center">
            <p data-cy="confirm-dialog-text" class="mb-4 text-lg">
              Apakah anda yakin menghapus {{ selectedItem.type }} <br />
              <span class="font-bold">{{
                selectedItem.title?.length > 20
                  ? `"${selectedItem.title.slice(0, 20)}..."`
                  : `"${selectedItem.title}"`
              }}</span
              >?
            </p>
            <div class="flex justify-center gap-4">
              <button
                data-cy="confirm-dialog-cancel-button"
                class="px-6 py-2 rounded-full btn-cancel"
                @click="toggleDialog(false)"
              >
                Batal
              </button>
              <button
                data-cy="confirm-dialog-confirm-button"
                class="px-6 py-2 rounded-full btn-confirm"
                @click="removeItem"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "ConfirmDialog",
  data() {
    return {
      isShow: false,
    };
  },
  computed: mapGetters({
    showConfirmDialog: "showConfirmDialog",
    selectedItem: "selectedItem",
  }),
  watch: {
    showConfirmDialog(val) {
      this.isShow = val;
    },
  },
  methods: {
    toggleDialog(value) {
      store.dispatch("toggleConfirmDialog", { value });
    },
    async removeItem() {
      if (this.selectedItem.type === "activity") {
        try {
          await store.dispatch("removeActivity", { id: this.selectedItem.id });

          this.$parent.loadActivity();
          this.toggleDialog(false);
          store.dispatch("toggleNotificationDialog", { value: true });
          setTimeout(
            () => store.dispatch("toggleNotificationDialog", { value: false }),
            2000
          );
        } catch (err) {
          console.log(err);
        }
      } else if (this.selectedItem.type === "list item") {
        try {
          await store.dispatch("removeTodoItem", { id: this.selectedItem.id });

          this.$parent.loadDetailActivity();
          this.toggleDialog(false);
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/icons/icons";

.btn {
  &-cancel {
    background: #f4f4f4;
    color: #4a4a4a;
  }
  &-confirm {
    background: #ed4c5c;
    color: #ffffff;
  }
}
</style>
