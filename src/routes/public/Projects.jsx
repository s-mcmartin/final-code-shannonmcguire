"use client";

import AnimatedText from "../../components/transitions/AnimatedText";
import Carousel from "../../components/client-view/projects/Carousel";
import FilterSearch from "../../components/client-view/projects/FilterSearch";
import useTitle from '../../hooks/useTitle'
import MainSection from "../../components/MainSection";
import ProjectCard from "../../components/client-view/projects/ProjectCard";
import TransitionEffect from "../../components/transitions/TransitionEffect";
import {useGetProjectsQuery} from '../../features/projects/projectsApiSlice'
import { useState } from "react";

import { RingLoader } from "react-spinners";

const Projects= () => {
useTitle('SM_Portfolio: Projects Page')
  const [selected, setSelected] = useState([]);

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
  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <RingLoader />
      </div>
    );
  }
  if (isError) {
    return <p>{error}</p>;
  }

  if(isSuccess){
  const {ids, entities} = projects;


  const handleClickSearch = (e) => {
    const query = e.target.value;
    const selectedList = selected;
    const filteredList = selected.filter((item) => item !== query);
    selected.includes(query)
      ? setSelected(filteredList)
      : setSelected([...selectedList, query]);
  };

  const selectedProjects = ids.filter((projectId) =>
    selected.every((tool) => entities[projectId].tech.includes(tool))
  );

  // const featuredProjects = ids.filter(
  //   (projectId) => entities[projectId].featured === "true"
  // );

  const selectedProjectsLength = selectedProjects?.length;

  const sortedSelectedProjects = selectedProjects?.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const handleClickAll = () => {
    setSelected([]);
  };

  const projectsList = ids.map(projectId => entities[projectId])
  const featuredProjects = projectsList.filter(project => project.featured === 'true');



    return (
      <>
       
        <TransitionEffect />
        <main
          className={`mb-16  flex w-full flex-col items-center justify-center dark:text-light`}
        >
          <MainSection className="pt-16">
            <AnimatedText text="Featured Projects" className="!text-7xl" />
            <Carousel projects={featuredProjects} />
            <AnimatedText text="Looking for something else?" />
            <h2 className="mb-6 text-2xl italic text-center dark:text-light/50">
              Search through some of my other projects...
            </h2>
            <FilterSearch  
              projects={projectsList}           
              selected={selected}
              onClickAll={handleClickAll}
              onClickSearch={handleClickSearch}
              selectedProjects={selectedProjects}
              selectedProjectsLength={selectedProjectsLength}
            />
            <div className="w-full grid grid-cols-3 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 h-fit grid-row-auto my-4 ">
              {!selected.length
                ? ids.map((projectId) => (
                    <ProjectCard key={projectId} projectId={projectId} />
                  ))
                : sortedSelectedProjects.map((project, index) => (
                    <ProjectCard project={project} key={index} />
                  ))}
            </div>
          </MainSection>
        </main>
      </>
    );
  }
};

export default Projects;
