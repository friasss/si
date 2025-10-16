<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Registro de Estudiantes</h2>

    <b-form @submit.prevent="agregarEstudiante">
      <b-form-group label="Nombre:">
        <b-form-input v-model="nuevoEstudiante.nombre" required placeholder="Escribe el nombre"></b-form-input>
      </b-form-group>

      <b-form-group label="Edad:">
        <b-form-input v-model="nuevoEstudiante.edad" type="number" required placeholder="Edad"></b-form-input>
      </b-form-group>

      <b-form-group label="Curso:">
        <b-form-input v-model="nuevoEstudiante.curso" required placeholder="Ej: 5to B"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success">Agregar Estudiante</b-button>
    </b-form>

    <b-table striped hover :items="estudiantes" class="mt-4"></b-table>

    <b-modal id="modal-confirm" title="Estudiante agregado" hide-footer>
      <p class="my-2">El estudiante fue agregado correctamente.</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nuevoEstudiante: { nombre: '', edad: '', curso: '' },
      estudiantes: []
    }
  },
  methods: {
    agregarEstudiante() {
      this.estudiantes.push({ ...this.nuevoEstudiante })
      this.nuevoEstudiante = { nombre: '', edad: '', curso: '' }
      this.$bvModal.show('modal-confirm')
    }
  }
}

</script>

<style>
/* Estilo opcional para que se vea más bonito */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

