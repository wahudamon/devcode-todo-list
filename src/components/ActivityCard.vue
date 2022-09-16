<template>
  <div class="w-1/5 h-1/5 p-4 rounded-xl activity-card">
    <div
      class="pb-28 cursor-pointer activity-card_body"
      @click="$router.push(`/detail/${id}`)"
    >
      <p data-cy="activity-item-title" class="text-md font-bold">
        {{ title?.length > 16 ? `${title.slice(0, 16)}...` : title }}
      </p>
    </div>
    <div class="flex justify-between activity-card_footer">
      <p data-cy="activity-item-date" class="mt-1 text-sm font-light">
        {{ formattedDate(date) }}
      </p>
      <button
        data-cy="activity-item-delete-button"
        @click="toggleConfirmDialog"
      >
        <span class="icon-delete-activity-item"></span>
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "@/store";

export default {
  name: "ActivityCard",
  props: {
    id: String,
    title: String,
    date: String,
    getActivity: Function,
  },
  data() {
    return {};
  },
  methods: {
    toggleConfirmDialog(value) {
      store.dispatch("setSelectedItem", {
        type: "activity",
        id: this.id,
        title: this.title,
      });
      store.dispatch("toggleConfirmDialog", { value });
    },
    formattedDate(value) {
      return moment(value).locale("id").format("DD MMMM YYYY");
    },
    async removeActivity(id) {
      try {
        await store.dispatch("removeActivity", { id });
        this.getActivity();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/icons/icons";

.activity-card {
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
}
</style>
