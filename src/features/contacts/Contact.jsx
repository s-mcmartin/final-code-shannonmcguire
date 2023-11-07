import { useGetContactsQuery } from "./contactApiSlice";
import { useNavigate } from 'react-router-dom';
import {memo} from 'react'

const Contact = ({ contactId }) => {
  const { contact } = useGetContactsQuery("contactList", {
    selectFromResult: ({ data }) => ({
      contact: data?.entities[contactId],
    }),
  });

const navigate = useNavigate();

  if(contact) {
    const handleEdit = () => navigate(`/admin/contacts/${contactId}`);
  
    
    return <tr className='grid grid-cols-5 justify-center gap-2 border'>
   
    <td className={`flex justify-center items-center overflow-auto`}>{contact.name}</td>
    <td className={`flex justify-center items-center overflow-auto`}>{contact.email}</td>
    <td className={`flex justify-center items-center overflow-auto`}>{contact.subject}</td>
    <td className={`flex justify-center items-center overflow-auto`}>{contact.message}</td>
  
    <td className={`flex justify-center items-center overflow-auto`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </td>
    </tr>
  } else return null;
};

const memoizedContact = memo(Contact)
export default memoizedContact;
