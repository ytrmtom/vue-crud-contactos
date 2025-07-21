<template>
    <div class="container">
      <h2 class="text-center mb-4">{{ store.state.isEditing ? 'Editar Contacto' : 'Agregar Contacto' }}</h2>
      <ContactForm
        v-model:contact="store.state.newContact"
        :is-editing="store.state.isEditing"
        @save="saveContact"
        @cancel="cancelEdit"
      />
    </div>
  </template>
  
  <script setup>
  import { useStore } from 'vuex';
  import ContactForm from '../components/ContactForm.vue';
  
  const store = useStore();
  
  const saveContact = (contact) => {
    store.dispatch('saveContact', contact);
  };
  const cancelEdit = () => {
    store.commit('resetForm');
  };
  </script>
  
  <style scoped lang="scss">
  @import '@/assets/styles.scss';
  h2 {
    color: $primary-color;
    font-weight: bold;
    margin-bottom: 20px;
  }
  </style>