<template>
  <div class="home">
    <div class="mt-10 mx-56">
      <div class="flex justify-between">
        <h2 data-cy="activity-title" class="text-4xl font-bold">Activity</h2>
        <add-button
          data-cy="activity-add-button"
          :clickEvent="addNewActivity"
        />
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
            :id="activity.id?.toString()"
            :title="activity.title"
            :date="activity.created_at"
            :getActivity="loadActivity"
            data-cy="activity-item"
          />
        </div>
        <empty-state-image
          v-else
          data-cy="activity-empty-state"
          pageName="home"
        />
      </div>
    </div>
    <confirm-dialog data-cy="modal-delete" />
    <notification-dialog data-cy="modal-information" deletedItem="Activity" />
  </div>
</template>

<script>
// @ is an alias to /src
import AddButton from "@/components/AddButton.vue";
import EmptyStateImage from "@/components/EmptyStateImage.vue";
import ActivityCard from "@/components/ActivityCard.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import NotificationDialog from "@/components/NotificationDialog.vue";

import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",

  components: {
    AddButton,
    EmptyStateImage,
    ActivityCard,
    ConfirmDialog,
    NotificationDialog,
  },

  computed: mapGetters({
    activityData: "activityData",
  }),

  mounted() {
    this.loadActivity();
  },

  methods: {
    toggleInputDialog(value) {
      store.dispatch("toggleInputDialog", { value });
    },
    async loadActivity() {
      try {
        await store.dispatch("getActivity");
      } catch (err) {
        console.log(err);
      }
    },
    async addNewActivity() {
      try {
        await store.dispatch("addNewActivity", {
          title: "New Activity",
        });

        this.loadActivity();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
