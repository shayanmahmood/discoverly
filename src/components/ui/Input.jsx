import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(
  ({ className, type, onChange, value, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange?.({ target: { value: internalValue } });
      }, 300); // Debounce delay (adjust as needed)

      return () => clearTimeout(timeout);
    }, [internalValue, onChange]);

    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-input bg-background px-4 py-2.5 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
