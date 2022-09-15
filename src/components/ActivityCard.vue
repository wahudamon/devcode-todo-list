<template>
  <div data-cy="activity-card" class="w-1/5 h-1/5 p-4 rounded-xl activity-card">
    <div
      class="pb-28 cursor-pointer activity-card_body"
      @click="$router.push(`/detail/${id}`)"
    >
      <p data-cy="activity-card-title" class="text-md font-bold">
        {{ title }}
      </p>
    </div>
    <div class="flex justify-between activity-card_footer">
      <p data-cy="activity-card-date" class="mt-1 text-sm font-light">
        {{ formattedDate(date) }}
      </p>
      <button data-cy="activity-card-delete-button" @click="removeActivity(id)">
        <span class="icon-delete-activity-item"></span>
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "ActivityCard",
  props: {
    id: String,
    title: String,
    date: String,
    deleteFunction: Function,
  },
  data() {
    return {
      baseUrl: "https://todo.api.devcode.gethired.id",
      userEmail: "dururu@gmail.com",
    };
  },
  methods: {
    formattedDate(value) {
      return moment(value).locale("id").format("DD MMMM YYYY");
    },
    async removeActivity(id) {
      try {
        let response = await axios.delete(`${this.baseUrl}/activity-groups/`, {
          params: {
            id,
          },
        });

        console.log("Success delete activity!");

        return response;
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
