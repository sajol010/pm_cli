<script>
import { useProductsStore } from "@/stores/products";

let productStore = useProductsStore();
export default {
  name: "ProductList",
  data: function () {
    return {
      products: [],
    };
  },
  methods: {
    getProductList() {
      this.products = productStore.products;
    },
    async deleteProduct(id){
      let response = await productStore.deleteProduct(id)
      if (response.success){
        this.$toast.success("Product has been deleted!");
        await productStore.fetchProducts();
        this.getProductList();
      }else{
        if (response?.message)
          this.$toast.error(response?.message);
      }
    }
  },
  async mounted() {
    await productStore.fetchProducts();
    this.getProductList();
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
    <div>
      <h4 class="card-title">Product List</h4>
      <router-link :to="{name:'productCreate'}" class="btn btn-sm btn-secondary">Add</router-link>
    </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td class="py-1">
                <img :src="product?.images[0]?.image??''" alt="image" />
              </td>
              <td>{{ product.name }}</td>
              <td>
                {{ product.price }}
              </td>
              <td>{{ product.quantity }}</td>
              <td>
                <router-link
                  class="btn btn-sm btn-info p-1"
                  style="margin-right: 4px"
                  :to="{ name: 'productUpdate', params: { slug: product.slug}, query:{ id: product.id } }"
                  ><span class="mdi mdi-circle-edit-outline"></span></router-link
                >
                <a class="btn btn-danger btn-sm p-1" @click="deleteProduct(product.id)"><span class="mdi mdi-trash-can"></span></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
