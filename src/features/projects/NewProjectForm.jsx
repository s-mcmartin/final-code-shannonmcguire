import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";
import { useAddNewProjectMutation } from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const NewProjectForm = () => {
  useTitle("SM_Portfolio: New Project Form");

  const [addNewProject, { isLoading, isSuccess, isError, error }] =
    useAddNewProjectMutation();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [tech, setTech] = useState([]);
  const [techItem, setTechItem] = useState("");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setImage("");
      setWebsite("");
      setDescription("");
      setFeatured(false);
      setTech([]);
      setGithub("");
      navigate("/admin/projects");
    }
  }, [isSuccess, navigate]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeImage = (e) => setImage(e.target.value);
  const handleChangeWebsite = (e) => setWebsite(e.target.value);
  const handleChangeGithub = (e) => setGithub(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeFeatured = (e) => setFeatured(e.target.value);
  const handleChangeTechItem = (e) => {
    setTechItem(e.target.value);
  };
  const handleAddTechItem = () => {
    setTech([...tech, techItem]);
    setTechItem("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoading && name !== "") {
      await addNewProject({
        name,
        image,
        website,
        description,
        featured,
        tech,
        github,
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
            <label className="" htmlFor="image">
              Image
            </label>
            <input
              className=""
              id="image"
              name="image"
              type="text"
              value={image}
              onChange={handleChangeImage}
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
            <label className="" htmlFor="website">
              Website
            </label>
            <input
              className=""
              id="website"
              name="website"
              type="text"
              value={website}
              onChange={handleChangeWebsite}
            />
            <label className="" htmlFor="github">
              Github
            </label>
            <input
              className=""
              id="github"
              name="github"
              type="text"
              value={github}
              onChange={handleChangeGithub}
            />
            <button
              className=""
              title="Save"
              disabled={name === "" ? true : false}
            >
              Add New Project
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewProjectForm;
