<template>
  <div class="row w-100 mx-0">
    <div class="col-lg-4 mx-auto">
      <div class="auth-form-light text-left py-5 px-4 px-sm-5">
        <div class="brand-logo">
          <img src="../../images/logo.png" alt="logo" />
        </div>
        <h4>Hello! let's get started</h4>
        <h6 class="font-weight-light">Sign in to continue.</h6>
        <ul class="text-danger">
          <li v-for="(error, index) in errors_list" :key="index">
            {{ error }}
          </li>
        </ul>
        <form class="pt-3" @submit="login">
          <div class="form-group">
            <input
              type="email"
              class="form-control form-control-lg"
              id="exampleInputEmail1"
              placeholder="Username"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control form-control-lg"
              id="exampleInputPassword1"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <div class="mt-3">
            <button
              class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
              type="submit"
              >SIGN IN</button
            >
          </div>
          <div class="my-2 d-flex justify-content-between align-items-center">
            <!--            <a href="#" class="auth-link text-black">Forgot password?</a>-->
          </div>
          <div class="text-center mt-4 font-weight-light">
            Don't have an account?
            <router-link :to="{ name: 'Register' }" class="text-primary"
              >Create</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
export default {
  data() {
    return {
      email: "",
      password: "",
      errors_list: []
    };
  },
  mounted() {},
  methods: {
    async login(e) {
      e.preventDefault()
      let user = new useUserStore();
      const response = await user.login({
        email: this.email,
        password: this.password,
      });
      if (!response.success) {
        if (response.message)
          this.$toast.error(response.message);

        let errors = response?.errors ?? [];
        this.errors_list = Object.keys(errors).map(function (key) {
          return errors[key][0];
        });
      } else {
        this.$toast.success("Hello! Welcome to the project management tool");
        location.reload()
      }
    },
  },
};
</script>
