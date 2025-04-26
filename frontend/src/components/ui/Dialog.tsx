"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from './Button';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Dialog({ isOpen, onClose, title, children, className }: DialogProps) {
  const [isAnimation, setIsAnimation] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  
  // Handle outside clicks to close the dialog
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      // Prevent scrolling when dialog is open
      document.body.style.overflow = 'hidden';
      // Start animation
      setIsAnimation(true);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Handle ESC key to close the dialog
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        ref={dialogRef}
        className={cn(
          "bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden",
          isAnimation ? "animate-in zoom-in-95 duration-200" : "",
          className
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} title="Close">
            <X className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}