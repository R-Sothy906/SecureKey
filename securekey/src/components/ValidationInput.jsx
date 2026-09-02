import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ValidationInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  status = "neutral", // neutral, valid, invalid
  message,
  placeholder,
  disabled,
  required,
  name
}) => {
  const isValid = status === 'valid';
  const isInvalid = status === 'invalid';

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className={cn(
        "text-sm font-medium transition-colors",
        isInvalid ? "text-red-500" : "text-slate-700"
      )}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn(
            "pr-10 transition-all duration-200",
            isValid && "border-green-500 bg-green-50 focus-visible:ring-green-500 text-green-900 placeholder:text-green-700/50",
            isInvalid && "border-red-500 bg-red-50 focus-visible:ring-red-500 text-red-900 placeholder:text-red-700/50"
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <AnimatePresence mode="wait">
            {isValid && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Check className="h-5 w-5 text-green-500" />
              </motion.div>
            )}
            {isInvalid && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <X className="h-5 w-5 text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="min-h-[20px]">
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1.5"
            >
              {isInvalid && <AlertCircle className="h-3 w-3 text-red-500" />}
              <p
                className={cn(
                  "text-xs font-medium",
                  isValid ? "text-green-600" : "",
                  isInvalid ? "text-red-500" : "text-slate-500"
                )}
              >
                {message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ValidationInput;