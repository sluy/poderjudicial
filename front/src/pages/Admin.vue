<template>
    <div>
      <div class="text-right q-pa-md">
        <q-btn color="primary" @click="makeAll()" label="Recargar facturas" />
      </div>
      <div class="q-pa-md row items-start q-gutter-md" v-show="invoices.length > 0">
        <q-card class="my-card" v-for="invoice in invoices" v-bind:key="invoice.id">
          <q-card-section>
            <div class="text-h6">Factura #{{invoice.id}}</div>
            <div class="text-subtitle text-italic">Comprado por {{invoice.user.name}}</div>
            <div class="text-subtitle2  text-green">{{invoice.total_price}} $</div>
          </q-card-section>
          <q-separator />
          <q-card-actions vertical>
            <q-btn flat @click="showInvoice(invoice)">ver más</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div v-show="invoices.length < 1" class="q-pa-md text-center">No hay facturas realizadas</div>
      <q-dialog v-model="invoiceDialog" transition-show="rotate" transition-hide="rotate">
        <q-card>
          <q-card-section>
            <div class="text-h6">Factura #{{invoiceModel.id}}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p>
              Usuario: <b>{{invoiceModel.user.name}} ({{invoiceModel.user.email}})</b><br/>
              Fecha de creación: <b>{{invoiceModel.created_at}}</b><br/>
              Precio total (simple): <b>{{invoiceModel.single_price}}</b><br/>
              Impuesto total: <b>{{invoiceModel.total_tax}}</b><br/>
              Precio final: <b>{{invoiceModel.total_price}}</b><br/>
            </p>
            <hr>
            <div class="text-h6">Productos ({{invoiceModel.boughts.length}})</div>
            <p v-for="iBought in invoiceModel.boughts" v-bind:key="iBought.id">
              <b>{{iBought.product.name}}</b><br/>
              <i>Comprado el {{iBought.created_at}}</i><br/>
              Precio: {{iBought.product.price}} (impuesto del {{iBought.product.tax}} %)<br/>
            </p>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Decline" color="primary" v-close-popup />
            <q-btn flat label="Accept" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent } from 'vue'
import { getToken } from '../extras/auth';
import { api } from '../boot/axios';
import { Loading, Notify } from 'quasar';




export default defineComponent({
  name: 'Admin',
  setup() {
    return {
      loading: ref(false),
      invoices: ref([]),
      invoiceDialog: ref(false),
      invoiceModel: ref(null),
      async makeAll () {
        Loading.show();
        if (!getToken()) {
          return this.$router.push({ name: 'login' });
        }      
        try {
          const res = await api.post('invoices', {
            headers: {
              'Authorization': 'Bearer ' + getToken()
            }
          });
          if ((typeof res.data !== 'object' || res.data === null) || res.data.count < 1) {
            Notify.create({
              message: 'No se encontraron productos por facturar'
            });
          } else {
            Notify.create({
              color: 'positive',
              message: 'Se han registrado ' + res.data.count + ' factura(s).'
            });
            return this.load();
          }
        } catch (error) { }
        Loading.hide();
      },
      async load() {
        console.log('cargandulo plus ultra');
          Loading.show();
          if (!getToken()) {
            return this.$router.push({ name: 'login' });
          }
          try {
            console.log(getToken());
            const res = await api.get('invoices', {
              headers: {
                'Authorization': 'Bearer ' + getToken()
              }
            });
            if (Array.isArray(res.data)) {
              this.invoices = res.data;
            }
          } catch (error) {
            Notify.create({
              color: 'negative',
              'message': 'Ocurrió un error al mostrar la factura.'
            });
          }
          Loading.hide();
      },
      hideInvoice () {
        this.invoiceDialog = false;
      },
      async showInvoice (invoice) {
        Loading.show();
        if (!getToken()) {
          return this.$router.push({ name: 'login' });
        }
        try {
          console.log(getToken());
          const res = await api.get('invoices/'+ invoice.id, {
            headers: {
              'Authorization': 'Bearer ' + getToken()
            }
          });
          if (typeof res.data === 'object' && res.data !== null) {
            this.invoiceModel = res.data;
            console.log(res.data);
            Loading.hide();
            this.invoiceDialog = true;
            return;
          }
        } catch (error) { }
        Notify.create({
          color: 'negative',
          'message': 'Ocurrió un error al mostrar la factura.'
        });
        Loading.hide();
      }
    }
  },
  mounted () {
    if (!getToken()) {
      return this.$router.push({ name: 'login' });
    }
    this.load();
  },
})
</script>
