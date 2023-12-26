import { ChangeEvent, DOMAttributes, MouseEvent, MouseEventHandler } from "react";

export type HTMLInputChangeEvent = ChangeEvent<HTMLInputElement>;

export type SelectChangeEvent = { label: string; value: string };

export type ButtonMouseClickEventHandler = MouseEventHandler<HTMLButtonElement>;

export type ImageMouseEvent = MouseEvent<HTMLImageElement, globalThis.MouseEvent> & {
  target: HTMLImageElement;
};

export type PasteHandlerEvent = React.ClipboardEvent<HTMLDivElement>;
export type ImageLoadEvent = DOMAttributes<HTMLImageElement>["onLoad"];
