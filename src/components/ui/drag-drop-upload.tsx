import { FileImage, FileVideo, Film, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileWithPreview extends File {
  preview?: string;
}

interface DragDropUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  uploading?: boolean;
  uploadProgress?: number;
}

export function DragDropUpload({
  onFilesSelected,
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    "video/*": [".mp4", ".webm", ".mov", ".avi"],
  },
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  disabled = false,
  uploading = false,
  uploadProgress = 0,
}: DragDropUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filesWithPreview = acceptedFiles.map((file) => {
        const fileWithPreview = file as FileWithPreview;
        if (file.type.startsWith("image/")) {
          fileWithPreview.preview = URL.createObjectURL(file);
        }
        return fileWithPreview;
      });

      setSelectedFiles(filesWithPreview);
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled: disabled || uploading,
  });

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    onFilesSelected([]);
  };

  const isVideo = (file: FileWithPreview) => file.type.startsWith("video/");
  const isImage = (file: FileWithPreview) => file.type.startsWith("image/");

  const getFileIcon = (file: FileWithPreview) => {
    if (isImage(file)) {
      return <FileImage className="w-8 h-8 text-gray-400" />;
    }
    if (isVideo(file)) {
      return <Film className="w-8 h-8 text-gray-400" />;
    }
    return <FileVideo className="w-8 h-8 text-gray-400" />;
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive && !isDragReject ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : ""}
          ${isDragReject ? "border-red-500 bg-red-50 dark:bg-red-950/20" : ""}
          ${disabled || uploading ? "opacity-50 cursor-not-allowed" : "hover:border-gray-400"}
          ${!(isDragActive || isDragReject) ? "border-gray-300 dark:border-gray-700" : ""}
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className="w-12 h-12 text-gray-400" />
          </div>
          {uploading ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Uploading files...</p>
              <Progress
                value={uploadProgress}
                className="w-full max-w-xs mx-auto"
              />
              <p className="text-xs text-gray-500">
                {uploadProgress}% complete
              </p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {isDragActive
                    ? "Drop files here..."
                    : "Drag & drop files here"}
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse files
                </p>
              </div>
              <div className="text-xs text-gray-400">
                <p>
                  Supported: Images (JPEG, PNG, GIF, WebP) and Videos (MP4,
                  WebM, MOV)
                </p>
                <p>Max file size: {(maxSize / (1024 * 1024)).toFixed(0)}MB</p>
              </div>
            </>
          )}
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-red-600">
            Some files were rejected:
          </p>
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="text-xs text-red-500">
              <span className="font-medium">{file.name}</span>
              {errors.map((error) => (
                <span key={error.code} className="ml-2">
                  - {error.message}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Selected Files ({selectedFiles.length})
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFiles}
              disabled={uploading}
            >
              Clear All
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="relative group bg-gray-50 dark:bg-gray-800 rounded-lg p-2"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                  {getFileIcon(file)}
                </div>
                <p className="text-xs font-medium truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(1)} MB
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
