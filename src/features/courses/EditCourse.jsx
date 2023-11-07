import EditCourseForm from "./EditCourseForm";
import { RingLoader } from "react-spinners";
import { useGetCoursesQuery } from "./coursesApiSlice";
import { useParams } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const EditCourse = () => {
  useTitle("SM_Portfolio: Edit Course");
  const { id } = useParams();
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[id],
    }),
  });

  if (!course) return <RingLoader />;
  return <EditCourseForm course={course} />;
};

export default EditCourse;
