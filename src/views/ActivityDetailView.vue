<template>
  <div class="activity-detail">
    <div class="mt-10 mx-56">
      <div data-cy="todo-header" class="flex justify-between">
        <div class="flex gap-4">
          <span
            data-cy="todo-back-button"
            class="icon-back"
            @click="$router.push('/')"
          ></span>
          <h1
            v-if="!showInputText"
            data-cy="todo-title"
            class="text-4xl font-bold"
            @click="updateTitle"
          >
            {{
              activityDetailData.title?.length > 20
                ? `${activityDetailData.title.slice(0, 20)}...`
                : activityDetailData.title
            }}
          </h1>
          <input
            v-show="showInputText"
            v-model="inputTextValue"
            class="h-4/5 w-4/5 bg-inherit text-3xl font-bold focus:outline-none todo-title__input"
            ref="todoTitleInput"
            type="text"
            @blur="updateTitle"
          />
          <div
            data-cy="todo-title-edit-button"
            @click="updateTitle"
            class="mt-2 icon-edit-title"
          ></div>
        </div>
        <div class="flex gap-4">
          <todo-sort-combobox @load-detail-act="loadDetailActivity" />
          <add-button
            data-cy="todo-add-button"
            class="add-todo__button"
            :disabled="activityDetailData?.todo_items?.length === todosData.limit"
            :clickEvent="toggleInputDialog"
          />
        </div>
      </div>
      <div class="mt-8">
        <div
          data-cy="todo-item-list"
          v-if="activityDetailData.todo_items?.length !== 0"
          class="flex flex-col flex-wrap gap-4 justify-center"
        >
          <todo-item-card
            v-for="todoItem in activityDetailData.todo_items"
            data-cy="todo-item"
            :key="todoItem.id"
            :todoItem="todoItem"
            @get-todo-detail="detailTodoItem"
          />
        </div>
        <empty-state-image
          v-else
          data-cy="todo-empty-state"
          pageName="activity-detail"
        />
      </div>
    </div>
    <input-dialog
      data-cy="modal-add"
      :inputMode="inputMode"
      :selectedTodo="selectedTodo"
    />
    <confirm-dialog data-cy="modal-delete" />
    <notification-dialog data-cy="modal-information" deletedItem="List Item" />
  </div>
</template>

<script>
import AddButton from "@/components/AddButton.vue"
import EmptyStateImage from "@/components/EmptyStateImage.vue";
import TodoItemCard from "@/components/TodoItemCard.vue";
import TodoSortCombobox from "@/components/TodoSortCombobox.vue";
import InputDialog from "@/components/InputDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import NotificationDialog from "@/components/NotificationDialog.vue";

import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "ActivityDetailView",

  components: {
    TodoItemCard,
    AddButton,
    EmptyStateImage,
    InputDialog,
    ConfirmDialog,
    NotificationDialog,
    TodoSortCombobox,
  },

  data() {
    return {
      selectedTodo: {},
      activityDetailData: {},
      todosData: {},
      showInputText: false,
      inputTextValue: "",
      showDialog: false,
    };
  },

  computed: mapGetters({
    inputMode: "inputMode",
  }),

  mounted() {
    this.loadDetailActivity("newest");
  },

  methods: {
    toggleInputDialog(value) {
      store.dispatch("setInputMode", {
        data: "add",
      });
      store.dispatch("toggleInputDialog", { value });
    },
    resetSelectedTodo() {
      this.selectedTodo = {};
    },
    sortTodoList(selection, data) {
      switch (selection) {
        case "newest":
          data.todo_items.sort((a, b) => {
            const orderA = a.id;
            const orderB = b.id;

            if (orderA > orderB) {
              return -1;
            }
            if (orderA < orderB) {
              return 1;
            }

            return 0;
          });
          break;
        case "oldest":
          data.todo_items.sort((a, b) => {
            const orderA = a.id;
            const orderB = b.id;

            if (orderA < orderB) {
              return -1;
            }
            if (orderA > orderB) {
              return 1;
            }

            return 0;
          });
          break;
        case "ascending":
          data.todo_items.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;
          });
          break;
        case "descending":
          data.todo_items.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA > titleB) {
              return -1;
            }
            if (titleA < titleB) {
              return 1;
            }
            return 0;
          });
          break;
        case "not-done":
          data.todo_items.sort((a, b) => {
            const statusA = a.is_active;
            const statusB = b.is_active;

            if (statusA > statusB) {
              return -1;
            }
            if (statusA < statusB) {
              return 1;
            }

            return 0;
          });
          break;
        default:
          return true;
      }
    },
    async loadDetailActivity(sortType) {
      try {
        this.activityDetailData = await store.dispatch("detailActivity", {
          id: this.$route.params.id,
        });
        this.loadTodos();
        this.sortTodoList(sortType, this.activityDetailData);
      } catch (err) {
        console.log(err);
      }
    },
    async loadTodos() {
      try {
        this.todosData = await store.dispatch("getTodos", {
          id: this.$route.params.id,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async detailTodoItem(id) {
      try {
        this.selectedTodo = await store.dispatch("detailTodo", {
          id,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async updateTitle() {
      if (this.showInputText) {
        try {
          await store.dispatch("updateActivity", {
            id: this.$route.params.id,
            title: this.inputTextValue,
          });
          this.loadDetailActivity("newest");
          this.showInputText = false;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.inputTextValue = this.activityDetailData?.title;
        this.showInputText = true;
        this.$nextTick(() => {
          this.$refs.todoTitleInput.focus();
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/icons/icons";

.todo-title {
  &__input {
    border-bottom: 1px solid black;
  }
}

.todo-sort {
  &__button {
    border: 1px solid #d5d5d5;
    border-radius: 50%;
  }
}

.add-todo {
  &__button {
    background: #16abf8;

    &:disabled {
      opacity: 0.2;
    }
  }
}
</style>
