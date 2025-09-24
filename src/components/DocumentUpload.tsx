import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DocumentUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

export const DocumentUpload = ({ onFileSelect, isProcessing }: DocumentUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    multiple: false,
    disabled: isProcessing,
  });

  return (
    <Card className="p-8 border-2 border-dashed transition-all duration-300 hover:border-primary/50">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center space-y-4 cursor-pointer transition-all duration-200",
          isDragActive && "scale-105",
          isProcessing && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="p-4 rounded-full bg-primary/10">
          <Upload className="h-8 w-8 text-primary" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-card-foreground">
            {isDragActive ? "Drop your document here" : "Upload Legal Document"}
          </h3>
          <p className="text-muted-foreground max-w-md">
            Drag and drop your contract, insurance policy, or rental agreement here, or click to browse.
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <FileText className="h-4 w-4" />
            <span>PDF, DOC, DOCX, TXT</span>
          </div>
          <div className="flex items-center space-x-1">
            <AlertCircle className="h-4 w-4" />
            <span>Max 10MB</span>
          </div>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          disabled={isProcessing}
          className="mt-4"
        >
          {isProcessing ? "Processing..." : "Choose File"}
        </Button>
      </div>
    </Card>
  );
};