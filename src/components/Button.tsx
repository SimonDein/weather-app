interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ variant = "primary", ...rest }: ButtonProps) {
  return <button {...rest}>{rest.children}</button>;
}
