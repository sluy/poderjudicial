<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Poder Judicial
        </q-toolbar-title>
        
        <div v-if="isGuest()">
          -
        </div>
        <div v-else>
          ¡Bienvenido nuevamente!.
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          title="Iniciar Sesión"
          icon="school"
          caption="Conecte con su cuenta"
          :to="{ name: 'login'}"
          v-show="isGuest()"
        />
        
        <EssentialLink
          title="Registrarse"
          icon="school"
          caption="Cree su cuenta grátis"
          :to="{ name: 'signup'}"
          v-show="isGuest()"
        />
        
        <EssentialLink
          title="Comprar"
          icon="school"
          caption="Compre productos en nuestra plataforma"
          :to="{ name: 'user'}"
          v-show="!isGuest() && !isAdmin()"
        />

        <EssentialLink
          title="Facturación"
          icon="school"
          caption="Genere y revise facturas"
          :to="{ name: 'admin'}"
          v-show="!isGuest() && isAdmin()"
        />
        <!--
        <EssentialLink
          title="Productos"
          icon="school"
          caption="Cree,edite y elimine el stock"
          :to="{ name: 'products'}"
          v-show="!isGuest() && isAdmin()"
        />
        -->

        <EssentialLink
          title="Salir"
          icon="school"
          caption="Cierre sesión en el dispositivo"
          :to="{ name: 'signout'}"
          v-show="!isGuest()"
        />


      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
];

import { defineComponent, ref } from 'vue'
import {isGuest, isAdmin} from '../extras/auth';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      user: false,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      isGuest : isGuest,
      isAdmin : isAdmin
    }
  }
})
</script>
