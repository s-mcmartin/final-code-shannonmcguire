

const Table = ({controls, tableContent}) => {
  return (
    <table className='p-2 mt-4'>
    <thead className=''>
    <tr className={`grid grid-cols-${controls.length + 1} justify-center gap-2 bg-primary text-light`}>
   {controls.map(control => <th key={control} scope='col' className=''>{control}</th>)}  
    
    <th scope='col' className=''>Edit</th>
    </tr>
    </thead>
    <tbody>{tableContent}</tbody>
    </table>
  )
}

export default Table
