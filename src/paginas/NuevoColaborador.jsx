import { useEffect } from "react";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import SppinerCarga from "../components/SppinerCarga";

const NuevoColaborador = () => {
  const {
    obtenerProyecto,
    proyecto,
    colaborador,
    cargando,
    agregarColaborador,
    alerta,
  } = useProyectos();
  const params = useParams();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  if (!proyecto?._id) return <Alerta alerta={alerta} />;

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador al proyecto :{" "}
        <span className="font-extrabold text-sky-600">{proyecto.nombre}</span>
      </h1>

      <div className="flex justify-center mt-10">
        <FormularioColaborador />
      </div>

      {cargando ? (
        <div className="text-center">
          <SppinerCarga />
        </div>
      ) : (
        colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="px-5 py-10 bg-white rounded-lg shadow w-full md:w-1/2">
              <h2 className="mb-10 text-2xl font-bold text-center">
                Resultado :{" "}
              </h2>

              <div className="flex items-center justify-between">
                <p>{colaborador.nombre}</p>

                <button
                  type="button"
                  className="px-5 py-2 text-sm font-bold text-white uppercase rounded-lg bg-slate-500"
                  onClick={() =>
                    agregarColaborador({
                      email: colaborador.email,
                    })
                  }
                >
                  Agregar al proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;
