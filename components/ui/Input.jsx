const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  icon: Icon,
  ...props
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      {Icon && (
        <div className="absolute left-3 text-text-light">
          <Icon className="size-5" />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-app-inner-bg border border-border-color rounded-lg py-2.5 ${Icon ? "pl-10" : "px-4"} pr-4 text-sm font-medium outline-none focus:border-foreground/20 transition-all placeholder:text-text-light`}
        {...props}
      />
    </div>
  );
};

export default Input;
