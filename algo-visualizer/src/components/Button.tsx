interface ButtonProps {
  display?: React.ReactNode;
  onClick?: () => void;
  bgcolor?: string;
  txtcolor?: string;
  width?: React.ReactNode;
}

export const Button = ({
  display,
  onClick,
  bgcolor,
  txtcolor,
  width,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-md
        ${bgcolor}
        ${txtcolor}
        ${width}
        px-4
        py-2
        text-lg
        font-semibold
        transition-all
        hover:saturate-300
        delay-25
        duration-200
        ease-in-out
      `}
    >
      {display}
    </button>
  );
};
