import { createStore } from "vuex";
import axios from "axios";

const baseUrl = "https://todo.api.devcode.gethired.id";
const userEmail = "dururu@gmail.com";

export default createStore({
  state: {
    activityData: {},
    inputActivityDialog: false,
  },
  getters: {
    activityData(state) {
      return state.activityData;
    },
    inputActivityDialog(state) {
      return state.inputActivityDialog;
    },
  },
  mutations: {
    GET_ACTIVITY_DATA(state, { data }) {
      state.activityData = data;
    },
    TOGGLE_ACTIVITY_DIALOG(state) {
      state.inputActivityDialog = !state.inputActivityDialog;
    },
  },
  actions: {
    async getActivity({ commit }) {
      try {
        let response = await axios.get(`${baseUrl}/activity-groups`, {
          params: {
            email: userEmail,
          },
        });

        commit("GET_ACTIVITY_DATA", {
          data: response.data,
        });

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async addNewActivity(context, payload) {
      try {
        let response = await axios.post(`${baseUrl}/activity-groups`, {
          title: payload.title,
          email: userEmail,
        });

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async detailActivity(context, payload) {
      try {
        let response = await axios.get(
          `${baseUrl}/activity-groups/${payload.id}`
        );

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async updateActivity(context, payload) {
      try {
        let response = await axios.patch(
          `${baseUrl}/activity-groups/${payload.id}`,
          {
            title: payload.title,
          }
        );

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async removeActivity(context, payload) {
      try {
        let response = await axios.delete(
          `${baseUrl}/activity-groups/${payload.id}`
        );

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    toggleActivityDialog({ commit }) {
      commit("TOGGLE_ACTIVITY_DIALOG");
    },
  },
  modules: {},
});
