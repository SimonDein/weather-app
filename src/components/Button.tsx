interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`hover:bg-cyan-950 active:bg-cyan-900 rounded-md ${className}`}
      {...rest}
    >
      {rest.children}
    </button>
  );
}
