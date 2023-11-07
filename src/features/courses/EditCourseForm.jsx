import {
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} from "./coursesApiSlice";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const EditCourseForm = (course) => {
  const [updateCourse, { isLoading, isSuccess, isError, error }] =
    useUpdateCourseMutation();
  const [
    deleteCourse,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteCourseMutation();

  const navigate = useNavigate();

  const [techItem, setTechItem] = useState("");

  const [name, setName] = useState(course.name);
  const [organization, setOrganization] = useState(course.organization);
  const [instructor, setInstructor] = useState(course.instructor);
  const [description, setDescription] = useState(course.description);
  const [tech, setTech] = useState(course.tech);
  const [featured, setFeatured] = useState(course.featured);
  const [courseLink, setCourseLink] = useState(course.courseLink);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setOrganization("");
      setInstructor("");
      setDescription("");
      setTech([]);
      setFeatured(false);
      setCourseLink("");
      navigate("/admin/courses");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeOrganization = (e) => setOrganization(e.target.value);
  const handleChangeInstructor = (e) => setInstructor(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeFeatured = (e) => setFeatured(e.target.value);
  const handleChangeTechItem = (e) => setTechItem(e.target.value);
  const handleChangeCourseLink = (e) => setCourseLink(e.target.value);

  const handleUpdateCourse = async () => {
    await updateCourse({
      id: course.id,
      name,
      organization,
      instructor,
      description,
      featured,
      tech,
      courseLink,
    });
  };

  const handleAddTechItem = () => {
    setTech([...tech, techItem]);
    setTechItem("");
  };

  const handleDeleteCourse = async () => {
    await deleteCourse({ id: course.id });
  };

  const errContent = error?.data?.message || delError?.data?.message;

  return (
    <>
      {isError || (isDelError && <p>{errContent}</p>)}
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Edit Contact</h2>
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
        </div>
        <button
          className=""
          title="Update"
          onClick={handleUpdateCourse}
          disabled={isLoading ? true : false}
        >
          Update
        </button>
        <button className="" title="Delete" onClick={handleDeleteCourse}>
          Delete
        </button>
      </form>
    </>
  );
};

export default EditCourseForm;
