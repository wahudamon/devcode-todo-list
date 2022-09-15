<template>
  <div
    data-cy="activity-card"
    class="w-1/5 h-1/5 p-4 rounded-xl cursor-pointer activity-card"
    @click="$router.push(`/detail/${id}`)"
  >
    <div class="pb-28 activity-card_body">
      <p data-cy="activity-card-title" class="text-md font-bold">
        {{ title }}
      </p>
    </div>
    <div class="flex justify-between activity-card_footer">
      <p data-cy="activity-card-date" class="mt-1 text-sm font-light">
        {{ formattedDate(date) }}
      </p>
      <button data-cy="activity-card-delete-button">
        <span class="icon-delete-activity-item"></span>
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ActivityCard",
  props: {
    id: String,
    title: String,
    date: String,
  },
  methods: {
    formattedDate(value) {
      return moment(value).locale("id").format("DD MMMM YYYY");
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
