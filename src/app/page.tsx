"use client";

import Navbar from "../components/Navbar";
import Container from "@/components/Container";
import WeatherIcon from "../components/WeatherIcon";
import { convertKelvin } from "@/utils/convertKelvin";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import process from "process";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/fp";
import { getDayOrNightIcon } from "@/utils/getDayOrNight";

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export default function Home() {
  const fetchWeatherData = async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=gothenburg&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&
      cnt=2`
    );
    return data;
  };

  // We put a type so we can extract information from the Data
  const { isLoading, error, data } = useQuery<WeatherData>({
    queryKey: ["weatherData"], // Use `queryKey` within an object
    queryFn: fetchWeatherData, // Specify the fetch function as `queryFn`
  });

  const firstData = data?.list[0];

  console.log("data", data);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce text-3xl">Loading...</p>
      </div>
    );

  const toCelsius = true;

  return (
    <div className="flex flex-col gap-4 min-h-screen bg-gray-100">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today's weather data  */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-2 text-2xl items-end mx-auto">
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ""), "dd-MMM-yyyy")})
              </p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4 ">
                <span className="text-5xl">
                  {convertKelvin(firstData?.main.temp ?? 290, toCelsius)}º
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>
                    {convertKelvin(
                      firstData?.main.feels_like ?? 290,
                      toCelsius
                    )}
                    º
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {"  "}
                    {convertKelvin(firstData?.main.temp_min ?? 290, toCelsius)}
                    º↓
                  </span>
                  <span>
                    {"  "}
                    {convertKelvin(firstData?.main.temp_max ?? 290, toCelsius)}
                    º↑
                  </span>
                </p>
              </div>
              {/* Time and weather icons  */}
              <div className="flex gap-10 sm:gap-15 overflow-x-auto w-full justify-between">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>
                    <WeatherIcon
                      iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                      description={d.weather[0].description}
                    />

                    <p>{convertKelvin(d.main.temp ?? 290, toCelsius)}º</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex flex-row gap-4">
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="text-md text-center">
                {firstData?.weather[0].description}
              </p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? "",
                  firstData?.dt_txt ?? ""
                )}
                description={firstData?.weather[0].description ?? ""}
              />
            </Container>
            <Container className="justify-between overflow-x-auto flex-col px-4 items-center bg-blue-900/90 text-white">
            <div className="flex gap-10 sm:gap-15 w-full justify-between">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>
                    <WeatherIcon
                      iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                      description={d.weather[0].description}
                    />

                    <p>{convertKelvin(d.main.temp ?? 290, toCelsius)}º</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>
        {/* Forecast data  */}
        <section></section>
      </main>
    </div>
  );
}
