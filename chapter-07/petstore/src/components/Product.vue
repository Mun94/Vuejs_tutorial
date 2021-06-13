<template>
  <div>
    <my-header></my-header>
    <h1>id {{ $route.params.id }} 입니다</h1>

    <div class="row">
      <div class="col-md-5 col-md-offset-0">
        <figure>
          <img :src="product.image" class="product" />
        </figure>
      </div>

      <div class="col-md-6 col-md-offset-0 description">
        <h1>{{ product.title }}</h1>
        <p v-html="product.description"></p>
        <p class="price">
          {{ product.price }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "./Header.vue";
import axios from "axios";

export default {
  name: "Product",
  components: { MyHeader },
  data() {
    return {
      product: ""
    };
  },
  created: function() {
    axios.get("/static/products.json").then(response => {
      this.product = response.data.products.filter(
        data => data.id === this.$route.params.id
      )[0];
      this.product.image = "/" + this.product.image;
    });
  }
};
</script>
