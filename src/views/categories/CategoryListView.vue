<script>
import { useCategoriesStore } from "@/stores/categories";

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
      console.log(this.categories);
    },
    deleteCategory: function (id) {
      this.categories = categoryStore.deleteCategory(id);
      console.log(this.categories);
    },
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
      <h4 class="card-title">Category List</h4>
      <router-link :to="{name:'categoryCreate'}" class="btn btn-sm btn-secondary">Add</router-link>
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
                {{ index + 1 }}
              </td>
              <td>{{ category.name }}</td>
              <td>
                <router-link
                  class="btn btn-sm btn-info p-1"
                  style="margin-right: 4px"
                  :to="{ name: 'categoryUpdate', params: { id: category.id } }"
                  ><span class="mdi mdi-circle-edit-outline"></span
                ></router-link>
                <a
                  class="btn btn-danger btn-sm p-1"
                  @click="deleteCategory(category.id)"
                  ><span class="mdi mdi-trash-can"></span
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
