<template>
  <div class="activity-detail">
    <div class="mt-10 mx-56">
      <div class="flex justify-between">
        <div class="flex gap-4">
          <span class="icon-back" @click="$router.push('/')"></span>
          <h2 data-cy="activity-detail-title" class="text-4xl font-bold">
            New Activity
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
        <empty-state-image />
      </div>
    </div>
  </div>
</template>

<script>
import AddButton from "@/components/AddButton.vue";
import EmptyStateImage from "@/components/EmptyStateImage.vue";

export default {
  name: "ActivityDetailView",
  components: { AddButton, EmptyStateImage },
};
</script>

<style lang="scss">
@import "@/assets/icons/icons";
</style>
