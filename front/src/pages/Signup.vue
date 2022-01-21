<template>
    <div class="q-pa-md" style="min-width:500px;">
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input type="name" outlined v-model="name" label="Nombre" placeholder="Pedro Perez" />
            <q-input type="email" outlined v-model="email" label="Correo electrónico" placeholder="email@example.com" />
            <q-input type="password"  outlined v-model="password" label="Contraseña" password="abc123"/>
            <div>
                <q-btn color="primary" label="registrarse" class="full-width" @click="doSignup()" :disable="!canSend()"/>
            </div>
            
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent } from 'vue'
import { signup, getToken } from '../extras/auth';
import { Notify, Loading } from 'quasar';
export default defineComponent({
  name: 'Signup',
  setup() {
      return {
        name: ref(''),
        email: ref(''),
        password: ref(''),
        async doSignup () {
            try {
                await signup(this.name, this.email, this.password);
                Notify.create({
                    color: 'positive',
                    message: 'Cuenta creada exitosamente, inicie sesión.'
                })
                Loading.hide();
                return this.$router.push({ name: 'login' });
            } catch (error) {
                Notify.create({
                    color: 'negative',
                    message: 'La cuenta ya existe.'
                });
            }
            Loading.hide();
        },
        canSend () {
            return this.name.length > 0 && this.email.length > 0 && this.password.length > 0 && 
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
