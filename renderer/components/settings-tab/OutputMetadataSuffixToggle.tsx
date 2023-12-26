import React, { useEffect } from "react";

type OutputMetadataSuffixToggleProps = {
  outputMetadataSuffix: boolean;
  setOutputMetadataSuffix: (arg: any) => void;
};

const OutputMetadataSuffixToggle = ({
  outputMetadataSuffix,
  setOutputMetadataSuffix,
}: OutputMetadataSuffixToggleProps) => {
  useEffect(() => {
    if (!localStorage.getItem("outputSuffixMetadata")) {
      localStorage.setItem(
        "outputSuffixMetadata",
        JSON.stringify(outputMetadataSuffix)
      );
    } else {
      const currentlySavedOutputSuffixMetadata = localStorage.getItem(
        "outputSuffixMetadata"
      );
      if (currentlySavedOutputSuffixMetadata) {
        setOutputMetadataSuffix(currentlySavedOutputSuffixMetadata === "true");
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">OUTPUT METADATA SUFFIX</p>
      <p className="text-xs text-base-content/80">
        If enabled, the output file metadata will be appended to the output file
        name.
      </p>
      <input
        type="checkbox"
        className="toggle"
        checked={outputMetadataSuffix}
        onChange={() => {}}
        onClick={() => {
          setOutputMetadataSuffix((oldValue: boolean) => {
            if (oldValue) {
              localStorage.removeItem("outputSuffixMetadata");
              return false;
            } else {
              return true;
            }
          });
          localStorage.setItem(
            "outputSuffixMetadata",
            JSON.stringify(!outputMetadataSuffix)
          );
        }}
      />
    </div>
  );
};

export default OutputMetadataSuffixToggle;
