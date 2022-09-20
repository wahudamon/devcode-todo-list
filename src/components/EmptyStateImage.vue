<template>
  <div>
    <img
      v-if="pageName === 'home'"
      class="w-4/5 h-4/5"
      src="@/assets/illustrations/activity-empty-state.svg"
      alt="empty state"
    />
    <img
      v-if="pageName === 'activity-detail'"
      class="w-4/5 h-4/5"
      src="@/assets/illustrations/todo-empty-state.svg"
      alt="empty state"
    />
  </div>
</template>

<script>
export default {
  name: "EmptyStateImage",
  props: {
    pageName: String,
  },
};
</script>

<style></style>
