<template>
  <div
    data-cy="activity-card"
    class="w-1/5 h-1/5 p-4 rounded-xl cursor-pointer activity-card"
    @click="$router.push('/detail')"
  >
    <div class="pb-28 activity-card_body">
      <p data-cy="activity-card-title" class="text-md font-bold">
        Daftar Belanja Bulanan Saya dan Anak
      </p>
    </div>
    <div class="flex justify-between activity-card_footer">
      <p data-cy="activity-card-date" class="mt-1 text-sm font-light">
        14 September 2022
      </p>
      <button data-cy="activity-card-delete-button">
        <span class="icon-delete-activity-item"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityCard",
};
</script>

<style lang="scss">
@import "@/assets/icons/icons";

.activity-card {
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
}
</style>
