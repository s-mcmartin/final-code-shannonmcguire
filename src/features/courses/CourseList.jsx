import Course from "./Course";
import React from "react";
import { RingLoader } from "react-spinners";
import { useGetCoursesQuery } from "./coursesApiSlice";
import useTitle from "../../hooks/useTitle";
import Table from '../../components/admin-view/Table'

const CourseList = () => {
  useTitle("SM_Portfolio: Course List");

  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery("coursesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const controls = ['Name', 'Organization', 'Instructor', 'Description', 'Featured', 'Tech', 'CourseLink']
 
let content;
  if (isLoading) content = <RingLoader />;
  if (isError) content = <p>{error?.data?.message}</p>;
  if (isSuccess) {
    const {ids} = courses;
    const tableContent = ids?.length && ids.map(courseId => <Course key={courseId} courseId={courseId} />)
    content = <Table controls={controls} tableContent={tableContent} />
  }
  return content;
};

export default CourseList;
