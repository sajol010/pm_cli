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
      <h4 class="card-title">Product List</h4>

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
                <img src="../../images/faces/face1.jpg" alt="image" />
              </td>
              <td>{{ product.name }}</td>
              <td>
                {{ product.price }}
              </td>
              <td>{{ product.quantity }}</td>
              <td>
                <router-link
                  class="btn btn-info"
                  :to="{ name: 'productUpdate', params: { slug: product.slug } }"
                  >Edit</router-link
                >
                <a class="btn btn-danger">Delete</a>
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
