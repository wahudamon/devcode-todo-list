<template>
  <div class="home">
    <div class="mt-10 mx-56">
      <div class="flex justify-between">
        <h2 data-cy="activity-title" class="text-4xl font-bold">Activity</h2>
        <add-button />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddButton from "@/components/AddButton.vue";

export default {
  name: "HomeView",
  components: { AddButton },
};
</script>
