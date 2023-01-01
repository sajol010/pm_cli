// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async login(data) {
      let vRef = this;
      if (data.email && data.password) {
        try {
          let responseData = {};
          await axios
            .post("/login", {
              email: data.email,
              password: data.password,
            })
            .then(function (response) {
              responseData = response
              if (response.data.success) {
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(response.data.data)
                );
              }
            });
          return responseData.data;
        } catch (e) {
          return e?.response?.data??{};
        }
      }
    },
    async register(data) {
      try {
        let responseData = {};
        await axios.post("/register", data).then(function (response) {
          responseData = response
        });
        return responseData.data;
      } catch (e) {
        return e?.response?.data??{};
      }
    },
  },
});
