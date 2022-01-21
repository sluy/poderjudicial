<template>
    <div class="q-pa-md" style="min-width:500px;">
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input type="email" outlined v-model="email" label="Correo electrónico" placeholder="email@example.com" />
            <q-input type="password"  outlined v-model="password" label="Contraseña" password="abc123"/>
            <div>
                <q-btn color="primary" label="iniciar sesión" class="full-width" @click="doLogin()" :disable="!canSend()"/>
            </div>
            
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent } from 'vue'
import { signin, getToken, isGuest, isAdmin } from '../extras/auth';
import { Loading, Notify } from 'quasar';

export default defineComponent({
  name: 'LoginPage',
  setup() {
      return {
        email: ref('admin@email.com'),
        password: ref('admin'),
        remember: ref(true),

        async doLogin () {
            Loading.show();
            try {
                await signin(this.email, this.password, this.remember);

                console.log(isGuest(), isAdmin());

                if (!isGuest()) {
                    Loading.hide();
                    if (isAdmin()) {
                        return this.$router.push({ name: 'admin' });
                    } else {
                        return this.$router.push({ name: 'user'});
                    }
                }
                Notify.create({
                   color: "negative",
                   message: 'Error interno.'
               });
            } catch (error) {
               Notify.create({
                   color: "negative",
                   message: 'Usuario inexistente o contraseña inválida.'
               });
            }
            Loading.hide();
        },
        canSend () {
            return this.email.length > 0 && this.password.length > 0 && 
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
        }
      }
  },
  
  mounted () {
    if (getToken()) {
        if (isAdmin()) {
            return this.$router.push({ name: 'admin' });
        } else {
            return this.$router.push({ name: 'user'});
        }
    }
  },
})
</script>
