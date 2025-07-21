<template>
  <div
    class="modal"
    id="contactModal"
    tabindex="-1"
    :class="{ 'd-block': store.state.showModal }"
    style="background-color: rgba(0,0,0,0.5);"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEditing ? 'Editar Contacto' : 'Nuevo Contacto' }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveContact">
            <div class="mb-3">
              <label for="name" class="form-label">Nombre</label>
              <input
                v-model="localContact.name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                id="name"
              />
              <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Correo Electrónico</label>
              <input
                v-model="localContact.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                id="email"
              />
              <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Dirección</label>
              <input
                v-model="localContact.address"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.address }"
                id="address"
              />
              <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Teléfono</label>
              <input
                v-model="localContact.phone"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.phone }"
                id="phone"
              />
              <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
            </div>
            <div class="mb-3">
              <label for="country" class="form-label">País</label>
              <input
                v-model="localContact.country"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.country }"
                id="country"
              />
              <div v-if="errors.country" class="invalid-feedback">{{ errors.country }}</div>
            </div>
            <div class="mb-3">
              <label for="city" class="form-label">Ciudad</label>
              <input
                v-model="localContact.city"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.city }"
                id="city"
              />
              <div v-if="errors.city" class="invalid-feedback">{{ errors.city }}</div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">
                {{ isEditing ? 'Actualizar' : 'Guardar' }}
              </button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

// Props
const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const store = useStore();
const errors = ref({});

// Clonamos el contacto para trabajar localmente sin mutar el prop
const localContact = ref({ ...props.contact });

// Sincronizar localContact cuando props.contact cambie (esto arregla el problema de editar)
watch(
  () => props.contact,
  (newContact) => {
    localContact.value = { ...newContact };
  },
  { immediate: true }
);

// Manejo modal Bootstrap manual
watch(
  () => store.state.showModal,
  (newValue) => {
    const modalElement = document.getElementById('contactModal');
    if (!modalElement) return;

    if (newValue) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      document.body.classList.add('modal-open');
      localContact.value = { ...props.contact };
    } else {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
);

const closeModal = () => {
  store.commit('setShowModal', false);
};

const handleClickOutside = (event) => {
  const modal = document.getElementById('contactModal');
  if (event.target === modal) closeModal();
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
});

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!localContact.value.name || localContact.value.name.length < 2) {
    errors.value.name = 'El nombre debe tener al menos 2 caracteres';
    isValid = false;
  }
  if (!localContact.value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localContact.value.email)) {
    errors.value.email = 'Ingrese un correo electrónico válido';
    isValid = false;
  }
  if (!localContact.value.address || localContact.value.address.length < 5) {
    errors.value.address = 'La dirección debe tener al menos 5 caracteres';
    isValid = false;
  }
  if (!localContact.value.phone) {
    errors.value.phone = 'El teléfono es obligatorio';
    isValid = false;
  }
  if (!localContact.value.country || localContact.value.country.length < 2) {
    errors.value.country = 'El país debe tener al menos 2 caracteres';
    isValid = false;
  }
  if (!localContact.value.city || localContact.value.city.length < 2) {
    errors.value.city = 'La ciudad debe tener al menos 2 caracteres';
    isValid = false;
  }

  return isValid;
};

const saveContact = () => {
  if (validateForm()) {
    if (store.state.isEditing) {
      store.dispatch('updateContact', { ...localContact.value });
    } else {
      store.dispatch('addContact', { ...localContact.value });
    }
    closeModal();
  }
};
</script>

<style scoped>
.modal-footer {
  .btn {
    padding: 8px 15px;
    border-radius: var(--border-radius);
  }
}
</style>
