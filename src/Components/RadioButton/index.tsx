interface PropType {
  checked: boolean;
  title: string;
  className: string;
  onClick: () => void;
}

function RadioButton({
  checked = false,
  title = '',
  className = '',
  onClick,
}: PropType) {
  return (
    <div className={`flex ${className}`}>
      <div
        className="w-[24px] h-[24px] rounded-full border-4 border-blue-500 flex justify-center items-center cursor-pointer"
        onClick={onClick}
      >
        {checked && (
          <div className="w-[10px] h-[10px] rounded-full bg-blue-500"></div>
        )}
      </div>
      <p className="pl-2 capitalize">{title}</p>
    </div>
  );
}

export default RadioButton;
