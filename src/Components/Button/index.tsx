interface PropType {
  className?: string;
  disabled?: boolean;
  children: JSX.Element | string;
  onClick: () => void;
}

function Button({
  className = '',
  children,
  disabled = false,
  onClick,
}: PropType) {
  return (
    <button
      className={`bg-blue-500 text-white text-lg w-full py-2 px-4 rounded-lg ${className} ${
        disabled && 'cursor-not-allowed opacity-30'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
