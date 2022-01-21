<template>
  <q-page class="flex flex-center">
    <auth-panel v-if="isGuest()"></auth-panel>
    <admin-panel v-else-if="isAdmin()"></admin-panel>
    <user-panel v-else></user-panel>
    <div>{{usermodel}}</div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import AuthPanel from 'components/AuthPanel.vue'
import AdminPanel from 'components/AdminPanel.vue'
import UserPanel from 'components/UserPanel.vue'


import { isAdmin, isGuest } from '../extras/auth';

export default defineComponent({
  name: 'PageIndex',
  components: { AuthPanel, AdminPanel, UserPanel },
  setup() {
    return { isGuest, isAdmin }
  }
})
</script>
