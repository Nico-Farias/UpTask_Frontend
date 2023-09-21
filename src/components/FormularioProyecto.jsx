import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import useProyectos from './../hooks/useProyectos';
import Alerta from './Alerta';
import Proyecto from "../paginas/Proyecto";

const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    useEffect(() => {

        if (params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)

        }

    }, [params])


    const hanldeSubmit = async e => {

        e.preventDefault()

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })

        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')

    }



    const { msg } = alerta;

    return (

        <form
            onSubmit={hanldeSubmit}
            className=" bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">

            {msg && <Alerta alerta={alerta} />}

            <div className="mb-5">
                <label
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Nombre Proyecto
                </label>

                <input
                    id="nombre"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

            </div>

            <div className="mb-5">
                <label
                    htmlFor="descripcion"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Descripcion del Proyecto
                </label>

                <textarea
                    id="descripcion"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                    placeholder="Descripcion del Proyecto"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />

            </div>

            <div className="mb-5">
                <label
                    htmlFor="fecha-entrega"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Fecha de entrega
                </label>

                <input
                    id="fecha-entrega"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e.target.value)}
                />

            </div>

            <div className="mb-5">
                <label
                    htmlFor="cliente"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Nombre Cliente
                </label>

                <input
                    id="cliente"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                    placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                />

            </div>


            <input type="submit" value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'} className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors " />


        </form>


    )
}

export default FormularioProyecto