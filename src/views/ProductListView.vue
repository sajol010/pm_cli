<script>
import useProductsStore from "@/stores/products";
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
      let productList = productStore.$state.products;
      console.log(productList);
    },
  },
  mounted() {
    productStore.fetchProducts();
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
              <th>User</th>
              <th>First name</th>
              <th>Progress</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-1">
                <img src="../../images/faces/face1.jpg" alt="image" />
              </td>
              <td>Herman Beck</td>
              <td>
                <div class="progress">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    style="width: 25%"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </td>
              <td>$ 77.99</td>
              <td>
                <router-link
                  class="btn btn-info"
                  :to="{ name: 'productUpdate', params: { slug: 'test' } }"
                  >Edit</router-link
                >
                <a class="btn btn-danger">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
