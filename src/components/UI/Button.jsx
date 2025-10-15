import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none active:scale-95 select-none";

  const variants = {
    primary: `
      bg-[var(--color-primary)] 
      text-[var(--color-white)] 
      hover:bg-[var(--color-hard-primary)] 
      focus:ring-2 
      focus:ring-[var(--color-soft-primary)]
    `,
    secondary: `
      bg-[var(--color-gray-1)]
      text-[var(--color-gray-9)]
      hover:bg-[var(--color-gray-2)]
      focus:ring-2 
      focus:ring-[var(--color-gray-3)]
    `,
    warning: `
      bg-[var(--color-warning)] 
      text-[var(--color-white)] 
      hover:opacity-90 
      focus:ring-2 
      focus:ring-[var(--color-warning)]
    `,
    danger: `
      bg-[var(--color-danger)] 
      text-[var(--color-white)] 
      hover:opacity-90 
      focus:ring-2 
      focus:ring-[var(--color-danger)]
    `,
    outline: `
      border border-[var(--color-primary)] 
      text-[var(--color-primary)] 
      hover:bg-[var(--color-soft-primary)]
      focus:ring-2 
      focus:ring-[var(--color-primary)]
    `,
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5 rounded-[var(--radius-sm)]",
    md: "text-base px-4 py-2 rounded-[var(--radius-md)]",
    lg: "text-lg px-6 py-3 rounded-[var(--radius-lg)]",
  };
  const combinedClasses = [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .join(" ")
    .replace(/\s+/g, " ");

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
