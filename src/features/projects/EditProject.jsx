import EditProjectForm from "./EditProjectForm";
import { RingLoader } from "react-spinners";
import { useGetProjectsQuery } from "./projectsApiSlice";
import { useParams } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const EditProject = () => {
  useTitle("SM_Portfolio: Edit Project");
  const { id } = useParams();
  const { project } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data }) => ({
      project: data?.entities[id],
    }),
  });

  if (!project) return <RingLoader />;
  return <EditProjectForm project={project} />;
};

export default EditProject;
