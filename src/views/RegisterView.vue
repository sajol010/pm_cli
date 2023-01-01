<script>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      errors_list: [],
    };
  },
  methods: {
    async signUp(e) {
      e.preventDefault();
      this.errors_list = [];
      let response = await userStore.register(this.formData);
      if (!response.success) {
        if (response.message)
          this.$toast.error(response.message);

        let errors = response?.errors ?? [];
        this.errors_list = Object.keys(errors).map(function (key) {
          return errors[key][0];
        });
      } else {
        this.$toast.success("Successfully registered, Please login to access");
        this.$router.push({
          name: "Login",
        });
      }
    },
  },
};
</script>
<template>
  <div class="row w-100 mx-0">
    <div class="col-lg-4 mx-auto">
      <div class="auth-form-light text-left py-5 px-4 px-sm-5">
        <div class="brand-logo">
          <img src="../../images/logo.png" alt="logo" />
        </div>
        <h4>New here?</h4>
        <h6 class="font-weight-light">
          Signing up is easy. It only takes a few steps
        </h6>
        <ul class="text-danger">
          <li v-for="(error, index) in errors_list" :key="index">
            {{ error }}
          </li>
        </ul>
        <form class="pt-3" @submit="signUp">
          <div class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              id="exampleInputUsername1"
              placeholder="Full Name"
              v-model="formData.name"
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control form-control-lg"
              id="exampleInputEmail1"
              placeholder="Email"
              v-model="formData.email"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              class="form-control form-control-lg"
              id="exampleInputPassword1"
              placeholder="Password"
              v-model="formData.password"
            />
          </div>
          <div class="mb-4">
            <div class="form-check">
              <label class="form-check-label text-muted">
                <input type="checkbox" class="form-check-input" />
                I agree to all Terms & Conditions
              </label>
            </div>
          </div>
          <div class="mt-3">
            <button
              type="submit"
              class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
            >
              SIGN UP
            </button>
          </div>
          <div class="text-center mt-4 font-weight-light">
            Already have an account?
            <router-link :to="{ name: 'Login' }" class="text-primary"
              >Login</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
