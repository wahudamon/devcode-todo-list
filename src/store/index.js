import { createStore } from "vuex";

export default createStore({
  state: {
    activityData: [],
  },
  getters: {
    activityData(state) {
      return state.activityData;
    },
  },
  mutations: {
    ADD_ACTIVITY_DATA(state, { data }) {
      state.activityData = data;
    },
  },
  actions: {},
  modules: {},
});
