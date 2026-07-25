import * as React from "react";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { cn } from "../../lib/utils";

export interface FileDropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
  /** Tipos aceitos, repassados ao `<input type="file">` (ex.: ".xlsx,.csv"). */
  accept?: string;
  /** Permite selecionar mais de um arquivo. Padrão: false. */
  multiple?: boolean;
  /** Desabilita a interação. */
  disabled?: boolean;
  /** Chamado com os arquivos escolhidos (via clique ou drop). */
  onFilesSelected?: (files: File[]) => void;
  /** Texto principal. Padrão: "Clique para enviar ou arraste até aqui". */
  title?: React.ReactNode;
  /** Texto de apoio (ex.: formatos aceitos). */
  description?: React.ReactNode;
  /** Ícone exibido no estado vazio. Padrão: `UploadCloud`. */
  icon?: React.ReactNode;
  /** `id` do input, útil para associar a um `<label>` externo. */
  inputId?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

/**
 * Área de upload por arraste ou clique. Puramente visual: mantém o estado dos
 * arquivos selecionados e emite `onFilesSelected` — o envio fica no chamador.
 */
export function FileDropzone({
  accept,
  multiple = false,
  disabled = false,
  onFilesSelected,
  title = "Clique para enviar ou arraste até aqui",
  description,
  icon,
  inputId,
  className,
  ...props
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dragDepth = React.useRef(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const next = Array.from(fileList);
    setFiles(next);
    onFilesSelected?.(next);
  };

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  const clear = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
    onFilesSelected?.([]);
  };

  const hasFiles = files.length > 0;

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={openPicker}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPicker();
        }
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        if (disabled) return;
        dragDepth.current += 1;
        setIsDragging(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => {
        event.preventDefault();
        dragDepth.current -= 1;
        if (dragDepth.current <= 0) setIsDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        dragDepth.current = 0;
        setIsDragging(false);
        if (disabled) return;
        handleFiles(event.dataTransfer.files);
      }}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input px-6 py-8 text-center transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        !disabled && "cursor-pointer hover:border-primary/50 hover:bg-muted/50",
        isDragging && "border-primary bg-primary/5",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />

      {hasFiles ? (
        <ul className="flex w-full flex-col gap-1.5">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-2 rounded-md bg-muted/60 px-3 py-2 text-left text-sm"
            >
              <FileIcon className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate">{file.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatBytes(file.size)}
              </span>
              {!disabled && (
                <button
                  type="button"
                  onClick={clear}
                  aria-label={`Remover ${file.name}`}
                  className="shrink-0 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="size-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div className="text-muted-foreground [&_svg]:size-8" aria-hidden="true">
            {icon ?? <UploadCloud />}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-foreground">{title}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
