<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <div
        v-show="isShow"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
      >
        <div class="w-2/5 h-2/5 p-6 bg-white rounded-xl shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Tambah List Item</h3>
            <svg
              @click="toggleDialog(false)"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-red-900 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="mt-4 text-center">
            <p class="mb-4 text-sm">
              Apakah anda yakin menghapus activity "Insert activity name”?
            </p>
            <div class="flex justify-center gap-4">
              <button
                data-cy="confirm-dialog-cancel-button"
                class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
                @click="toggleDialog(false)"
              >
                Batal
              </button>
              <button
                data-cy="confirm-dialog-confirm-button"
                class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
                @click="toggleDialog(false)"
              >
                Simpan
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
  },
};
</script>
