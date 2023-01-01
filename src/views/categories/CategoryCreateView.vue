<script>
import { useCategoriesStore } from "@/stores/categories";
export default {
  name: "CategoryCreateView",
  data() {
    return {
      options: ["list", "of", "options"],
      uploaded_files: [],
      category_list:[],
      formData: {
        name: "",
        price: "",
        quantity: "",
        description: "",
        categories: [],
      },
      errors_list: [],
    };
  },
  methods: {
    validate: function(){
      this.errors_list = [];
      if (this.formData.name == ''){
        this.errors_list.push("Name is required")
      }
      return  this.errors_list.length <= 0;
    },
    saveCategory: async function (e) {
      e.preventDefault();
      if (!this.validate())
        return;

      let categories = useCategoriesStore();

      let formData = new FormData();
      formData.append("name", this.formData.name);
      let response = await categories.addCategory(formData);
      if (!response.success) {
        let errors = response.errors;
        this.errors_list = Object.keys(errors).map(function (key) {
          return errors[key][0];
        });
      }
    },
    fileUploaded: function (files) {
      this.uploaded_files = files;
    },
  },

};
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Category Create</h4>
      <ul class="text-danger">
        <li v-for="(error, index) in errors_list" :key="index">{{error}}</li>
      </ul>
      <form class="forms-sample" @submit="saveCategory">
        <div class="form-group">
          <label for="exampleInputName1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputName1"
            placeholder="Name"
            v-model="formData.name"
          />
        </div>
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <!--        <button class="btn btn-light">Cancel</button>-->
      </form>
    </div>
  </div>
</template>
<style src="../../../node_modules/@vueform/multiselect/themes/default.css"></style>
