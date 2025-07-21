<template>
  <div>
    <button class="btn btn-primary mb-3" @click="openAddModal">Agregar Contacto</button>

    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>País</th>
          <th>Ciudad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.id }}</td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.address }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.country }}</td>
          <td>{{ contact.city }}</td>
          <td>
            <button class="btn btn-sm btn-primary me-2" @click="editContact(contact)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="deleteContact(contact.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const contacts = computed(() => store.state.contacts);

const openAddModal = () => {
  store.commit('resetForm');
  store.commit('setIsEditing', false);
  store.commit('setShowModal', true);
};

const editContact = (contact) => {
  store.commit('setEditingContact', contact);
  store.commit('setIsEditing', true);
  store.commit('setShowModal', true);
};

const deleteContact = (id) => {
  if (confirm('¿Está seguro que desea eliminar este contacto?')) {
    store.dispatch('deleteContact', id);
  }
};
</script>
