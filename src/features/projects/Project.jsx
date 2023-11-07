import { memo } from "react";
import { useGetProjectsQuery } from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";

const Project = ({ projectId }) => {
  const { project } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data }) => ({
      project: data?.entities[projectId],
    }),
  });

  const navigate = useNavigate();

  if (project) {
    const handleEdit = () => navigate(`/admin/projects/${projectId}`);
    const cellStatus = project.featured === true ? "bg-yellow-200" : null;

    return (
      <tr className="grid grid-cols-8 justify-center gap-2 border">
        <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>
          <img src={project.image} className="w-full h-full bg-cover" />
        </td>
        <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{project.name}</td>
        <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{project.description}</td>
        <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{project.featured ? "yes" : "no"}</td>
        <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{project.tech}</td>
        <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>
          <a href={project.github}>Github</a>
        </td>
        <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>
          <a href={project.website}>Website</a>
        </td>
        <td className={`table__cell ${cellStatus} flex justify-center items-center overflow-auto`}>
          <button className="icon-button table__button flex justify-center items-center overflow-auto" onClick={handleEdit}>
            Edit
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedProject = memo(Project);
export default memoizedProject;
