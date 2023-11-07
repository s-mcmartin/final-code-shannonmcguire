import Contact from "./Contact";
import { RingLoader } from "react-spinners";
import { useGetContactsQuery } from "./contactApiSlice";
import useTitle from "../../hooks/useTitle";
import Table from '../../components/admin-view/Table'
const ContactList = () => {
  useTitle("SM_Portfolio: Contacts List");

  const {
    data: contacts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetContactsQuery("contactList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const controls = ['Name', 'Email', 'Subject', 'Message']
  let content;
  if (isLoading) content = <RingLoader />;
  if (isError) content = <p>{error?.data?.message}</p>;
  if (isSuccess) {
    const { ids } = contacts;
    const tableContent =
      ids?.length &&
      ids.map((contactId) => <Contact key={contactId} contactId={contactId} />);
    content = <Table controls={controls} tableContent={tableContent} />
  
  }
  return (
    <>
      <a className='underline text-2xl m-2 p-4' href="/admin/contacts/new">Add New Contact</a>
      {content}
    </>
  );
};

export default ContactList;
