<script>
import SidebarComponent from "@/components/partials/Sidebar.vue";
import Footer from "@/components/partials/Footer.vue";
import HeaderComponent from "@/components/partials/Header.vue";
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {HeaderComponent:HeaderComponent, Footer, Sidebar: SidebarComponent },
  data() {
    return {
      name: "name",
    };
  },
};
</script>

<template>
  <!-- partial:partials/_navbar.html -->
    <header-component></header-component>
  <!-- partial -->
  <div class="container-fluid page-body-wrapper">
    <!-- partial:partials/_sidebar.html -->
    <Sidebar></Sidebar>
    <!-- partial -->
    <div class="main-panel">
      <div class="content-wrapper">
        <RouterView></RouterView>
      </div>
      <!-- content-wrapper ends -->
      <!-- partial:partials/_footer.html -->
      <Footer></Footer>
      <!-- partial -->
    </div>
    <!-- main-panel ends -->
  </div>
  <!-- page-body-wrapper ends -->
</template>
