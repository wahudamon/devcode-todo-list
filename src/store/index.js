import { createStore } from "vuex";
import axios from "axios";

const baseUrl = "https://todo.api.devcode.gethired.id";
const userEmail = "dururu@gmail.com";

export default createStore({
  state: {
    activityData: {},
    showInputDialog: false,
  },
  getters: {
    activityData(state) {
      return state.activityData;
    },
    showInputDialog(state) {
      return state.showInputDialog;
    },
  },
  mutations: {
    GET_ACTIVITY_DATA(state, { data }) {
      state.activityData = data;
    },
    TOGGLE_INPUT_DIALOG(state, { value }) {
      state.showInputDialog = value;
    },
  },
  actions: {
    async getActivity({ commit }) {
      try {
        console.log();
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
    async addNewTodoItem(context, payload) {
      try {
        let response = await axios.post(`${baseUrl}/todo-items`, payload);

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async updateTodoItem(context, payload) {
      try {
        let response = await axios.patch(
          `${baseUrl}/todo-items/${payload.id}`,
          {
            title: payload.title,
            priority: payload.priority,
            is_active: payload.is_active,
          }
        );

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async removeTodoItem(context, payload) {
      try {
        let response = await axios.delete(
          `${baseUrl}/todo-items/${payload.id}`
        );

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    toggleInputDialog({ commit }, { value }) {
      commit("TOGGLE_INPUT_DIALOG", { value });
    },
  },
  modules: {},
});
