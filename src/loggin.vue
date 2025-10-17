<template>
  <div class="auth-container">
    <div class="card">
      <h2>{{ modo === "login" ? "Iniciar Sesión" : "Registrarse" }}</h2>

      <form @submit.prevent="handleSubmit">
        <!-- Nombre solo aparece en modo registro -->
        <div v-if="modo === 'registro'">
          <label>Nombre</label>
          <input
            v-model="nombre"
            type="text"
            placeholder="Tu nombre completo"
            required
          />
        </div>

        <label>Correo</label>
        <input
          v-model="correo"
          type="email"
          placeholder="ejemplo@correo.com"
          required
        />

        <label>Contraseña</label>
        <input
          v-model="contrasena"
          type="password"
          placeholder="********"
          required
        />

        <button type="submit" class="btn-primary">
          {{ modo === "login" ? "Iniciar Sesión" : "Registrarse" }}
        </button>
      </form>

      <p class="toggle">
        {{ modo === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?" }}
        <a href="#" @click.prevent="toggleModo">
          {{ modo === "login" ? "Regístrate aquí" : "Inicia sesión" }}
        </a>
      </p>

      <p v-if="mensaje" :class="['msg', mensaje.includes('✅') ? 'success' : 'error']">
        {{ mensaje }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const modo = ref("login"); // 'login' o 'registro'
const nombre = ref("");
const correo = ref("");
const contrasena = ref("");
const mensaje = ref("");

// Cambiar entre login / registro
const toggleModo = () => {
  modo.value = modo.value === "login" ? "registro" : "login";
  mensaje.value = "";
  nombre.value = "";
  correo.value = "";
  contrasena.value = "";
};

// Manejar envío del formulario
const handleSubmit = async () => {
  try {
    const endpoint =
      modo.value === "login"
        ? "http://localhost:2025/login"
        : "http://localhost:2025/registrar";

    const payload =
      modo.value === "login"
        ? { correo: correo.value, contrasena: contrasena.value }
        : {
            nombre: nombre.value,
            correo: correo.value,
            contrasena: contrasena.value,
          };

    const res = await axios.post(endpoint, payload);

    // Mostrar mensaje de éxito
    mensaje.value = res.data.mensaje || "✅ Operación exitosa";

    console.log("Respuesta:", res.data);
  } catch (err) {
    console.error("Error:", err);
    if (err.response && err.response.data) {
      mensaje.value = err.response.data.mensaje || err.response.data.error || "❌ Error en la operación";
    } else {
      mensaje.value = "❌ Error en la operación";
    }
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(120deg, #89f7fe, #66a6ff);
  font-family: "Poppins", sans-serif;
}

.card {
  background: white;
  padding: 30px 40px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: 0.2s;
}

input:focus {
  border-color: #66a6ff;
  box-shadow: 0 0 3px #66a6ff;
}

.btn-primary {
  background: #66a6ff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  background: #5498f7;
}

.toggle {
  margin-top: 10px;
  font-size: 0.9rem;
}

.toggle a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.msg {
  margin-top: 15px;
  font-weight: bold;
}

.msg.success {
  color: green;
}

.msg.error {
  color: red;
}
</style>
