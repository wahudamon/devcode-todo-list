<template>
  <div
    data-cy="todo-item-card"
    class="w-full h-full p-4 rounded-xl todo-item-card"
  >
    <div class="flex justify-between todo-item-card_body">
      <div class="flex gap-4">
        <input
          data-cy="todo-item-checkbox"
          class="cursor-pointer"
          type="checkbox"
          value="completed"
        />
        <div
          data-cy="todo-item-priority-indicator"
          class="mt-2 w-2 h-2 rounded-full bg-red-600"
        ></div>
        <p data-cy="todo-item-card-title" class="text-md font-normal">
          Minyak Goreng Cap Bimoli
        </p>
        <div data-cy="todo-item-edit-button" class="icon-edit-todo-item"></div>
      </div>
      <button data-cy="activity-card-delete-button">
        <span class="icon-delete-activity-item"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItemCard",
};
</script>

<style lang="scss">
@import "@/assets/icons/icons";

.todo-item-card {
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
}
</style>
