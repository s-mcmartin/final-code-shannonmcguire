import { Outlet } from "react-router-dom";
import { contactApiSlice } from "./../contacts/contactApiSlice";
import { coursesApiSlice } from "../courses/coursesApiSlice";
import { projectsApiSlice } from "../projects/projectsApiSlice";
import { store } from "../../app/store";
import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      contactApiSlice.util.prefetch("getContacts", "contactList", {
        force: true,
      })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      coursesApiSlice.util.prefetch("getCourses", "coursesList", {
        force: true,
      })
    );
    store.dispatch(
      projectsApiSlice.util.prefetch("getProjects", "projectsList", {
        force: true,
      })
    );
  }, []);

  return (<Outlet />);
};
export default Prefetch;
