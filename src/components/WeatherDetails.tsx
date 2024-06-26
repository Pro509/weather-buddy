import React from "react";
import { GiBleedingEye } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { BsSpeedometer } from "react-icons/bs";
import { LuSunrise, LuSunset } from "react-icons/lu";

type Props = {};

export interface WeatherDetailsProps {
  visibililty: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {
  return (
    <>
      <SingleWeatherDetail
        information="Visibility"
        icon={<GiBleedingEye />}
        value={props.visibililty}
      />
      <SingleWeatherDetail
        information="Humidity"
        icon={<WiHumidity />}
        value={props.humidity}
      />
      <SingleWeatherDetail
        information="Wind Speed"
        icon={<FiWind />}
        value={props.windSpeed}
      />
      <SingleWeatherDetail
        information="Air Pressure"
        icon={<BsSpeedometer />}
        value={props.airPressure}
      />
      <SingleWeatherDetail
        information="Sunrise"
        icon={<LuSunrise />}
        value={props.sunrise}
      />
      <SingleWeatherDetail
        information="Sunset"
        icon={<LuSunset />}
        value={props.sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs text-black/80 font-semibold">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p className="whitespace-nowrap">{props.value}</p>
    </div>
  );
}
