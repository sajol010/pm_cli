<script>
export default {
  name: "NotFoundView",
}
</script>
<template>
  <div class="text"><span>Ooops...</span><br>page not found</div>
</template>
<style>

div {
  width: 100%;
  text-align: center;
}

@-webkit-keyframes moving {
  to {
    background-position: 100vmin 20vmin, -100vmin -25vmin;
  }
}
@keyframes moving {
  to {
    background-position: 100vmin 20vmin, -100vmin -25vmin;
  }
}

.text {
  font: 400 5vmin "Courgette";
}
.text span {
  font-size: 10vmin;
}
</style>