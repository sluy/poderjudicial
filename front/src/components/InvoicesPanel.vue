<template>
    <div class="q-pa-md text-center" style="min-width:500px;">

        <h4>facturas</h4>
        <q-btn label="Generar" @click="makeAll()"></q-btn>
        <q-btn label="Ver" @click="findAll()"></q-btn>

        <h4>productos</h4>
        <q-btn label="crear" @click="makeAll()"></q-btn>
        <q-btn label="ver" @click="findAll()"></q-btn>
    </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent } from 'vue'
import { getToken } from '../extras/auth'; 
import { api } from '../boot/axios';

export default defineComponent({
  name: 'InvoicesPanel',
  setup() {
      return {
          makeAll () {
              console.log('crear factura');
          },
          findAll () {
              console.log('buscar!');
          }
      }
  }
})
</script>
