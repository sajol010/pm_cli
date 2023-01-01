<script>
import Multiselect from "@vueform/multiselect";
import FileUpload from "@/components/FileUpload.vue";
import { toRaw } from "vue";
import { useProductsStore } from "@/stores/products";
import { useCategoriesStore } from "@/stores/categories";
export default {
  components: { Multiselect, FileUpload },
  name: "ProductCreateView",
  data() {
    return {
      uploaded_files: [],
      formData: {
        id: '',
        name: "",
        price: "",
        quantity: "",
        description: "",
        categories: [],
      },
      errors_list: [],
      category_list: []
    };
  },
  methods: {
    validate: function () {
      this.errors_list = [];
      if (this.formData.name == "") {
        this.errors_list.push("Name is required");
      }
      if (this.formData.quantity == "") {
        this.errors_list.push("Quantity is required");
      }
      if (this.formData.price == "") {
        this.errors_list.push("Price is required");
      }
      if (isNaN(parseFloat(this.formData.price))) {
        this.errors_list.push("Enter a valid price");
      }
      return this.errors_list.length <= 0;
    },
    saveProduct: async function (e) {
      e.preventDefault();
      if (!this.validate()) return;

      let products = useProductsStore();
      let form = toRaw(this.formData);
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("description", form.description);
      formData.append("category_ids", form.categories);
      formData.append("_method", 'PUT');
      let files = toRaw(this.uploaded_files);
      files.forEach(function (file, index) {
        formData.append("images[" + index + "]", file);
      });

      let response = await products.editProduct(this.formData.id, formData);
      if (!response.success) {
        if (response?.message)
          this.$toast.error(response.message);

        let errors = response.errors;
        this.errors_list = Object.keys(errors).map(function (key) {
          return errors[key][0];
        });
      }else{
        this.$toast.success("Product has been updated!");
        this.$router.push({
          name: 'productList'
        })
      }
    },
    fileUploaded: function (files) {
      this.uploaded_files = files;
    },
  },
  async mounted() {
    let products = useProductsStore();
    let id = this.$route.query.id;

    let product = await products.getProduct(id)
    this.formData.id = product.id??''
    this.formData.name = product.name??''
    this.formData.price = product.price??''
    this.formData.quantity = product.quantity??''
    this.formData.description = product.description??''
    this.formData.categories = product.categories??[]

    let categoryStore = useCategoriesStore()
    await categoryStore.fetchCategories({ for_option: true });
    console.log( categoryStore.categories)
    this.category_list = categoryStore.categories
  }
};
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Product Create</h4>
      <ul class="text-danger">
        <li v-for="(error, index) in errors_list" :key="index">{{ error }}</li>
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
            :options="category_list"
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
            v-model="formData.description"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <!--        <button class="btn btn-light">Cancel</button>-->
      </form>
    </div>
  </div>
</template>
<style src="../../../node_modules/@vueform/multiselect/themes/default.css"></style>
