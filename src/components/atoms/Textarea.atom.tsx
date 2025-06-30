import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: "default" | "bordered" | "ghost";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, variant = "bordered", className, ...props }, ref) => {
    const baseClasses = "textarea w-full";
    const variantClasses = {
      default: "textarea-primary",
      bordered: "textarea-bordered",
      ghost: "textarea-ghost",
    };

    return (
      <div className="form-control w-full">
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            baseClasses,
            variantClasses[variant],
            error && "textarea-error",
            className,
          )}
          {...props}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
