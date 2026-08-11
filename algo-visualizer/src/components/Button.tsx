interface ButtonProps {
  display?: React.ReactNode;
  onClick?: () => void;
  bgcolor?: string;
}

export const Button = ({ display, onClick, bgcolor }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-md
        ${bgcolor}
        px-4
        py-2
        text-lg
        font-semibold
        text-foreground
        transition-all
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
