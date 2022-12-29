<script>
import Multiselect from "@vueform/multiselect";

export default {
  components: { Multiselect },
  name: "ProductCreateView",
  data() {
    return {
      options: ["list", "of", "options"],
      value: [],
    };
  },
};
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Product Create</h4>
      <form class="forms-sample">
        <div class="form-group">
          <label for="exampleInputName1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputName1"
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail3">Quantity</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail3"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword4">Price</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword4"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label for="exampleSelectGender">Category</label>
          <Multiselect
            v-model="value"
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
          <input type="file" name="img[]" class="file-upload-default" />
          <div class="input-group col-xs-12">
            <input
              type="text"
              class="form-control file-upload-info"
              disabled=""
              placeholder="Upload Image"
            />
            <span class="input-group-append">
              <button class="file-upload-browse btn btn-primary" type="button">
                Upload
              </button>
            </span>
          </div>
        </div>
        <div class="form-group">
          <label for="exampleTextarea1">Details</label>
          <textarea
            class="form-control"
            id="exampleTextarea1"
            rows="4"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <button class="btn btn-light">Cancel</button>
      </form>
    </div>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
