import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async fetchProducts(data = {}) {
      let vRef = this;
      try {
        await axios.get("/products").then(function (response) {
          console.log(response.data.success);
          if (response.data.success) vRef.products = response.data.data.list;
        });
      } catch (e) {
        console.log(e);
      }
    },
    async addProduct(data) {
      try {
        let resData = {};
        await axios
          .post("/products", data, {
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
    async editProduct(id, data) {
      try {
        let resData = {};
        await axios
          .post("/products/" + id, data, {
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
    async getProduct(id) {
      try {
        let data = {};
        await axios.get("/products/" + id).then(function (response) {
          data = response.data.data;
        });
        return data;
      } catch (e) {
        return e.response.data
      }
    },
    async deleteProduct(id) {
      try {
        let data = {};
        await axios.delete("/products/" + id).then(function (response) {
          data = response;
        });
        return data.data;
      } catch (e) {
        return e.response.data
      }
    },
  },
});
