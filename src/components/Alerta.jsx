import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="text-center my-3 bg-red-700 text-white font-bold p-2 uppercase">
    {children}
  </div>
  )
}

export default Alerta