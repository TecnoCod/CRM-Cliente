import React from 'react'
import {Formik, Form, Field} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
                .min(3, 'el nombre es muy corto')
                .required('EL nombre del Cliente es obligatorio'),
    empresa:  Yup.string().required('El nombre de la empresa es obligatorio'),
    email : Yup.string()
                .required('el email es obligatorio')
                .email('Debe ser un email valido'),
    identidad : Yup.number().required('la identidad es obligatoria').positive('numero no valido'),
    telefono : Yup.number().typeError('el numero no es valido').positive('numero no valido'),
    direccion : Yup.string().required('la direccion es obligatoria'),
  })

  const handleSumit = async (valores) =>{
    
    try {
      let respuesta
      if(cliente.id){
        // EDitar registro
        const urlApi = `http://localhost:4000/clientes/${cliente.id}`      
        respuesta = await fetch(urlApi, {
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {'Content-Type': 'application/json'}
        })
      }else{
        // Nuevo registro
        const urlApi = 'http://localhost:4000/clientes'      
        respuesta = await fetch(urlApi, {
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {'Content-Type': 'application/json'}
        })
      }
      await respuesta.json()
      navigate('/clientes')
    } catch (error) {
      console.error(error)
    }

  }

  return (
    cargando ? <p className="text-gray-800 font-bold text-4xl text-center">Cargando...</p> : (
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-amber-700 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar CLiente' : 'Agregar Cliente'}</h1>

        <Formik
          initialValues={{
            nombre:cliente?.nombre ?? "", //object?.propiedad ?? "" nos dice que si llega undefine entonces 
            // le asigne un string vacio, es una validacion.
            empresa: cliente?.empresa ?? "",
            email : cliente?.email ?? "",
            identidad : cliente?.identidad ?? "",
            telefono : cliente?.telefono ?? "",
            direccion : cliente?.direccion ?? "",
            notas : cliente?.notas ?? "",
          }}
          enableReinitialize={true}
          onSubmit={ async (valores, {resetForm})=>{
            await  handleSumit(valores)
            resetForm()
          }}
          validationSchema={nuevoClienteSchema}
        >
          {({errors, touched}) => {
            return( 
            
            <Form
              className="mt-10"
            >
              <div className="mb-4">
                <label 
                  className="text-gray-800" 
                  htmlFor="nombre"
                >Nombre:
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />

                {errors.nombre && touched.nombre ? (
                  <Alerta children={errors.nombre}/>
                ): null}
              </div>

              <div className="mb-4">
                <label 
                  className="text-gray-800" 
                  htmlFor="empresa"
                >Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta children={errors.empresa}/>
                ): null}
              </div>

              <div className="mb-4">
                <label 
                  className="text-gray-800" 
                  htmlFor="email"
                >E-mail:
                </label>
                <Field
                  id="email"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email de la empresa"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta children={errors.email}/>
                ): null}
              </div>

              <div className="mb-4">
                <label 
                  className="text-gray-800" 
                  htmlFor="identidad"
                >Identidad:
                </label>
                <Field
                  id="identidad"
                  type="number"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Identificacion o nit del cliente"
                  name="identidad"
                />
                {errors.identidad && touched.identidad ? (
                  <Alerta children={errors.identidad}/>
                ): null}
              </div>

              <div className="mb-4">
                <label 
                  className="text-gray-800" 
                  htmlFor="telefono"
                >Telefono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono del cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta children={errors.telefono}/>
                ): null}
              </div>

              <div className="mb-4">
                <label 
                  className="text-gray-800" 
                  htmlFor="direccion"
                >Direccion:
                </label>
                <Field
                  id="direccion"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Direccion de la empresa o cliente"
                  name="direccion"
                />
                {errors.direccion && touched.direccion ? (
                  <Alerta children={errors.direccion}/>
                ): null}
              </div>

              <div className="mb-4">
                <label 
                  className="text-gray-800" 
                  htmlFor="notas"
                >Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del cliente"
                  name="notas"
                />
              </div>
              <input 
                type="submit"
                value={cliente?.nombre ? 'Editar CLiente' : 'Agregar Cliente'}
                className="mt-5 w-full bg-amber-700 p-3 rounded-md font-bold text-white uppercase text-lg hover:bg-amber-600"
              />
            </Form>

          )}}
        </Formik>
      </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}
export default Formulario