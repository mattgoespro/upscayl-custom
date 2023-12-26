import React from "react";

type OutputSuffixInputProps = {
  outputSuffix: string;
  handleOutputSuffixChange: (arg: any) => void;
};

export function OutputSuffixInput({
  outputSuffix,
  handleOutputSuffixChange,
}: OutputSuffixInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">OUTPUT FILENAME SUFFIX</p>
      <p className="text-xs text-base-content/80">
        Append a suffix to the output file name.
      </p>
      <input
        type="text"
        placeholder="Type here"
        className="input-bordered input w-full max-w-xs"
        value={outputSuffix}
        onChange={handleOutputSuffixChange}
      />
    </div>
  );
}
