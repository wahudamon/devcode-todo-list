<template>
  <div class="activity-detail">
    <div class="mt-10 mx-56">
      <div class="flex justify-between">
        <div class="flex gap-4">
          <span class="icon-back" @click="$router.push('/')"></span>
          <h2 data-cy="activity-detail-title" class="text-4xl font-bold">
            {{ activityDetailData.title }}
          </h2>
          <span class="mt-2 icon-edit-title"></span>
        </div>
        <div class="flex gap-4">
          <button class="px-3 border border-gray-300 rounded-full">
            <span class="icon-sort"></span>
          </button>
          <add-button />
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

import axios from "axios";

export default {
  name: "ActivityDetailView",
  components: { AddButton, TodoItemCard, EmptyStateImage },
  data() {
    return {
      baseUrl: "https://todo.api.devcode.gethired.id",
      userEmail: "dururu@gmail.com",
      activityDetailData: {},
    };
  },
  mounted() {
    this.loadDetailActivity();
  },
  methods: {
    async loadDetailActivity() {
      try {
        let response = await axios.get(
          `${this.baseUrl}/activity-groups/${this.$route.params.id}`
        );

        console.log(response.data);
        this.activityDetailData = response.data;
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
