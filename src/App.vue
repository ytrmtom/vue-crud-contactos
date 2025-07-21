<template>
  <ContactList
    :contacts="contacts"
    @delete="handleDelete"
  />
  <ContactForm
    :contact="currentContact"
    :isEditing="isEditing"
  />
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ContactList from './components/ContactList.vue';
import ContactForm from './components/ContactForm.vue';

const store = useStore();

const contacts = computed(() => store.state.contacts);
const currentContact = computed(() => store.state.currentContact);
const isEditing = computed(() => store.state.isEditing);

const handleDelete = (id) => {
  store.dispatch('deleteContact', id);
};
</script>
