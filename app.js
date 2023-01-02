
const { createApp } = Vue
const baseUrl = "https://vue3-course-api.hexschool.io"

createApp({
  data() {
    return {
      products: [],
      productDetail: {}
    }
  },
  methods: {
    getProducts() {
      axios
        .get(`${baseUrl}/v2/api/pororo03-api/admin/products`)
        .then((res) => {
          console.log(res.data);
          this.products = res.data.products
        }).catch((error) => {
          console.log(error.response.data);
          const {message} =  error.response.data;
          alert(message);
        })
    },
    setHeaders(){
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)mytoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common['Authorization'] = token;
    },
    check(){
      axios
        .post(`${baseUrl}/v2/api/user/check`)
        .then((res) => {
          console.log(res.data);
          this.getProducts();
        }).catch((error) => {
          console.log(error.response.data);
          const {message} =  error.response.data;
          alert(message);
          window.location = 'login.html';
        })
    }
  },
  mounted() {
    this.setHeaders();
    this.check();
  }
}).mount('#app')