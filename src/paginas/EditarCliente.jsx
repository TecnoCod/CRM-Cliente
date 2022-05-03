import Formulario from '../components/Formulario'
import { useParams } from 'react-router-dom'
import {useEffect,useState} from 'react'

const EditarCliente = () => {

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
    <>
      <h1 className="dark:text-gray-800 text-4xl font-black">Editar Cliente</h1>
      <p className="mt-3">Ingresa los datos en el fomulario para editar o actualizar un Cliente.</p>
      
      {cliente?.nombre ? (
        <Formulario 
          cliente={cliente}
          cargando={cargando}
        />
      ):<p className="text-gray-800 text-2xl font-black text-center mt-8">Cliente ID no valido</p>}

    </>
  )
}

export default EditarCliente
