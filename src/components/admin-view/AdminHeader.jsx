import React from 'react'
import {Link} from 'react-router-dom';

const AdminHeader = () => {
  return (
    <div className='uppercase w-full text-center space-x-12 font-bold text-2xl justify-center px-12 items-center'>
      <Link to='/admin/contacts'>Contacts</Link>
      <Link to='/admin/courses'>Courses</Link>
      <Link to='/admin/projects'>Projects</Link>
      <Link to='/admin/users'>Users</Link>
    </div>
  )
}

export default AdminHeader
