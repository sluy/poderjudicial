<template>
    <div>
      <div class="text-center q-pa-md" v-if="showProducts === false">
        <q-btn color="primary" @click="load()" label="ver productos" />
      </div>
      <div class="q-pa-md row items-start q-gutter-md" v-else>
        <q-card class="my-card" v-for="product in products" v-bind:key="product.id">
          <q-card-section>
            <div class="text-h6">{{product.name}}</div>
            <div class="text-subtitle2  text-green">{{product.price}} $</div>
          </q-card-section>
          <q-separator />
          <q-card-actions vertical>
            <q-btn flat @click="buy(product)">Comprar</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent } from 'vue'
import { getToken } from '../extras/auth';
import { api } from '../boot/axios';
import { Loading, Notify } from 'quasar';




export default defineComponent({
  name: 'User',
  setup() {
    return {
      loading: ref(false),
      products: ref([]),
      showProducts: ref(false),
      async load () {
        Loading.show();
        this.showProducts = true;
        if (!getToken()) {
          return this.$router.push({ name: 'login' });
        }      
        try {
          const res = await api.get('products', {
            headers: {
              'Authorization': 'Bearer ' + getToken()
            }
          });
          if (Array.isArray(res.data)) {
            this.products = res.data
          }
        } catch (error) { }
        Loading.hide();
      },
      async buy (product) {
        Loading.show();
        if (!getToken()) {
          return this.$router.push({ name: 'login' });
        }
        try {
          console.log(getToken());
          const res = await api.post('boughts/'+ product.id, {}, {
            headers: {
              'Authorization': 'Bearer ' + getToken()
            }
          });
          Notify.create({
            color: 'positive',
            'message': 'Producto comprado'
          });
        } catch (error) {
          Notify.create({
            color: 'negative',
            'message': 'Ocurrió un error al comprar el producto.'
          });
        }
        Loading.hide();
      }
    }
  },
  mounted () {
    if (!getToken()) {
      return this.$router.push({ name: 'login' });
    }
  },
})
</script>
