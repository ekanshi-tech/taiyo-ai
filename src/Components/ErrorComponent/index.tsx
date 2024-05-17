interface PropType {
  children: JSX.Element | JSX.Element[];
}

function ErrorComponent({ children }: PropType) {
  return (
    <div className="flex flex-col items-center w-full">
      <img
        className="w-28"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1200px-Flat_cross_icon.svg.png"
        alt=""
      />
      <div className="mt-4 text-2xl text-center text-white">{children}</div>
    </div>
  );
}

export default ErrorComponent;
