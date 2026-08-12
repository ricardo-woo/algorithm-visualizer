interface ButtonProps {
  display?: React.ReactNode;
  onClick?: () => void;
  bgcolor?: string;
  txtcolor?: string;
}

export const Button = ({
  display,
  onClick,
  bgcolor,
  txtcolor,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-md
        ${bgcolor}
        ${txtcolor}
        px-4
        py-2
        text-lg
        font-semibold
        transition-all
        hover:saturate-150
        hover:brightness-90
        delay-50
        duration-200
        ease-in-out
      `}
    >
      {display}
    </button>
  );
};
