import Project from "./Project";
import React from "react";
import { RingLoader } from "react-spinners";
import { useGetProjectsQuery } from "./projectsApiSlice";
import useTitle from "../../hooks/useTitle";
import Table from '../../components/admin-view/Table'

const ProjectList = () => {
  useTitle("SM_Portfolio: Projects List");

  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery("projectsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
 
let content;
  if (isLoading) content = <RingLoader />;
  if (isError) content = <p>{error?.data?.message}</p>;
  if (isSuccess) {
    const {ids} = projects;
    const controls = ['Image', "Name", "Description", "Featured", "Tech", "Github", "Website"]
    const tableContent = ids?.length && ids.map(projectId => <Project key={projectId} projectId={projectId} />)
    content = <Table controls={controls} tableContent={tableContent} />
  }
  return content;
};

export default ProjectList;
