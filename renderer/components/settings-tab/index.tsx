import { useAtom, useAtomValue } from "jotai";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { featureFlags } from "@common/feature-flags";
import { modelsListAtom } from "../../atoms/modelsListAtom";
import {
  customModelsPathAtom,
  noImageProcessingAtom,
  scaleAtom
} from "../../atoms/userSettingsAtom";
import { UpscaylCloudModal } from "../UpscaylCloudModal";
import useLog from "../hooks/useLog";
import { CompressionInput } from "./CompressionInput";
import { CustomModelsFolderSelect } from "./CustomModelsFolderSelect";
import { ImageFormatSelect } from "./ImageFormatSelect";
import { ImageScaleSelect } from "./ImageScaleSelect";
import { LogArea } from "./LogArea";
import OutputMetadataSuffixToggle from "./OutputMetadataSuffixToggle";
import { OutputSuffixInput } from "./OutputSuffixInput";
import OverwriteToggle, { OverwriteToggleFn } from "./OverwriteToggle";
import ProcessImageToggle from "./ProcessImageToggle";
import { ResetSettings } from "./ResetSettings";
import { SaveOutputFolderToggle } from "./SaveOutputFolderToggle";
import { ThemeSelect } from "./ThemeSelect";

interface IProps {
  batchMode: boolean;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  saveImageAs: string;
  setSaveImageAs: React.Dispatch<React.SetStateAction<string>>;
  compression: number;
  setCompression: React.Dispatch<React.SetStateAction<number>>;
  gpuId: string;
  setGpuId: React.Dispatch<React.SetStateAction<string>>;
  logData: string[];
  overwrite: boolean;
  setOverwrite: OverwriteToggleFn;
  outputSuffix: string;
  setOutputSuffix: (outputSuffix: string) => void;
  outputMetadataSuffix: boolean;
  setOutputMetadataSuffix: Dispatch<SetStateAction<boolean>>;
  os: "linux" | "mac" | "win" | undefined;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setDontShowCloudModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function SettingsTab({
  batchMode,
  setModel,
  compression,
  setCompression,
  saveImageAs,
  setSaveImageAs,
  logData,
  overwrite,
  setOverwrite,
  outputSuffix,
  setOutputSuffix,
  outputMetadataSuffix,
  setOutputMetadataSuffix,
  os: _os,
  show,
  setShow,
  setDontShowCloudModal
}: IProps) {
  // STATES
  const [_currentModel, setCurrentModel] = useState<{
    label: string;
    value: string;
  }>({
    label: null,
    value: null
  });
  const [rememberOutputFolder, setRememberOutputFolder] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [customModelsPath, setCustomModelsPath] = useAtom(customModelsPathAtom);
  const modelOptions = useAtomValue(modelsListAtom);
  const [scale, setScale] = useAtom(scaleAtom);
  const [noImageProcessing, setNoImageProcessing] = useAtom(noImageProcessingAtom);

  const { logit } = useLog();

  useEffect(() => {
    themeChange(false);

    if (!localStorage.getItem("saveImageAs")) {
      logit("⚙️ Setting saveImageAs to png");
      localStorage.setItem("saveImageAs", "png");
    } else {
      const currentlySavedImageFormat = localStorage.getItem("saveImageAs");
      logit("⚙️ Getting saveImageAs from localStorage: ", currentlySavedImageFormat);
      setSaveImageAs(currentlySavedImageFormat);
    }

    if (!localStorage.getItem("model")) {
      setCurrentModel(modelOptions[0]);
      setModel(modelOptions[0].value);
      localStorage.setItem("model", JSON.stringify(modelOptions[0]));
      logit("🔀 Setting model to", modelOptions[0].value);
    } else {
      let currentlySavedModel = JSON.parse(
        localStorage.getItem("model")
      ) as (typeof modelOptions)[0];
      if (modelOptions.find((model) => model.value === currentlySavedModel.value) === undefined) {
        localStorage.setItem("model", JSON.stringify(modelOptions[0]));
        logit("🔀 Setting model to", modelOptions[0].value);
        currentlySavedModel = modelOptions[0];
      }
      setCurrentModel(currentlySavedModel);
      setModel(currentlySavedModel.value);
      logit("⚙️ Getting model from localStorage: ", JSON.stringify(currentlySavedModel));
    }

    if (!localStorage.getItem("rememberOutputFolder")) {
      logit("⚙️ Setting rememberOutputFolder to false");
      localStorage.setItem("rememberOutputFolder", "false");
    } else {
      const currentlySavedRememberOutputFolder = localStorage.getItem("rememberOutputFolder");
      logit(
        "⚙️ Getting rememberOutputFolder from localStorage: ",
        currentlySavedRememberOutputFolder
      );
      setRememberOutputFolder(currentlySavedRememberOutputFolder === "true" ? true : false);
    }
  }, []);

  // HANDLERS
  const setExportType = (format: string) => {
    setSaveImageAs(format);
    localStorage.setItem("saveImageAs", format);
  };

  const handleCompressionChange = (e) => {
    setCompression(e.target.value);
  };

  const handleOutputSuffixChange = (e) => {
    setOutputSuffix(e.target.value);
    localStorage.setItem("outputSuffix", e.target.value);
  };

  const handleOutputMetadataSuffixChange = (e) => {
    setOutputMetadataSuffix(e.target.checked);
    localStorage.setItem("outputSuffixMetadata", e.target.checked === true ? "true" : "false");
  };

  const copyOnClickHandler = () => {
    navigator.clipboard.writeText(logData.join("\n"));
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="animate-step-in animate flex h-screen flex-col gap-7 overflow-y-auto p-5 overflow-x-hidden">
      <div className="flex flex-col gap-2 text-sm font-medium">
        <p>Having issues?</p>
        <a
          className="btn-primary btn"
          href="https://github.com/upscayl/upscayl/wiki/"
          target="_blank"
          rel="noreferrer"
        >
          Read Wiki Guide
        </a>
      </div>

      <LogArea copyOnClickHandler={copyOnClickHandler} isCopied={isCopied} logData={logData} />

      {/* THEME SELECTOR */}
      <ThemeSelect />

      {/* IMAGE FORMAT BUTTONS */}
      <ImageFormatSelect
        batchMode={batchMode}
        saveImageAs={saveImageAs}
        setExportType={setExportType}
      />

      <ProcessImageToggle
        noImageProcessing={noImageProcessing}
        setNoImageProcessing={setNoImageProcessing}
      />

      {!noImageProcessing && (
        <>
          {/* IMAGE SCALE */}
          <ImageScaleSelect scale={scale} setScale={setScale} />

          <CompressionInput
            compression={compression}
            handleCompressionChange={handleCompressionChange}
          />
        </>
      )}

      <OutputSuffixInput
        outputSuffix={outputSuffix}
        handleOutputSuffixChange={handleOutputSuffixChange}
      />

      <OutputMetadataSuffixToggle
        outputMetadataSuffix={outputMetadataSuffix}
        setOutputMetadataSuffix={handleOutputMetadataSuffixChange}
      />

      <SaveOutputFolderToggle
        rememberOutputFolder={rememberOutputFolder}
        setRememberOutputFolder={setRememberOutputFolder}
      />

      <OverwriteToggle overwrite={overwrite} setOverwrite={setOverwrite} />

      {/* CUSTOM MODEL */}
      <CustomModelsFolderSelect
        customModelsPath={customModelsPath}
        setCustomModelsPath={setCustomModelsPath}
      />

      {/* RESET SETTINGS */}
      <ResetSettings />

      {featureFlags.SHOW_UPSCAYL_CLOUD_INFO && (
        <>
          <button
            className="mb-5 rounded-btn p-1 mx-5 bg-success shadow-lg shadow-success/40 text-slate-50 animate-pulse text-sm"
            onClick={() => {
              setShow(true);
            }}
          >
            Introducing Upscayl Cloud
          </button>

          <UpscaylCloudModal
            show={show}
            setShow={setShow}
            setDontShowCloudModal={setDontShowCloudModal}
          />
        </>
      )}
    </div>
  );
}

export default SettingsTab;
