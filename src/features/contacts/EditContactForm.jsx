import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from "./contactApiSlice";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const EditContactForm = (contact) => {
  const [updateContact, { isLoading, isSuccess, isError, error }] =
    useUpdateContactMutation();
  const [
    deleteContact,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteContactMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [subject, setSubject] = useState(contact.subject);
  const [message, setMessage] = useState(contact.message);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      navigate("/admin/contacts");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeSubject = (e) => setSubject(e.target.value);
  const handleChangeMessage = (e) => setMessage(e.target.message);

  const handleUpdateContact = async (e) => {
    await updateContact({ id: contact.id, name, email, subject, message });
  };

  const handleDeleteContact = async () => {
    await deleteContact({ id: contact.id });
  };

  const errContent = error?.data?.message || delError?.data?.message;

  return (
    <>
      {isError || (isDelError && <p>{errContent}</p>)}
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Edit Contact</h2>
        <label className="" htmlFor="name">
          Name
        </label>
        <input
          className=""
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={handleChangeName}
        />
        <label className="" htmlFor="email">
          Email
        </label>
        <input
          className=""
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          value={email}
          onChange={handleChangeEmail}
        />
        <label className="" htmlFor="subject">
          Subject
        </label>
        <input
          className=""
          id="subject"
          name="subject"
          type="text"
          autoComplete="off"
          value={subject}
          onChange={handleChangeSubject}
        />
        <label className="" htmlFor="message">
          Message
        </label>
        <textarea
          className=""
          id="message"
          name="message"
          type="text"
          autoComplete="off"
          value={message}
          onChange={handleChangeMessage}
        />
        <button
          className=""
          title="Update"
          onClick={handleUpdateContact}
          disabled={isLoading ? true : false}
        >
          Update
        </button>
        <button className="" title="Delete" onClick={handleDeleteContact}>
          Delete
        </button>
      </form>
    </>
  );
};

export default EditContactForm;
