<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'productList'}">
          <i class="mdi mdi-home menu-icon"></i>
          <span class="menu-title">Products</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'categoryList'}">
          <i class="mdi mdi-home menu-icon"></i>
          <span class="menu-title">Categories</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "SidebarComponent",
};
</script>
