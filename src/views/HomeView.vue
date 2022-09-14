<template>
  <div class="home">
    <div class="mt-10 mx-56">
      <div class="flex justify-between">
        <h2 data-cy="activity-title" class="text-4xl font-bold">Activity</h2>
        <add-button />
      </div>
      <div class="mt-8">
        <div
          data-cy="activity-card-list"
          class="flex flex-wrap gap-4 justify-center"
        >
          <activity-card />
          <activity-card />
          <activity-card />
          <activity-card />
          <activity-card />
          <activity-card />
          <activity-card />
          <activity-card />
        </div>
        <!-- <empty-state-image /> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddButton from "@/components/AddButton.vue";
// import EmptyStateImage from "@/components/EmptyStateImage.vue";
import ActivityCard from "@/components/ActivityCard.vue";

export default {
  name: "HomeView",
  components: { AddButton, ActivityCard },
};
</script>
