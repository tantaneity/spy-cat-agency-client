interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost-blue" | "ghost-red";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseClasses = "px-4 py-2 text-sm rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-600 text-slate-200 hover:bg-slate-500",
    danger: "bg-red-600 text-white hover:bg-red-700",
    "ghost-blue": "text-blue-400 hover:bg-blue-900/30",
    "ghost-red": "text-red-400 hover:bg-red-900/30",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
