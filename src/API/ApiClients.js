import axios from "axios";

const API_URL = 'http://localhost:4000/api/cliente';

export const postRegisterClient = async (data) => {
  try {
    console.log('Datos originales recibidos:', data);
    
    // Limpiar y formatear los datos para enviar solo lo que necesitas
    const cleanData = {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      contrasenia: data.contrasenia || data.contraseña, // Usar cualquiera de los dos
      telefono: data.telefono,
      direccion: data.direccion
    };
    
    console.log('Datos limpiados para enviar:', cleanData);
    
    // Verificar que contrasenia no esté undefined
    if (!cleanData.contrasenia) {
      throw new Error('El campo contraseña es requerido');
    }
    
    const res = await axios.post(`${API_URL}/crearcliente`, cleanData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Respuesta exitosa:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    
    // Mostrar detalles específicos del error de validación
    if (error.response?.data?.detalles) {
      console.error('Detalles del error:', error.response.data.detalles);
      error.response.data.detalles.forEach((detalle, index) => {
        console.error(`Error ${index + 1}:`, detalle);
      });
    }
    
    throw error;
  }
}