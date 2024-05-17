import './index.scss';

interface PropTypes {
  label: string;
  value: any;
  type?: string;
  className?: string;
  onChange: (value: string) => void;
}

function Input({
  label,
  className = '',
  value = '',
  type = 'text',
  onChange,
}: PropTypes) {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      <label className="mb-2 text-xl text-white" htmlFor="">
        {label}
      </label>
      <input
        className="w-full input"
        type={type}
        value={value}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
          onChange(target.value)
        }
      />
    </div>
  );
}

export default Input;
