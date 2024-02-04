"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Container from "@/components/Container";
import { convertKelvin } from "@/utils/convertKelvin";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import process from "process";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/fp";

// https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=03fb08248e0e476d6262996c22f30175&cnt=56

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
      cnt=56`
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
        <section>
          <div>
            <h2 className="flex gap-2 text-2xl items-end mx-auto">
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ""), "dd-MMM-yyyy")})
              </p>
            </h2>
            <Container className="gap-10 px-6 my-2 items-center">
              <div className="flex flex-col px-4 ">
                <span className="text-5xl">
                  {convertKelvin(firstData?.main.temp ?? 290, toCelsius)}º
                </span>
                <span className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>
                    {convertKelvin(
                      firstData?.main.feels_like ?? 290,
                      toCelsius
                    )}
                    º
                  </span>
                </span>
              </div>
            </Container>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}
