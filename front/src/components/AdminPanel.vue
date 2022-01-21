<template>
    <div class="q-pa-md" style="min-width:500px;">
        <InvoicesPanel v-if="tab === 'invoices'"></InvoicesPanel>
    </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent } from 'vue'
import InvoicesPanel from './InvoicesPanel.vue';

export default defineComponent({
  name: 'AdminPanel',
  components: { InvoicesPanel },
  setup() {
      return {
          tab : ref('invoices'),
      }
  }
})
</script>
