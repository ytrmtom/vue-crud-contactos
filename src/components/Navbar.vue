<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Gestión de Contactos</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Inicio</router-link>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="openAddModal">Agregar Contacto</a>
            </li> -->
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/search">Filtrar Contactos</router-link>
            </li> -->
            <li class="nav-item">
              <router-link class="nav-link" to="/acerca">acerca de</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  const openAddModal = () => {
    store.commit('resetForm');
    store.commit('setShowModal', true);
  };
  </script>
  
  <style scoped>
  .navbar {
    padding: 15px 0;
  
    .nav-item {
      margin-left: 10px;
    }
  
    .nav-link {
      padding: 8px 15px;
      border-radius: 4px;
      transition: background-color 0.3s;
  
      &.router-link-active {
        background-color: color-mix(in srgb, var(--primary-color) 90%, white);
      }
    }
  }
  </style>