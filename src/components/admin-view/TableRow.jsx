import React from 'react'

const TableRow = ({controls, handleEdit, cellStatus}) => {
  return (
    <tr className='grid grid-cols-8 justify-center gap-2 border'>
   {controls.map(control =>  <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{course.name}</td> )}
   
   
    <td className={`table__cell ${cellStatus} flex justify-center items-center overflow-auto`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </td>
    </tr>
  )
}

export default TableRow
