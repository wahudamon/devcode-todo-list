<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <!-- <button
        @click="isOpen = true"
        class="px-6 py-2 text-white bg-blue-600 rounded shadow"
        type="button"
      >
        Open Dialog
      </button> -->

      <div
        v-show="isOpen"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
      >
        <div class="w-3/5 h-3/5 p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Tambah List Item</h3>
            <svg
              @click="isOpen = false"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-red-900 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="mt-4">
            <p class="mb-4 text-sm">Nama List Item</p>
            <p class="mb-4 text-sm">Prioritas</p>
            <div class="flex justify-end">
              <button
                class="px-6 py-2 text-white rounded-full"
                style="background: #16abf8"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InputDialog",
  props: {
    showDialog: Boolean,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    showDialog(val) {
      this.isOpen = val;
    },
  },
};
</script>
