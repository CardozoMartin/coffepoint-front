import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../../utils/Input';
import { useMutation } from '@tanstack/react-query';
import { postRegisterClient } from '../../../API/ApiClients';
import { toast } from 'sonner';

const FormRegister = () => {

    // Estado para manejar errores del servidor
    const [serverErrors, setServerErrors] = useState({});

    //RHF--------------------------------------------------
    const { register, formState: { errors }, handleSubmit: onSubmitRHF, reset } = useForm();

    //TQuery---------------------------------------------------
    const { mutate: postUser, isLoading } = useMutation({
        mutationFn: postRegisterClient,
        onSuccess: (data) => {
            //mostramos mensaje de exito
            toast.success('Usuario registrado exitosamente');
            //limpiamos cualquier error previo
            setServerErrors({});
            //reseteamos el formulario
            reset()
            //y aqui podriamos redirigir al formulario del logio o otro sitio

        },
        onError: (error) => {
            console.error('Por favor verifica los campos:', error);

            // Procesar errores del servidor
            toast.error(error.response.data.message);
            if (error.response?.data?.detalles) {
                const processedErrors = {};
                error.response.data.detalles.forEach((detalle) => {
                    // Asumimos que cada detalle tiene un campo 'campo' y 'mensaje'
                    if (detalle.campo && detalle.mensaje) {
                        processedErrors[detalle.campo] = detalle.mensaje;
                    }
                });
                setServerErrors(processedErrors);
                // Mostrar errores de validación específicos
                toast.warning('Por favor, verifique los campos marcados')
            } else {
                // Error genérico
                setServerErrors({ general: 'Por favor verifica los campos' });
            }
        }
    });

    //Handlers---------------------------------------------------
    const handleSubmit = (data) => {
        // Limpiar errores del servidor antes de enviar
        setServerErrors({});
        //cremos el formato del nuevo usaurio para que conisida con el back
        const newUser = {
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            direccion: data.direccion,
            telefono: data.telefono,
            contrasenia: data.contrasenia
        };

        console.log('Nuevo usuario:', newUser);

        // Enviamos el nuevo usuario al servidor
        postUser(newUser);
    };

    return (
        <form onSubmit={onSubmitRHF(handleSubmit)} className="form-register">
            {/* Mostrar error general si existe */}
            {serverErrors.general && (
                <div className="alert alert-danger mb-3">
                    {serverErrors.general}
                </div>
            )}

            <div className="mb-3">
                <Input
                    label="Nombre completo"
                    name="nombre"
                    id="nombre"
                    placeholder="Escribe tu nombre completo"
                    type="text"
                    error={errors.nombre || (serverErrors.nombre && { message: serverErrors.nombre })}
                    option={{
                        required: 'Este campo es requerido',
                        minLength: {
                            value: 2,
                            message: 'El nombre debe tener al menos 2 caracteres'
                        }
                    }}
                    register={register}
                />
            </div>

            <div className="mb-3">
                <Input
                    label="Apellido"
                    name="apellido"
                    id="apellido"
                    placeholder="Escribe tu apellido"
                    type="text"
                    error={errors.apellido || (serverErrors.apellido && { message: serverErrors.apellido })}
                    option={{
                        required: 'Este campo es requerido',
                        minLength: {
                            value: 2,
                            message: 'El apellido debe tener al menos 2 caracteres'
                        }
                    }}
                    register={register}
                />
            </div>

            <div className="mb-3">
                <Input
                    label="Correo electrónico"
                    name="email"
                    placeholder="tu@email.com"
                    type="email"
                    register={register}
                    error={errors.email || (serverErrors.email && { message: serverErrors.email })}
                    option={{
                        required: 'Este campo es requerido',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'El correo electrónico no es válido'
                        }
                    }}
                />
            </div>

            <div className="mb-3">
                <div className="position-relative">
                    <Input
                        label="Direccion"
                        name="direccion"
                        type="text"
                        id="direccion"
                        placeholder="ingrese su direccion"
                        register={register}
                        error={errors.direccion || (serverErrors.direccion && { message: serverErrors.direccion })}
                        option={{
                            required: 'Este campo es requerido',
                            minLength: {
                                value: 6,
                                message: 'La dirección debe tener al menos 6 caracteres'
                            }
                        }}
                    />
                </div>
            </div>

            <div className="mb-3">
                <div className="position-relative">
                    <Input
                        label="Teléfono"
                        name="telefono"
                        type="text"
                        id="telefono"
                        placeholder="Ej: +5493815555555 o 3815555555"
                        register={register}
                        error={errors.telefono || (serverErrors.telefono && { message: serverErrors.telefono })}
                        option={{
                            required: 'Este campo es requerido',
                            pattern: {
                                value: /^\+?\d{7,15}$/,
                                message: 'El teléfono debe tener entre 7 y 15 dígitos, puede incluir + al inicio'
                            }
                        }}
                    />
                </div>
            </div>

            <div className="mb-4">
                <Input
                    label="Contraseña"
                    name="contrasenia"
                    id="contrasenia"
                    type="password"
                    placeholder="••••••••"
                    register={register}
                    error={errors.contrasenia || (serverErrors.contrasenia && { message: serverErrors.contrasenia })}
                    option={{
                        required: 'Este campo es requerido',
                        minLength: {
                            value: 6,
                            message: 'La contraseña debe tener al menos 6 caracteres'
                        }
                    }}
                />
            </div>

            <button
                type="submit"
                className="btn btn-coffee"
                disabled={isLoading}
            >
                {isLoading ? 'Registrando...' : 'registrar'}
            </button>
        </form>
    )
}

export default FormRegister