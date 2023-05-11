import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { useForm } from "react-hook-form";
import { BsFillMoonStarsFill } from "react-icons/bs";

function App() {
  const [Datos, setDatos] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => fetchApi(data.buscar);
  const [darkMode, setDarkMode] = useState(true);

  function fetchApi(string) {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: string },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_WEATHER_KEY,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setDatos(response.data);
        setIsLoaded(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  useEffect(() => {
    fetchApi("Santiago");
  }, []);

  if (!isLoaded) {
    return (
      <div className="bg-gradient-to-b from-[#1b1b32] to-[#154a69]  min-h-screen flex justify-center items-center">
        <p className="text-center text-white">Cargando...</p>
      </div>
    );
  } else {
    return (
      <div className={darkMode ? "dark" : ""}>
        <main className="dark:bg-gradient-to-b dark:from-[#1b1b32] dark:to-[#154a69]  bg-gradient-to-b from-[#62c3fc] to-[#e6ca71] min-h-screen flex justify-center">
          <div className="max-w-lg w-full m-5">
            <div className="bg-slate-200 rounded-md">
              <div className="w-full p-5 flex justify-between items-center mt-20">
                <h1 className="text-black text-xl text-center">Weather Api</h1>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  size="26px"
                  className="cursor-pointer text-[#0E172B] dark:text-yellow-400"
                />
              </div>
              <article className="p-5">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex items-center"
                >
                  <input
                    {...register("buscar", {
                      required: "No puede estar vacio!",
                    })}
                    placeholder="🔍 País, Ciudad o (Lat,Lon)"
                    className="rounded-l-md p-2 w-full"
                  />
                  <button className="text-white px-5 bg-[#26A2B8] h-10 rounded-r-md">
                    Buscar
                  </button>
                </form>
              </article>
              <article className="p-5 flex flex-col text-black">
                <section className="mb-8">
                  <p className="text-3xl 2xl:text-4xl">
                    {Datos.location.country}
                  </p>
                  <p className="text-xl 2xl:text-2xl">{Datos.location.name}</p>
                  <p className="text-xl 2xl:text-2xl">
                    {Datos.location.region}
                  </p>
                </section>
                <section className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm 2xl:text-base">
                      {Datos.location.localtime}
                    </h3>
                    <h2 className="text-7xl 2xl:text-8xl">
                      {Datos.current.temp_c}°C
                    </h2>
                    <h4 className="text-sm 2xl:text-base">
                      Sensación Térmica de {Datos.current.feelslike_c}°C
                    </h4>
                  </div>
                  <div>
                    <img
                      src={Datos.current.condition.icon}
                      alt=""
                      className="w-20"
                    />
                    <p className="text-black text-center">
                      {Datos.current.condition.text}
                    </p>
                  </div>
                </section>
                <section className="mt-40">
                  <p className="text-base 2xl:text-lg">
                    Velocidad del Viento 🍃 {Datos.current.wind_kph} KPH
                  </p>
                  <p className="text-base 2xl:text-lg">
                    Humedad Relativa {Datos.current.humidity}%
                  </p>
                  <div className="flex justify-between mt-5">
                    <p className="text-base 2xl:text-lg">
                      Latitud {Datos.location.lat}
                    </p>
                    <p className="text-base 2xl:text-lg">
                      Longitud {Datos.location.lon}
                    </p>
                  </div>
                </section>
              </article>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
