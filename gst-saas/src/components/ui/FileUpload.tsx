'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, FileSpreadsheet, FileText, CheckCircle } from 'lucide-react';

interface FileUploadProps {
    accept?: string;
    multiple?: boolean;
    maxSize?: number; // in MB
    onFilesSelected: (files: File[]) => void;
    onFileRemove?: (file: File) => void;
    className?: string;
    disabled?: boolean;
}

interface UploadedFile {
    file: File;
    progress: number;
    status: 'uploading' | 'complete' | 'error';
}

const FileUpload = ({
    accept = '.xlsx,.xls,.csv,.pdf',
    multiple = true,
    maxSize = 10,
    onFilesSelected,
    onFileRemove,
    className = '',
    disabled = false,
}: FileUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (['xlsx', 'xls', 'csv'].includes(ext || '')) {
            return <FileSpreadsheet className="w-8 h-8 text-success" />;
        }
        if (ext === 'pdf') {
            return <FileText className="w-8 h-8 text-destructive" />;
        }
        return <File className="w-8 h-8 text-muted-foreground" />;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processFiles = useCallback((files: FileList) => {
        const validFiles: File[] = [];

        Array.from(files).forEach((file) => {
            // Check file size
            if (file.size > maxSize * 1024 * 1024) {
                console.warn(`File ${file.name} exceeds ${maxSize}MB limit`);
                return;
            }
            validFiles.push(file);
        });

        if (validFiles.length > 0) {
            // Simulate upload progress
            const newUploadedFiles = validFiles.map((file) => ({
                file,
                progress: 0,
                status: 'uploading' as const,
            }));

            setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
            onFilesSelected(validFiles);

            // Simulate progress
            validFiles.forEach((file, index) => {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 30;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                        setUploadedFiles((prev) =>
                            prev.map((uf) =>
                                uf.file === file ? { ...uf, progress: 100, status: 'complete' } : uf
                            )
                        );
                    } else {
                        setUploadedFiles((prev) =>
                            prev.map((uf) =>
                                uf.file === file ? { ...uf, progress } : uf
                            )
                        );
                    }
                }, 200 + index * 100);
            });
        }
    }, [maxSize, onFilesSelected]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;
        processFiles(e.dataTransfer.files);
    }, [disabled, processFiles]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            processFiles(e.target.files);
        }
    }, [processFiles]);

    const removeFile = (file: File) => {
        setUploadedFiles((prev) => prev.filter((uf) => uf.file !== file));
        onFileRemove?.(file);
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                animate={{
                    borderColor: isDragging ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                }}
                className={`
          relative
          border-2 border-dashed rounded-2xl
          p-8 text-center
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50'}
        `}
            >
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileInput}
                    disabled={disabled}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />

                <motion.div
                    animate={{ scale: isDragging ? 1.1 : 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <motion.div
                        animate={{ y: isDragging ? -5 : 0 }}
                        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                    >
                        <Upload className="w-8 h-8 text-primary" />
                    </motion.div>

                    <div>
                        <p className="text-lg font-medium text-foreground">
                            {isDragging ? 'Drop files here' : 'Drag & drop files here'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            or click to browse
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-muted rounded-md">Excel (.xlsx, .xls)</span>
                        <span className="px-2 py-1 bg-muted rounded-md">CSV</span>
                        <span className="px-2 py-1 bg-muted rounded-md">PDF</span>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Max file size: {maxSize}MB
                    </p>
                </motion.div>
            </motion.div>

            {/* Uploaded Files List */}
            <AnimatePresence>
                {uploadedFiles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                    >
                        {uploadedFiles.map((uploadedFile, index) => (
                            <motion.div
                                key={`${uploadedFile.file.name}-${index}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border"
                            >
                                {getFileIcon(uploadedFile.file.name)}

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {uploadedFile.file.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatFileSize(uploadedFile.file.size)}
                                    </p>

                                    {uploadedFile.status === 'uploading' && (
                                        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-primary rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${uploadedFile.progress}%` }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {uploadedFile.status === 'complete' && (
                                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                                )}

                                <button
                                    onClick={() => removeFile(uploadedFile.file)}
                                    className="p-1 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export { FileUpload };
