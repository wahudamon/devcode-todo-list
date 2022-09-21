<template>
  <div class="w-full h-full p-4 rounded-xl todo-item-card">
    <div class="flex justify-between todo-item-card_body">
      <div class="flex gap-4">
        <div>
          <input
            v-model="todoCheckbox"
            data-cy="todo-item-checkbox"
            class="mt-1.5 w-4 h-4 cursor-pointer"
            type="checkbox"
          />
        </div>
        <div>
          <div
            data-cy="todo-item-priority-indicator"
            class="mt-2 w-3 h-3 rounded-full"
            :style="{ background: priorityColor[todoItem.priority] }"
          ></div>
        </div>
        <div v-if="todoItem.is_active === 1" class="text-lg font-normal">
          <p data-cy="todo-item-title">{{ setRenderLimit(todoItem.title) }}</p>
        </div>
        <div
          v-else-if="todoItem.is_active === 0"
          class="text-lg font-normal line-through"
          style="color: #888888"
        >
          <p data-cy="todo-item-title">{{ setRenderLimit(todoItem.title) }}</p>
        </div>
        <div
          data-cy="todo-item-edit-button"
          class="mt-0.5 cursor-pointer icon-edit-todo-item"
          @click="toggleInputDialog(true)"
        ></div>
      </div>
      <div>
        <button
          data-cy="todo-item-delete-button"
          @click="toggleConfirmDialog(true)"
        >
          <span class="icon-delete-activity-item"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "TodoItemCard",
  props: {
    todoItem: Object,
  },
  data() {
    return {
      selectedTodoData: {},
      todoCheckbox: this.todoItem.is_active === 1 ? false : true,
      priorityColor: {
        "very-high": "#ed4c5c",
        high: "#ffce31",
        normal: "#00a790",
        low: "#43c4e3",
        "very-low": "#b01aff",
      },
    };
  },
  watch: {
    todoCheckbox() {
      this.updateTodoItemStatus();
    },
  },
  methods: {
    setRenderLimit(data) {
      return data?.length > 40 ? `${data.slice(0, 40)}...` : data;
    },
    toggleConfirmDialog(value) {
      store.dispatch("setSelectedItem", {
        type: "list item",
        id: this.todoItem.id,
        title: this.todoItem.title,
      });
      store.dispatch("toggleConfirmDialog", { value });
    },
    toggleInputDialog(value) {
      this.$emit("get-todo-detail", this.todoItem.id);
      store.dispatch("setInputMode", {
        data: "edit",
      });
      store.dispatch("toggleInputDialog", { value });
    },
    async detailTodoItem() {
      try {
        this.selectedTodoData = await store.dispatch("newDetailTodo", {
          id: this.todoItem.id,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async updateTodoItemStatus() {
      try {
        await store.dispatch("updateTodoItem", {
          id: this.todoItem.id,
          is_active: this.todoCheckbox ? 0 : 1,
        });
        this.$parent.loadDetailActivity();
      } catch (err) {
        console.log(err);
      }
    },
    async removeTodoItem() {
      try {
        await store.dispatch("removeTodoItem", { id: this.todoItem.id });
        this.$parent.loadDetailActivity();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/icons/icons";

.todo-item-card {
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
}
</style>
