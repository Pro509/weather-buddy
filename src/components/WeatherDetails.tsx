import React from "react";

type Props = {};

export default function WeatherDetails({}: Props) {
  return <SingleWeatherDetail information="Humidity" icon="💧" value="10%" />;
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: string;
  value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p className="whitespace-nowrap">{props.value}</p>
    </div>
  );
}
