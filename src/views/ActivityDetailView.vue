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
          <button
            data-cy="todo-sort-button"
            class="px-3 w-14 h-14 todo-sort__button"
          >
            <span class="icon-sort"></span>
          </button>
          <button
            data-cy="todo-add-button"
            class="px-8 py-3 rounded-3xl text-white text-lg font-medium add-button"
            @click="toggleInputDialog"
          >
            <span class="icon-plus"></span>
            Tambah
          </button>
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
import EmptyStateImage from "@/components/EmptyStateImage.vue";
import TodoItemCard from "@/components/TodoItemCard.vue";
import InputDialog from "@/components/InputDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import NotificationDialog from "@/components/NotificationDialog.vue";

import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "ActivityDetailView",

  components: {
    TodoItemCard,
    EmptyStateImage,
    InputDialog,
    ConfirmDialog,
    NotificationDialog,
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

  computed: mapGetters({
    inputMode: "inputMode",
  }),

  mounted() {
    this.loadDetailActivity();
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
    async updateTitle() {
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
</style>
