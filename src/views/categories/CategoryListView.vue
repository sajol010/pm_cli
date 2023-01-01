<script>
import {useCategoriesStore} from "@/stores/categories";

let categoryStore = useCategoriesStore();
export default {
  name: "CategoryListView",
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    getCategoryList() {
      this.categories = categoryStore.categories;
      console.log(this.categories)
    },
    deleteCategory: function (id){
      this.categories = categoryStore.deleteCategory(id);
      console.log(this.categories)
    }
  },
  async mounted() {
    await categoryStore.fetchCategories();
    this.getCategoryList();
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Product List</h4>

      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="index">
              <td class="py-1">
               {{index+1}}
              </td>
              <td>{{ category.name }}</td>
              <td>
                <router-link
                  class="btn btn-info"
                  :to="{ name: 'categoryUpdate', params: { id: category.id} }"
                  >Edit</router-link
                >
                <a class="btn btn-danger" @click="deleteCategory(category.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
