import React from "react";
import { HTMLInputChangeEvent } from "@/model/changeEvents";

type Scale = "4" | "2" | "3";

type ImageScaleSelectProps = {
  scale: Scale;
  setScale: (scale: Scale) => void;
};

export function ImageScaleSelect({ scale, setScale }: ImageScaleSelectProps) {
  return (
    <div>
      <div className="flex flex-row gap-1">
        <p className="text-sm font-medium">IMAGE SCALE</p>
        {/*
        <p className="badge-primary badge text-[10px] font-medium">
          EXPERIMENTAL
        </p> */}
      </div>
      <input
        type="range"
        min="1"
        max="4"
        value={scale}
        onChange={(e: HTMLInputChangeEvent) => {
          setScale(e.target.value.toString() as Scale);
        }}
        step="1"
        className="range range-primary mt-2"
      />
      <div className="flex w-full justify-between px-2 text-xs font-semibold text-base-content">
        <span>1x</span>
        <span>2x</span>
        <span>3x</span>
        <span>4x</span>
      </div>
    </div>
  );
}
