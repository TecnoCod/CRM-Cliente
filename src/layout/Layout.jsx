import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

  const location = useLocation()
  const urlActual = location.pathname
  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 px-5 py-10 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-4xl text-amber-700 text-center mt-8 mb-12 font-bold" >CRM - Clientes</h2>
        <nav className="mt-8">
            <Link to="/clientes" className={` ${urlActual === '/clientes' ? 'bg-gray-700' : 'dark:text-white'} flex mt-6 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Cliente</span>
            </Link>


            <Link to="/clientes/nuevo" className={` ${urlActual === '/clientes/nuevo' ? 'bg-gray-700' : 'dark:text-white'} flex mt-4 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Nuevo Cliente</span>
            </Link>
        </nav>
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
