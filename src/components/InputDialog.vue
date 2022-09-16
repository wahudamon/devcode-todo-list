<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <div
        v-show="isShow"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
      >
        <div class="w-2/5 h-2/5 pt-6 px-6 bg-white rounded-md shadow-xl">
          <div
            data-cy="todo-input-dialog-header"
            class="flex items-center justify-between"
          >
            <h3 data-cy="todo-input-dialog-title" class="text-2xl">
              Tambah List Item
            </h3>
            <svg
              data-cy="todo-input-dialog-close-button"
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
          <div data-cy="todo-input-dialog-body" class="mt-4">
            <div>
              <label data-cy="todo-input-title-label" class="mb-4 text-sm"
                >Nama List Item</label
              >
            </div>
            <div>
              <input
                data-cy="todo-input-title-box"
                v-model="input.title"
                class="h-4/5 w-3/5 p-1 bg-inherit border-2 border-gray-700 rounded-md text-md focus:outline-none"
                type="text"
              />
            </div>
            <div class="mt-4">
              <label data-cy="todo-input-priority-label" class="mb-4 text-sm"
                >Prioritas</label
              >
            </div>
            <div>
              <input
                data-cy="todo-input-priority-box"
                v-model="input.title"
                class="h-4/5 w-3/5 p-1 bg-inherit border-2 border-gray-700 rounded-md text-md focus:outline-none"
                type="text"
              />
            </div>
          </div>
          <div
            data-cy="todo-input-dialog-footer"
            class="flex justify-end pt-12"
          >
            <button
              data-cy="todo-item-submit-button"
              :disabled="input.title === ''"
              class="px-6 py-2 text-white rounded-full"
              style="background: #16abf8"
              @click="addNewTodoItem"
            >
              Simpan
            </button>
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
  name: "InputDialog",
  data() {
    return {
      isShow: false,
      input: {
        title: "",
        priority: "low",
      },
    };
  },
  computed: mapGetters({
    showInputDialog: "showInputDialog",
  }),
  watch: {
    showInputDialog(val) {
      this.isShow = val;
    },
  },
  methods: {
    toggleDialog(value) {
      store.dispatch("toggleInputDialog", { value });
    },
    async addNewTodoItem() {
      try {
        await store.dispatch("addNewTodoItem", {
          activity_group_id: this.$route.params.id,
          title: "Boleh juga",
          priority: "high",
        });
        this.toggleDialog(false);
        this.$parent.loadDetailActivity();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss">
.container {
  z-index: 99 !important;
}
</style>
