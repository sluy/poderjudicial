<template>
    <div class="q-pa-md" style="min-width:500px;">
        Cerrar sesión
    </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent } from 'vue'
import { signout } from '../extras/auth';
import { Notify, Loading } from 'quasar';

export default defineComponent({
  name: 'Signout',
  setup() {
      return {}
  },
  async mounted () {
      Loading.show();
      await signout();
      this.$router.push({ name: 'login'});
      Notify.create({
          color: 'positive',
          message: 'Sesión cerrada exitosamente.'
      });
      Loading.hide();
  }
})
</script>
