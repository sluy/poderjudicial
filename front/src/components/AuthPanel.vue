<template>
    <div class="q-pa-md" style="min-width:500px;">
        <signup-panel v-if="(signup)"></signup-panel>
        <login-panel v-else></login-panel>
        <div class="text-center">
            O quizas prefieras <q-btn :label="(signup) ? 'iniciar sesión' : 'registrarte'" @click="toggle()"></q-btn>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent } from 'vue'
import SignupPanel from './SignupPanel.vue'
import LoginPanel from './LoginPanel.vue';

export default defineComponent({
  name: 'AuthPanel',
  components: { SignupPanel, LoginPanel},
  setup() {
      return {
        signup: ref(false),

        toggle () {
            this.signup = !this.signup;
        }
      }
  }
})
</script>
