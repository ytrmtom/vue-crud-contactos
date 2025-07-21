import { createStore } from 'vuex';

export default createStore({
  state: {
    contacts: [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        address: '123 Maple Street',
        phone: '123-456-7890',
        country: 'USA',
        city: 'New York',
      },
      {
        id: 2,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        address: '456 Oak Avenue',
        phone: '987-654-3210',
        country: 'Canada',
        city: 'Toronto',
      },
      {
        id: 3,
        name: 'Carol White',
        email: 'carol.white@example.com',
        address: '789 Pine Road',
        phone: '555-123-4567',
        country: 'UK',
        city: 'London',
      },
      {
        id: 4,
        name: 'David Brown',
        email: 'david.brown@example.com',
        address: '321 Elm Street',
        phone: '444-555-6666',
        country: 'Australia',
        city: 'Sydney',
      },
      {
        id: 5,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        address: '654 Spruce Lane',
        phone: '333-444-5555',
        country: 'USA',
        city: 'Los Angeles',
      },
    ],
    showModal: false,
    isEditing: false,
    currentContact: {
      id: null,
      name: '',
      email: '',
      address: '',
      phone: '',
      country: '',
      city: '',
    },
  },
  mutations: {
    setShowModal(state, value) {
      state.showModal = value;
    },
    setIsEditing(state, value) {
      state.isEditing = value;
    },
    setEditingContact(state, contact) {
      state.currentContact = { ...contact };
    },
    resetForm(state) {
      state.currentContact = {
        id: null,
        name: '',
        email: '',
        address: '',
        phone: '',
        country: '',
        city: '',
      };
      state.isEditing = false;
    },
    addContact(state, contact) {
      const newId = state.contacts.length
        ? Math.max(...state.contacts.map(c => c.id)) + 1
        : 1;
      state.contacts.push({ ...contact, id: newId });
    },
    updateContact(state, contact) {
      const index = state.contacts.findIndex(c => c.id === contact.id);
      if (index !== -1) {
        state.contacts[index] = { ...contact };
      }
    },
    deleteContact(state, id) {
      state.contacts = state.contacts.filter(c => c.id !== id);
    },
  },
  actions: {
    addContact({ commit }, contact) {
      commit('addContact', contact);
    },
    updateContact({ commit }, contact) {
      commit('updateContact', contact);
    },
    deleteContact({ commit }, id) {
      commit('deleteContact', id);
    },
  },
});
