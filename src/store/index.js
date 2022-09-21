import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const baseUrl = "https://todo.api.devcode.gethired.id";
const userEmail = "dururu@gmail.com";

export default new Vuex.Store({
  state: {
    activityData: {},
    selectedItem: {
      type: "",
      id: "",
      title: "",
    },
    inputMode: "add",
    showInputDialog: false,
    showConfirmDialog: false,
    showNotificationDialog: false,
  },
  getters: {
    activityData(state) {
      return state.activityData;
    },
    selectedItem(state) {
      return state.selectedItem;
    },
    inputMode(state) {
      return state.inputMode;
    },
    showInputDialog(state) {
      return state.showInputDialog;
    },
    showConfirmDialog(state) {
      return state.showConfirmDialog;
    },
    showNotificationDialog(state) {
      return state.showNotificationDialog;
    },
  },
  mutations: {
    GET_ACTIVITY_DATA(state, { data }) {
      state.activityData = data;
    },
    SET_SELECTED_ITEM(state, { type, id, title }) {
      state.selectedItem.type = type;
      state.selectedItem.id = id;
      state.selectedItem.title = title;
    },
    SET_INPUT_MODE(state, { data }) {
      state.inputMode = data;
    },
    TOGGLE_INPUT_DIALOG(state, { value }) {
      state.showInputDialog = value;
    },
    TOGGLE_CONFIRM_DIALOG(state, { value }) {
      state.showConfirmDialog = value;
    },
    TOGGLE_NOTIFICATION_DIALOG(state, { value }) {
      state.showNotificationDialog = value;
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
    async getTodos(context, payload) {
      try {
        let response = await axios.get(`${baseUrl}/todo-items`, {
          activity_group_id: payload.activityId,
        });

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async detailTodo(context, payload) {
      try {
        let response = await axios.get(`${baseUrl}/todo-items/${payload.id}`);

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
    setSelectedItem({ commit }, { type, id, title }) {
      commit("SET_SELECTED_ITEM", { type, id, title });
    },
    setInputMode({ commit }, { data }) {
      commit("SET_INPUT_MODE", { data });
    },
    toggleInputDialog({ commit }, { value }) {
      commit("TOGGLE_INPUT_DIALOG", { value });
    },
    toggleConfirmDialog({ commit }, { value }) {
      commit("TOGGLE_CONFIRM_DIALOG", { value });
    },
    toggleNotificationDialog({ commit }, { value }) {
      commit("TOGGLE_NOTIFICATION_DIALOG", { value });
    },
  },
  modules: {},
});
