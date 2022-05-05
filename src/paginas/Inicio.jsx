import {useState, useEffect} from 'react'
import Cliente from '../components/Cliente';


const Inicio = () => {

  const [cliente, setCliente] = useState([]);
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const jsonApi = import.meta.env.VITE_API_URL
        const resultado = await fetch(jsonApi)
        const respuesta = await resultado.json()
        
        setCliente(respuesta)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerCliente()
  }, []);

  const hanledEliminar = async id => {
    const confirmar = confirm('¿Deseas Eliminar el CLiente?')

    if(confirmar){
      try {
        const urlApi = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch(urlApi, {
          method: 'DELETE',
        })
        await respuesta.json()

        const arrayClientes = cliente.filter(cliente => cliente.id !== id)
        setCliente(arrayClientes)
      } catch (error) {
        console.error(error)
      }

    }
  }

  return (

    <>
      <h1 className="dark:text-gray-800 text-4xl font-black">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Nombre</th>
            <th className="p-3">Empresa</th>
            <th className="p-3">Telefono</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cliente.map(cliente=>(
            <Cliente 
              key={cliente.id}
              cliente={cliente}
              hanledEliminar={hanledEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Inicio







