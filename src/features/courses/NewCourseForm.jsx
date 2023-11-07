import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";
import { useAddNewCourseMutation } from "./coursesApiSlice";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const NewCourseForm = () => {
  useTitle("SM_Portfolio: New Contact Admin Form");

  const [addNewCourse, { isLoading, isSuccess, isError, error }] =
    useAddNewCourseMutation();

  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [instructor, setInstructor] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [tech, setTech] = useState([]);
  const [techItem, setTechItem] = useState("");
  const [courseLink, setCourseLink] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setOrganization("");
      setInstructor("");
      setDescription("");
      setFeatured(false);
      setTech([]);
      setCourseLink("");
      navigate("/admin/courses");
    }
  }, [isSuccess, navigate]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeOrganization = (e) => setOrganization(e.target.value);
  const handleChangeInstructor = (e) => setInstructor(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeFeatured = (e) => setFeatured(e.target.value);
  const handleChangeTechItem = (e) => {
    setTechItem(e.target.value);
  };
  const handleAddTechItem = () => {
    setTech([...tech, techItem]);
    setTechItem("");
  };
  const handleChangeCourseLink = (e) => setCourseLink(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoading && name !== "") {
      await addNewCourse({
        name,
        organization,
        instructor,
        description,
        featured,
        tech,
        courseLink,
      });
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
            <label className="" htmlFor="organization">
              Organization
            </label>
            <input
              className=""
              id="organization"
              name="organization"
              type="text"
              value={organization}
              onChange={handleChangeOrganization}
            />
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
            <label className="" htmlFor="instructor">
              Instructor
            </label>
            <input
              className=""
              id="instructor"
              name="instructor"
              type="text"
              value={instructor}
              onChange={handleChangeInstructor}
            />
            <label className="" htmlFor="description">
              Description
            </label>
            <textarea
              className=""
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={handleChangeDescription}
            />
            <label className="" htmlFor="featured">
              Featured
            </label>
            <input
              className=""
              id="featured"
              name="featured"
              type="checkbox"
              checked={true}
              value={featured}
              onChange={handleChangeFeatured}
            />
            <div className="">
              <label className="" htmlFor="tech">
                Tech
              </label>
              <input
                className=""
                id="tech"
                name="tech"
                type="text"
                value={techItem}
                onChange={handleChangeTechItem}
              />
              <button className="" type="button" onClick={handleAddTechItem}>
                +
              </button>
              <p>{tech}</p>
            </div>
            <label className="" htmlFor="courseLink">
              Course Link
            </label>
            <input
              className=""
              id="courseLink"
              name="courseLink"
              type="text"
              value={courseLink}
              onChange={handleChangeCourseLink}
            />
            <button
              className=""
              title="Save"
              disabled={name === "" ? true : false}
            >
              Add New CourseList
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewCourseForm;
