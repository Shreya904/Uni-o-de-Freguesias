"use client";

import { useId, useRef, useState } from "react";
import { X } from "lucide-react";

type AttachmentFieldProps = {
  label: string;
  helperText?: string;
  accept?: string;
  multiple?: boolean;
};

export default function AttachmentField({
  label,
  helperText = "Nenhum ficheiro selecionado",
  accept,
  multiple = false,
}: AttachmentFieldProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const onChange = () => {
    const nextFiles = Array.from(inputRef.current?.files ?? []);
    setFiles(nextFiles);
  };

  const removeFile = (index: number) => {
    const nextFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(nextFiles);

    if (!inputRef.current) return;
    const dt = new DataTransfer();
    nextFiles.forEach((file) => dt.items.add(file));
    inputRef.current.files = dt.files;
  };

  const clearAll = () => {
    setFiles([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
      <span className="text-sm text-muted-foreground dark:text-white/80 sm:w-56 shrink-0">
        {label}
      </span>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <label
            htmlFor={inputId}
            className="inline-flex items-center gap-2 border dark:border-white/20 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted dark:hover:bg-white/10 dark:text-white"
          >
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              className="hidden"
              accept={accept}
              multiple={multiple}
              onChange={onChange}
            />
            Escolher ficheiro
          </label>
          {files.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-muted-foreground dark:text-white/70 hover:text-foreground dark:hover:text-white"
            >
              Limpar seleção
            </button>
          )}
        </div>

        {files.length === 0 ? (
          <span className="text-xs text-muted-foreground dark:text-white/70">{helperText}</span>
        ) : (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center gap-2 rounded-md border border-green-500 dark:border-green-500/50 bg-green-50 dark:bg-green-950/30 px-3 py-2 text-sm text-green-700 dark:text-green-400"
              >
                <span className="truncate max-w-[16rem]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-auto inline-flex items-center justify-center rounded-full p-1 hover:bg-green-100 dark:hover:bg-green-900/50"
                  aria-label={`Remover ${file.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
