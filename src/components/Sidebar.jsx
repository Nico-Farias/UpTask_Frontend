import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-2xl text-sky-600 font-bold m-2 ">
        Hola :{" "}
        <span className="text-gray-600 font-extrabold text-3xl">
          {auth.nombre}
        </span>{" "}
        <br />
        <span className="text-sm text-gray-400"> {auth.email}</span>
      </p>

      <Link
        to="crear-proyecto"
        className="bg-sky-600 w-full text-center p-3 uppercase text-white block font-bold mt-7 rounded-lg "
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
