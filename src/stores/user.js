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
    login(data) {
      let vRef = this;
      if (data.email && data.password) {
        try {
          axios
            .post("/login", {
              email: data.email,
              password: data.password,
            })
            .then(function (response) {
              if (response.data.success) {
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(response.data.data)
                );
                console.log(localStorage.getItem("userInfo"))
              }
            });
        } catch (e) {
          console.log(e);
        }
      }
    },
    register(data) {
      let vRef = this;
      if (data.email && data.password) {
        try {
          axios
            .post("/register", {
              email: data.email,
              password: data.password,
              name:data.name
            })
            .then(function (response) {
              if (response.data.status) vRef.userInfo = response.data.data;
            });
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
});
