import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Upload, FileText, AlertCircle } from "lucide-react";

const UploadChildrenDocuments = ({
  numberOfChildren,
  onFilesChange,
  files = [],
  existingFiles = [],
  onRemoveExistingFile,
  childrenCountChanged = false,
  onChildrenCountChangeHandled,
}) => {
  const { t } = useTranslation();
  const fileInputRefs = useRef([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    if (childrenCountChanged) {
      if (onChildrenCountChangeHandled) {
        onChildrenCountChangeHandled();
      }
      return;
    }

    if (
      existingFiles.length > 0 &&
      files.every((file) => file === null || file === undefined)
    ) {
      const mergedFiles = [...files];

      existingFiles.forEach((existingFile, index) => {
        if (index < numberOfChildren && !mergedFiles[index]) {
          const mockFile = {
            name:
              existingFile.original_name || `Child_${index + 1}_Document.pdf`,
            size: existingFile.size || 0,
            type: "application/pdf",
            url: existingFile.url,
            isExisting: true,
            id: existingFile.id,
          };
          mergedFiles[index] = mockFile;
        }
      });

      onFilesChange(mergedFiles);
    }
  }, [existingFiles, numberOfChildren, childrenCountChanged]);

  const handleFileSelect = (index, selectedFiles) => {
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0];

      const newFiles = [...files];
      while (newFiles.length <= index) {
        newFiles.push(null);
      }
      newFiles[index] = file;

      console.log("Updating files:", { newFiles, index, file });
      onFilesChange(newFiles);
    }
  };

  const handleRemoveFile = (index) => {
    const file = files[index];

    if (file && file.isExisting) {
      const existingIndex = existingFiles.findIndex((ef) => ef.id === file.id);
      if (existingIndex !== -1 && onRemoveExistingFile) {
        onRemoveExistingFile(existingIndex);
      }
    }

    const newFiles = [...files];
    newFiles[index] = null;
    onFilesChange(newFiles);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDraggedIndex(index);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggedIndex(null);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDraggedIndex(null);
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(index, droppedFiles);
  };

  const renderUploadBox = (index) => {
    const file = files[index];
    const isDragging = draggedIndex === index;
    const isExistingFile = file && file.isExisting;

    return (
      <div
        key={index}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : file
            ? isExistingFile
              ? "border-blue-600 bg-blue-50"
              : "border-orange-500 bg-orange-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, index)}
      >
        {file ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <FileText
                className={`w-8 h-8 ${
                  isExistingFile ? "text-[#194894]" : "text-green-600"
                }`}
              />
              <span
                className={`font-medium ${
                  isExistingFile ? "text-[#194894]" : "text-green-600"
                }`}
              >
                {isExistingFile
                  ? t("childrenDocuments.existingFile")
                  : t("childrenDocuments.fileUploaded")}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">{file.name}</p>
              {file.size > 0 && (
                <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              )}
            </div>
            <div className="flex justify-center space-x-2">
              <button
                type="button"
                onClick={() => fileInputRefs.current[index]?.click()}
                className="px-4 py-2 bg-[#194894] text-white rounded-md hover:bg-[#0f3a7a] transition-colors text-sm"
              >
                {isExistingFile ? t("replaceFile") : t("changeFile")}
              </button>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>{t("childrenDocuments.remove")}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload
              className={`w-12 h-12 mx-auto ${
                isDragging ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {t("childrenDocuments.uploadTitle", { number: index + 1 })}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {t("childrenDocuments.dragDropText")}
              </p>
              <button
                type="button"
                onClick={() => fileInputRefs.current[index]?.click()}
                className="px-6 py-2 bg-[#194894] text-white rounded-md hover:bg-[#0f3a7a] transition-colors"
              >
                {t("childrenDocuments.selectFile")}
              </button>
            </div>
            <div className="text-xs text-gray-500">
              <p>{t("childrenDocuments.fileRequirements")}</p>
            </div>
          </div>
        )}

        <input
          ref={(el) => (fileInputRefs.current[index] = el)}
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileSelect(index, e.target.files)}
          className="hidden"
        />
      </div>
    );
  };

  if (numberOfChildren === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t("childrenDocuments.title")}
        </h3>
        <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">
            {t("childrenDocuments.requiredNotice", { count: numberOfChildren })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: numberOfChildren }, (_, index) =>
          renderUploadBox(index)
        )}
      </div>
    </div>
  );
};

export default UploadChildrenDocuments;
