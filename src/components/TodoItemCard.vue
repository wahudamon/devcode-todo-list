<template>
  <div class="w-full h-full p-4 rounded-xl todo-item-card">
    <div class="flex justify-between todo-item-card_body">
      <div class="flex gap-4">
        <input
          data-cy="todo-item-checkbox"
          class="cursor-pointer"
          type="checkbox"
          value="completed"
        />
        <div data-cy="todo-item-priority-indicator">
          <div
            v-if="todoItem.priority === 'very-high'"
            class="mt-2 w-2 h-2 rounded-full"
            style="background: #ed4c5c"
          ></div>
          <div
            v-else-if="todoItem.priority === 'high'"
            class="mt-2 w-2 h-2 rounded-full"
            style="background: #ffce31"
          ></div>
          <div
            v-else-if="todoItem.priority === 'normal'"
            class="mt-2 w-2 h-2 rounded-full"
            style="background: #00a790"
          ></div>
          <div
            v-else-if="todoItem.priority === 'low'"
            class="mt-2 w-2 h-2 rounded-full"
            style="background: #43c4e3"
          ></div>
          <div
            v-else-if="todoItem.priority === 'very-low'"
            class="mt-2 w-2 h-2 rounded-full"
            style="background: #b01aff"
          ></div>
        </div>
        <p data-cy="todo-item-card-title" class="text-md font-normal">
          {{
            todoItem.title?.length > 40
              ? `${todoItem.title.slice(0, 40)}...`
              : todoItem.title
          }}
        </p>
        <div data-cy="todo-item-edit-button" class="icon-edit-todo-item"></div>
      </div>
      <button data-cy="activity-card-delete-button" @click="removeTodoItem">
        <span class="icon-delete-activity-item"></span>
      </button>
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
    return {};
  },
  methods: {
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
