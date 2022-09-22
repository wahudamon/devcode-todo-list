<template>
  <div class="relative text-md text-black pt-2 pb-3 h-4/5 w-3/5">
    <button
      class="flex items-center justify-between px-3 py-2 w-3/5 bg-inherit border-2 border-solid border-gray-300 rounded-md text-md focus:outline-none focus:border-blue-300"
      @click="isOptionsExpanded = !isOptionsExpanded"
      @blur="isOptionsExpanded = false"
    >
      <div class="flex gap-2">
        <div
          class="mt-1 w-3 h-3 rounded-full"
          :style="{ background: selectedOption.color }"
        ></div>
        <span>{{ selectedOption.title }}</span>
      </div>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
        :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
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
        class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
      >
        <li
          v-for="(option, index) in options"
          data-cy="modal-add-priority-item"
          :key="index"
          class="px-3 py-2 flex gap-2 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
          @mousedown.prevent="setOption(option)"
        >
          <div
            class="mt-1 w-3 h-3 rounded-full"
            :style="{ background: option.color }"
          ></div>
          <p>{{ option.title }}</p>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PriorityCombobox",
  props: {
    selectedTodoPriority: String,
    inputMode: String,
  },
  data() {
    return {
      isOptionsExpanded: false,
      selectedOption: { color: "#00a790", title: "Normal", value: "normal" },
      options: [
        { color: "#ed4c5c", title: "Very High", value: "very-high" },
        { color: "#ffce31", title: "High", value: "high" },
        { color: "#00a790", title: "Normal", value: "normal" },
        { color: "#43c4e3", title: "Low", value: "low" },
        { color: "#b01aff", title: "Very Low", value: "very-low" },
      ],
    };
  },
  computed: mapGetters({
    showInputDialog: "showInputDialog",
  }),
  watch: {
    showInputDialog(val) {
      if (val) {
        this.$emit("get-priority", this.selectedOption.value);
      } else {
        this.selectedOption = this.options[2];
      }
    },
    selectedOption(val) {
      this.$emit("get-priority", val.value);
    },
    selectedTodoPriority() {
      this.getSelectedEditOption();
    },
  },
  mounted() {
    this.$emit("get-priority", this.selectedOption.value);
  },
  methods: {
    setOption(option) {
      this.selectedOption = option;
      this.isOptionsExpanded = false;
    },
    getSelectedEditOption() {
      if (this.inputMode === "edit" && this.selectedTodoPriority) {
        this.selectedOption = {};
        this.selectedOption = this.options.find(
          (option) => option.value === this.selectedTodoPriority
        );
      }
    },
  },
};
</script>

<style>
.ease-custom {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
