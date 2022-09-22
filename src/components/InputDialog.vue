<template>
  <div data-app>
    <v-dialog
      id="input-dialog"
      v-model="isShow"
      width="700"
      class="overflow-y-clip"
    >
      <v-card
        class="pt-6 px-6 bg-white rounded-md shadow-xl"
        style="height: 400px"
      >
        <v-card-title
          data-cy="todo-input-dialog-header"
          class="flex items-center justify-between"
        >
          <h3
            data-cy="todo-input-dialog-title"
            class="text-2xl font-semibold text-black"
          >
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
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text data-cy="todo-input-dialog-body" class="mt-4 mb-4">
          <div>
            <label
              data-cy="todo-input-title-label"
              class="mb-4 text-lg text-black font-semibold"
              >NAMA LIST ITEM</label
            >
          </div>
          <div data-cy="modal-add-name-input" class="pt-2 pb-3">
            <input
              v-model="input.title"
              class="h-4/5 w-full p-2 bg-inherit border-2 border-solid border-gray-300 rounded-md text-md text-black focus:outline-none focus:border-blue-300"
              type="text"
              placeholder="Tambahkan nama list item"
            />
          </div>
          <div class="mt-4">
            <label
              data-cy="todo-input-priority-label"
              class="mb-4 text-lg text-black font-semibold"
              >PRIORITAS</label
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
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="flex justify-end pt-12">
          <button
            data-cy="modal-add-save-button"
            :disabled="!input.title"
            class="px-6 py-2 text-white rounded-full submit-button"
            @click="onClickSubmit"
          >
            Simpan
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        this.$parent.loadDetailActivity("newest");
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
        this.$parent.loadDetailActivity("newest");
      } catch (err) {
        console.log(err);
      }

      this.input.title = "";
      this.input.priority = "";
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .v-dialog {
  overflow-y: unset;
}

.submit-button {
  background: #16abf8;

  &:disabled {
    opacity: 0.2;
  }
}
</style>
