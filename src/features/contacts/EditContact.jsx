import EditContactForm from "./EditContactForm";
import { RingLoader } from "react-spinners";
import { useGetContactsQuery } from "./contactApiSlice";
import { useParams } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const EditContact = () => {
  useTitle("SM_Portfolio: Edit Contact");
  const { id } = useParams();
  const { contact } = useGetContactsQuery("contactList", {
    selectFromResult: ({ data }) => ({
      contact: data?.entities[id],
    }),
  });

  if (!contact) return <RingLoader />;
  return <EditContactForm contact={contact} />;
};

export default EditContact;
