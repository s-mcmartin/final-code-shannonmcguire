import { useGetCoursesQuery } from "./coursesApiSlice";
import { useNavigate } from 'react-router-dom';
import {memo} from 'react'

const Course = ({ courseId }) => {
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[courseId],
    }),
  });

const navigate = useNavigate();
  if(course) {
    const handleEdit = () => navigate(`/admin/courses/${courseId}`);
    const cellStatus = course.featured ? 'bg-yellow-200' : null;
    const {name, organization, instructor, description, featured, tech, courseLink} = course;
    const controls = [name, organization, instructor, description, featured, tech, courseLink]
    console.log(controls)
    return <tr className='grid grid-cols-8 justify-center gap-2 border'>
   
    <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{course.name}</td>
    <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{course.organization}</td>
    <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{course.instructor}</td>
    <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{course.description}</td>
    <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{course.featured ? 'yes' : 'no'}</td>
    <td className={`${cellStatus} flex justify-center items-center overflow-auto`}>{course.tech}</td>
    <td className={`${cellStatus} flex justify-center items-center overflow-auto`}><a href={course.courseLink}>CourseLink</a></td>
   
    <td className={`table__cell ${cellStatus} flex justify-center items-center overflow-auto`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </td>
    </tr>
  } else return null;
};

const memoizedCourse = memo(Course)
export default memoizedCourse;
