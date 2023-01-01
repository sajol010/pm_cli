import { defineStore } from "pinia";
import axios from "axios";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [],
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async fetchCategories(data = {}) {
      let vRef = this;
      try {
        let for_option = data.for_option ?? false;
        await axios
          .get("/categories?for_option=" + for_option)
          .then(function (response) {
            if (response.data.success) vRef.categories = response.data.data;
          });
      } catch (e) {
        console.log(e);
      }
    },
    async addCategory(data) {
      try {
        let resData = {};
        await axios.post("/categories", data).then(function (response) {
          resData = response;
        });

        return resData.data;
      } catch (e) {
        return e.response.data;
      }
    },
    async editCategory(id, data) {
      try {
        let resData = {};
        await axios
          .post("/categories/" + id, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            resData = response;
          });
        return resData.data;
      } catch (e) {
        return e.response.data;
      }
    },
    async getCategory(id) {
      try {
        let data = {};
        await axios.get("/categories/" + id).then(function (response) {
          data = response.data.data;
        });
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    deleteCategory(id) {
      try {
        axios.delete("/categories/" + id).then(function (response) {
          console.log(response);
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
});
