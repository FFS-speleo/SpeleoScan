import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "bordered" | "ghost";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, variant = "bordered", className, ...props }, ref) => {
    const baseClasses = "input w-full";
    const variantClasses = {
      default: "input-primary",
      bordered: "input-bordered",
      ghost: "input-ghost",
    };

    return (
      <div className="form-control w-full">
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            baseClasses,
            variantClasses[variant],
            error && "input-error",
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

Input.displayName = "Input";

export default Input;
