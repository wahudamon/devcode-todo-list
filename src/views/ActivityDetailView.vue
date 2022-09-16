<template>
  <div class="activity-detail">
    <input-dialog :showDialog="showDialog" />
    <div class="mt-10 mx-56">
      <div class="flex justify-between">
        <div class="flex gap-4">
          <span class="icon-back" @click="$router.push('/')"></span>
          <h2 data-cy="activity-detail-title" class="text-4xl font-bold">
            {{ activityDetailData.title }}
          </h2>
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
          <add-button :clickEvent="toggleDialog" />
        </div>
      </div>
      <div class="mt-8">
        <div
          data-cy="todo-item-list"
          v-if="activityDetailData.todo_items?.length !== 0"
          class="flex flex-col flex-wrap gap-4 justify-center"
        >
          <todo-item-card />
          <todo-item-card />
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

import store from "@/store";

export default {
  name: "ActivityDetailView",

  components: { AddButton, TodoItemCard, EmptyStateImage, InputDialog },

  data() {
    return {
      baseUrl: "https://todo.api.devcode.gethired.id",
      userEmail: "dururu@gmail.com",
      activityDetailData: {},
      showDialog: false,
    };
  },

  mounted() {
    this.loadDetailActivity();
  },

  methods: {
    toggleDialog() {
      this.showDialog = !this.showDialog;
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
    async changeActivityTitle() {
      try {
        await store.dispatch("updateActivity", {
          id: this.$route.params.id,
          title: "Betul Banget",
        });
        this.loadDetailActivity();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/icons/icons";
</style>
