/* eslint-disable react/prop-types */
import React from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

// Small loader component for inline/button use
export const Spinner = ({ size = "default", className, ...props }) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  return (
    <Loader2
      className={cn(
        "animate-spin",
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    />
  );
};

// Full page loading overlay
export const PageLoader = ({
  message = "Loading...",
  className,
  spinnerSize = "xl",
  ...props
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner size={spinnerSize} className="text-primary" />
        {message && (
          <p className="text-lg font-medium text-foreground animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

// Inline loader with optional text
export const InlineLoader = ({
  message = "Loading...",
  className,
  spinnerSize = "default",
  ...props
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Spinner size={spinnerSize} className="text-primary" />
      {message && (
        <span className="text-sm font-medium text-muted-foreground">
          {message}
        </span>
      )}
    </div>
  );
};

// Skeleton loader for content placeholders
export const ContentLoader = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/60", className)}
      {...props}
    />
  );
};
