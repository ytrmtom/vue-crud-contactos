<template>
  <div class="container">
    <h2 class="text-center mb-4">Lista de Contactos</h2>
    <ContactList :contacts="filteredContacts" @delete="deleteContact" />
    <ContactForm v-model:contact="store.state.newContact" :is-editing="store.state.isEditing" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ContactList from '../components/ContactList.vue';
import ContactForm from '../components/ContactForm.vue';

const store = useStore();
const filteredContacts = computed(() => store.getters.filteredContacts);

const deleteContact = (id) => {
  store.dispatch('deleteContact', id);
};
</script>

<style scoped>
h2 {
  color: var(--primary-color);
  font-weight: bold;
  margin-bottom: 20px;
}
</style>