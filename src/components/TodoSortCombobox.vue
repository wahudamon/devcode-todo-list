<template>
  <div class="relative text-md text-black">
    <button
      data-cy="todo-sort-button"
      class="px-3 w-12 h-12 todo-sort__button"
      @click="isOptionsExpanded = !isOptionsExpanded"
      @blur="isOptionsExpanded = false"
    >
      <span class="icon-sort"></span>
    </button>
    <transition
      enter-active-class="transform transition duration-500 ease-custom"
      enter-class="-translate-y-1/2 scale-y-0 opacity-0"
      enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="transform transition duration-300 ease-custom"
      leave-class="translate-y-0 scale-y-100 opacity-100"
      leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
    >
      <ul
        v-show="isOptionsExpanded"
        class="absolute left-0 right-0 mt-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden sort-dropdown__list"
      >
        <li
          v-for="(option, index) in options"
          data-cy="sort-selection"
          :key="index"
          class="px-3 py-3 flex justify-between transition-colors duration-300 cursor-pointer hover:bg-gray-200 sort-dropdown__item"
          @mousedown.prevent="setOption(option)"
        >
          <div class="flex gap-3">
            <div :class="`mt-0.5 w-5 h-5 icon-sort-${option.value}`"></div>
            <p>{{ option.title }}</p>
          </div>
          <div
            v-show="option.value === selectedOption.value"
            class="mt-1 w-4 h-4 icon-sort-active"
          ></div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: "TodoSortCombobox",
  props: {
    selectedTodoPriority: String,
  },
  data() {
    return {
      isOptionsExpanded: false,
      selectedOption: { title: "Terbaru", value: "newest" },
      options: [
        { title: "Terbaru", value: "newest" },
        { title: "Terlama", value: "oldest" },
        { title: "A-Z", value: "ascending" },
        { title: "Z-A", value: "descending" },
        { title: "Belum Selesai", value: "not-done" },
      ],
    };
  },
  watch: {
    selectedOption(val) {
      this.$emit("load-detail-act", val.value);
    },
  },
  methods: {
    setOption(option) {
      this.selectedOption = option;
      this.isOptionsExpanded = false;
    },
  },
};
</script>

<style lang="scss">
.todo-sort {
  &__button {
    border: 1px solid #d5d5d5;
    border-radius: 50%;
  }
}
.sort-dropdown {
  &__list {
    width: 235px;
    z-index: 1000;
  }
}
.ease-custom {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
