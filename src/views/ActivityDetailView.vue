<template>
  <div class="activity-detail">
    <input-dialog
      data-cy="todo-item-input-dialog"
      :selectedTodo="selectedTodo"
    />
    <confirm-dialog data-cy="todo-delete-confirm-dialog" />
    <div class="mt-10 mx-56">
      <div class="flex justify-between">
        <div class="flex gap-4">
          <span class="icon-back" @click="$router.push('/')"></span>
          <h2
            v-if="!showInputText"
            data-cy="activity-detail-title"
            class="text-4xl font-bold"
          >
            {{
              activityDetailData.title?.length > 20
                ? `${activityDetailData.title.slice(0, 20)}...`
                : activityDetailData.title
            }}
          </h2>
          <input
            v-else-if="showInputText"
            data-cy="activity-title-input-text"
            v-model="inputTextValue"
            class="h-4/5 w-4/5 bg-inherit border-b-2 border-gray-700 text-3xl font-bold focus:outline-none"
            type="text"
            name="activityTitle"
          />
          <span
            data-cy="edit-activity-title-button"
            @click="changeActivityTitle"
            class="mt-2 icon-edit-title"
          ></span>
        </div>
        <div class="flex gap-4">
          <button class="px-3 border border-gray-300 rounded-full">
            <span class="icon-sort"></span>
          </button>
          <add-button
            data-cy="todo-add-button"
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
            data-cy="todo-item-card"
            :key="todoItem.id"
            :todoItem="todoItem"
            @get-todo-detail="detailTodoItem"
          />
        </div>
        <empty-state-image v-else pageName="activity-detail" />
      </div>
    </div>
  </div>
</template>

<script>
import AddButton from "@/components/AddButton.vue";
import EmptyStateImage from "@/components/EmptyStateImage.vue";
import TodoItemCard from "@/components/TodoItemCard.vue";
import InputDialog from "@/components/InputDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

import store from "@/store";

export default {
  name: "ActivityDetailView",

  components: {
    AddButton,
    TodoItemCard,
    EmptyStateImage,
    InputDialog,
    ConfirmDialog,
  },

  data() {
    return {
      selectedTodo: {},
      activityDetailData: {},
      showInputText: false,
      inputTextValue: "",
      showDialog: false,
    };
  },

  mounted() {
    this.loadDetailActivity();
  },

  methods: {
    toggleInputDialog(value) {
      store.dispatch("toggleInputDialog", { value });
    },
    resetSelectedTodo() {
      this.selectedTodo = {};
    },
    async loadDetailActivity() {
      try {
        this.activityDetailData = await store.dispatch("detailActivity", {
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
    async changeActivityTitle() {
      if (this.showInputText) {
        try {
          await store.dispatch("updateActivity", {
            id: this.$route.params.id,
            title: this.inputTextValue,
          });
          this.loadDetailActivity();
          this.showInputText = false;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.inputTextValue = this.activityDetailData?.title;
        this.showInputText = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/icons/icons";
</style>
