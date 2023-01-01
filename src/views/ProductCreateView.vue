<script>
import Multiselect from "@vueform/multiselect";
import FileUpload from "@/components/FileUpload.vue";
import { toRaw } from "vue";
import { useProductsStore } from "@/stores/products";
export default {
  components: { Multiselect, FileUpload },
  name: "ProductCreateView",
  data() {
    return {
      options: ["list", "of", "options"],
      uploaded_files: [],
      formData: {
        name: "",
        price: "",
        quantity: "",
        details: "",
        categories: [],
      },
      errors_list: [],
    };
  },
  methods: {
    saveProduct: async function (e) {
      e.preventDefault();
      let products = useProductsStore();
      let form = toRaw(this.formData);
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("details", form.details);
      formData.append("categories", form.categories);
      let files = toRaw(this.uploaded_files);
      files.forEach(function (file, index) {
        formData.append("images[" + index + "]", file);
      });

      let response = await products.addProduct(formData);
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
      <h4 class="card-title">Product Create</h4>
      <ul class="text-danger">
        <li v-for="(error, index) in errors_list" :key="index">{{error}}</li>
      </ul>
      <form class="forms-sample" @submit="saveProduct">
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
        <div class="form-group">
          <label for="exampleInputEmail3">Quantity</label>
          <input
            type="number"
            class="form-control"
            id="exampleInputEmail3"
            placeholder="Quality"
            v-model="formData.quantity"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword4">Price</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword4"
            placeholder="Price"
            v-model="formData.price"
          />
        </div>
        <div class="form-group">
          <label for="exampleSelectGender">Category</label>
          <Multiselect
            v-model="formData.categories"
            mode="tags"
            :close-on-select="false"
            :searchable="true"
            :create-option="false"
            :options="[
              { value: '1', label: 'Batman' },
              { value: '2', label: 'Robin' },
              { value: '3', label: 'Joker' },
            ]"
          />
        </div>
        <div class="form-group">
          <label>Images</label>
          <file-upload @fileUpload="fileUploaded"></file-upload>
        </div>
        <div class="form-group">
          <label for="exampleTextarea1">Details</label>
          <textarea
            class="form-control"
            id="exampleTextarea1"
            rows="4"
            v-model="formData.details"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <!--        <button class="btn btn-light">Cancel</button>-->
      </form>
    </div>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
