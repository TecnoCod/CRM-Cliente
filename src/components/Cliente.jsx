import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, hanledEliminar}) => {

  const navigate = useNavigate()

  const {nombre,
    empresa,
    email,
    identidad,
    telefono,id} = cliente

  return (
    <tr className="border-b hover:bg-gray-50">
      <td>{nombre}</td>
      <td>{empresa}</td>
      <td>{telefono}</td>
      <td>
       <button
          type="button"
          className="bg-green-700 rounded block hover:bg-green-600 w-full text-white font-bold uppercase mb-2 mt-2"
          onClick={() => navigate(`/clientes/${id}`)}
        >
          Ver
        </button>        
        <button
          type="button"
          className="bg-amber-700 rounded block hover:bg-amber-600 w-full text-white font-bold uppercase mb-2"
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-700 hover:bg-red-600 rounded block w-full text-white font-bold uppercase mb-2"
          onClick={() =>hanledEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default Cliente