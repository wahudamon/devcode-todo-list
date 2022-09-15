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
          v-if="activityData.total !== 0"
          class="flex flex-wrap gap-4 justify-start"
        >
          <activity-card
            v-for="activity in activityData.data"
            :key="activity.id"
            :title="activity.title"
            :date="activity.created_at"
          />
        </div>
        <empty-state-image v-else pageName="home" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddButton from "@/components/AddButton.vue";
import EmptyStateImage from "@/components/EmptyStateImage.vue";
import ActivityCard from "@/components/ActivityCard.vue";

import axios from "axios";

export default {
  name: "HomeView",
  components: { AddButton, EmptyStateImage, ActivityCard },
  data() {
    return {
      baseUrl: "https://todo.api.devcode.gethired.id/",
      userEmail: "yoga%2B1%40skyshi.io",
      activityData: {},
    };
  },
  mounted() {
    this.loadActivity();
  },
  methods: {
    async loadActivity() {
      try {
        let response = await axios.get(`${this.baseUrl}activity-groups`, {
          params: {
            email: this.userEmail,
          },
        });

        console.log(response.data);
        this.activityData = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
