import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";
import { useAddNewContactMutation } from "./contactApiSlice";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const NewContactForm = () => {
  useTitle("SM_Portfolio: New Contact Admin Form");

  const [addNewContact, { isLoading, isSuccess, isError, error }] =
    useAddNewContactMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      navigate("/admin/contacts");
    }
  }, [isSuccess, navigate]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeSubject = (e) => setSubject(e.target.value);
  const handleChangeMessage = (e) => setMessage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !isLoading &&
      name !== "" &&
      email !== "" &&
      subject !== "" &&
      message !== ""
    ) {
      await addNewContact({ name, email, subject, message });
    }
  };

  return (
    <>
      {isLoading && <RingLoader />}
      {isError && <p>{error?.data?.message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="">
          <h2>New Contact</h2>
          <div className="">
            <label className="" htmlFor="name">
              Name
            </label>
            <input
              className=""
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleChangeName}
            />
            <label className="" htmlFor="email">
              Email
            </label>
            <input
              className=""
              id="email"
              name="name"
              type="email"
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
              value={message}
              onChange={handleChangeMessage}
            />
            <button
              className=""
              title="Save"
              disabled={
                name === "" || email === "" || subject === "" || message === ""
                  ? true
                  : false
              }
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewContactForm;
