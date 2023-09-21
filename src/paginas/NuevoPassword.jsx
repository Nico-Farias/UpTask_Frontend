import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from './../config/clienteAxios';

const NuevoPassword = () => {

    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()
    const { token } = params;

    useEffect(() => {

        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)


            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()

    }, [])

    const handleSubmitPassword = async e => {
        e.preventDefault()

        if (password.length < 8) {
            setAlerta({
                msg: ' El password debe tener minimo 8 caracteres',
                error: true
            })
            return
        }

        try {
            const url = `/usuarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password })

            setAlerta({
                msg: data.msg,
                error: false
            })

            setPasswordModificado(true)

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta;


    return (
        <>

            <h1 className="text-sky-600 font-black text-6xl capitalize">Restablece tu password y no pierdas tus {''}  <span className="text-slate-700"> proyectos</span></h1>


            {msg && <Alerta alerta={alerta} />}

            {tokenValido && (

                <form
                    onSubmit={handleSubmitPassword}
                    className="my-10 bg-white shadow rounded-lg p-10">


                    <div className="my-5 ">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="password"
                        >
                            Nuevo Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Escribe tu nuevo password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>


                    <input type="submit" value='Guardar nuevo password' className="w-full bg-sky-600 text-white uppercase font-bold py-3 rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />

                </form>

            )}

            {passwordModificado && (

                <Link
                    to='/'
                    className="block text-center my-5 text-slate-500 font-semibold uppercase text-sm"
                >
                    Inicia sesion
                </Link>

            )}


        </>
    )
}

export default NuevoPassword