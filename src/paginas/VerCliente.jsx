import { useParams } from 'react-router-dom'
import {useEffect,useState} from 'react'

const VerCliente = () => {

  const {id} = useParams();

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const getCliente = async () =>{
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const consultar = await fetch(url)
        const respuesta = await consultar.json()
        setCliente(respuesta)
        
      } catch (error) {
        console.error(error)
      }
      setCargando(!cargando);
    }
    getCliente();

  }, []);

  return (
    cargando ? <p className="text-gray-800 font-bold text-4xl text-center">Cargando...</p> :
    Object.keys(cliente).length === 0 ? <p className="text-gray-800 font-bold text-4xl">No hay Resultados</p> : (
    <>
      <div>
        <h1 className="dark:text-gray-800 text-4xl font-black">Información del Cliente: {cliente.nombre}</h1>
        <p className="mt-3 mb-6 border-b">Informacion relacionada con el Cliente.</p>

        <p className="text-2xl p-4 border-b">
          <span className="text-gray-700 uppercase font-bold p-3">Cliente:</span>
          {cliente.nombre}  
        </p>
        <p className="text-2xl p-4 border-b">
          <span className="text-gray-700 uppercase font-bold p-3">Empresa:</span>
          {cliente.empresa}  
        </p>
        <p className="text-2xl p-4 border-b">
          <span className="text-gray-700 uppercase font-bold p-3">E-mail:</span>
          {cliente.email}  
        </p>
        <p className="text-2xl p-4 border-b">
          <span className="text-gray-700 uppercase font-bold p-3">Identidad:</span>
          {cliente.identidad}  
        </p>
        <p className="text-2xl p-4 border-b">
          <span className="text-gray-700 uppercase font-bold p-3">telefono:</span>
          {cliente.telefono}  
        </p>
        <p className="text-2xl p-4 border-b">
          <span className="text-gray-700 uppercase font-bold p-3">direccion:</span>
          {cliente.direccion}  
        </p>
        {cliente.nota && (
          <p className="text-2xl p-4 border-b">
            <span className="text-gray-700 uppercase font-bold p-3">nota:</span>
            {cliente.nota}  
          </p>
        )}
      </div>
    </>
    )
  )
}

export default VerCliente