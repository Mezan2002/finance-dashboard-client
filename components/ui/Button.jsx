const Button = ({ children, onClick, className, variant = "default" }) => {
  const variantClasses = {
    default:
      "bg-foreground text-background w-full py-2 rounded-lg mt-4 font-medium hover:opacity-90 transition-opacity",
    outline: "border border-border-color",
    ghost: "bg-transparent",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
