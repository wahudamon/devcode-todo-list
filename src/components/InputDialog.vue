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
              {{ inputMode === "edit" ? "Edit Item" : "Tambah List Item" }}
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
                data-cy="modal-add-name-input"
                v-model="input.title"
                class="h-4/5 w-3/5 p-1 bg-inherit border border-gray-700 rounded-md text-md focus:outline-none"
                type="text"
              />
            </div>
            <div class="mt-4">
              <label data-cy="todo-input-priority-label" class="mb-4 text-sm"
                >Prioritas</label
              >
            </div>
            <div>
              <priority-combobox
                data-cy="modal-add-priority-dropdown"
                :selectedTodoPriority="input.priority"
                :inputMode="inputMode"
                @get-priority="getPriority"
              />
            </div>
          </div>
          <div
            data-cy="todo-input-dialog-footer"
            class="flex justify-end pt-12 submit-button"
          >
            <button
              data-cy="modal-add-save-button"
              :disabled="input.title === ''"
              class="px-6 py-2 text-white rounded-full"
              style="background: #16abf8"
              @click="onClickSubmit"
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

import PriorityCombobox from "@/components/PriorityCombobox.vue";

export default {
  name: "InputDialog",
  components: { PriorityCombobox },
  props: {
    inputMode: String,
    selectedTodo: Object,
  },
  data() {
    return {
      isShow: false,
      input: {
        title: "",
        priority: "",
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
    selectedTodo(val) {
      this.input.title = val.title;
      this.input.priority = val.priority;
    },
  },
  methods: {
    toggleDialog(value) {
      this.$parent.resetSelectedTodo();
      store.dispatch("toggleInputDialog", { value });
    },
    getPriority(value) {
      this.input.priority = value;
    },
    onClickSubmit() {
      if (this.inputMode === "edit") {
        this.updateTodoItem();
      } else {
        this.addNewTodoItem();
      }
    },
    async addNewTodoItem() {
      try {
        await store.dispatch("addNewTodoItem", {
          activity_group_id: this.$route.params.id,
          title: this.input.title,
          priority: this.input.priority,
        });
        this.toggleDialog(false);
        this.$parent.loadDetailActivity();
      } catch (err) {
        console.log(err);
      }

      this.input.title = "";
      this.input.priority = "";
    },
    async updateTodoItem() {
      try {
        await store.dispatch("updateTodoItem", {
          id: this.selectedTodo.id,
          title: this.input.title,
          priority: this.input.priority,
        });

        this.toggleDialog(false);
        this.$parent.loadDetailActivity();
      } catch (err) {
        console.log(err);
      }

      this.input.title = "";
      this.input.priority = "";
    },
  },
};
</script>
<style lang="scss">
.container {
  z-index: 99 !important;
}
</style>
