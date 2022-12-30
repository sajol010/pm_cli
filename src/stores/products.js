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
    async fetchProducts(data={}) {
      let vRef = this;
      try {
        await axios.get("/products").then(function (response) {
          if (response.data.status) vRef.products = response.data.data;
        });
      } catch (e) {
        console.log(e);
      }
    },
    addProduct(data) {
      try {
        axios
          .post("/products", {
            email: data.email,
            password: data.password,
            name: data.name,
          })
          .then(function (response) {
            console.log(response);
          });
      } catch (e) {
        console.log(e);
      }
    },
    editProduct(id, data) {
      try {
        axios.put("/products/" + id, data).then(function (response) {
          console.log(response);
        });
      } catch (e) {
        console.log(e);
      }
    },
    deleteProduct(id) {
      try {
        axios.delete("/products/" + id).then(function (response) {
          console.log(response);
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
});
