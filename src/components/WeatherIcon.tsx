import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

type Props = {};

export default function WeatherIcon(
  props: React.HTMLProps<HTMLDivElement> & { iconName: string, description: string }
) {
  return (
    <div title={props.description} {...props} className={cn("relative h-20 w-20")}>
      <Image
        height={100}
        width={100}
        alt={props.description}
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
      />
    </div>
  );
}
