<template>
  <div>
    <DropZone
      :maxFiles="Number(10000000000)"
      :uploadOnDrop="false"
      :multipleUpload="true"
      :parallelUpload="3"
      @addedFile="onFileAdd"
      @removedFile="onFileRemove"
    />
  </div>
</template>

<script>
import DropZone from "dropzone-vue";
import {shallowRef, toRaw} from "vue";

export default {
  components: {
    DropZone,
  },
  data() {
    return {
      files: {},
      uploaded_files: [],
    };
  },
  methods: {
    onFileAdd: function (items) {
      let item = shallowRef(items).value
      this.uploaded_files.push(item);

      let files = this.uploaded_files.map(function (files) {
        return files.file;
      });
      this.$emit("fileUpload", files);
    },
    onFileRemove: function (items) {
     let item = toRaw(items);

     let uploaded = toRaw(this.uploaded_files)
      var filtered = uploaded.filter(function (file) {
         return file.id != item.id
      });
      this.uploaded_files = filtered;

    },
  },
  watch: {
    uploaded_files(uploadedFiles) {
      let files = uploadedFiles.map(function (files) {
        return files.file;
      });
      this.$emit("fileUpload", files);
    },
  },
};
</script>

<style scoped>
.dropzone {
  border: 1px solid #f3f3f3;
}

.preview-container {
  border: none;
}
</style>
