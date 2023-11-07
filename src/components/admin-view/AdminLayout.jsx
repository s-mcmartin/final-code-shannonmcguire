import React from 'react'
import {Outlet} from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <div className='w-full h-[80vh]'>
      <Outlet />
      </div>
      <AdminFooter />
    </>
  )
}

export default AdminLayout
