interface ButtonProps {
  display: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ display, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        m-4
        rounded-lg
        bg-secondary
        px-5 py-2.5
        font-medium
        text-white
        shadow-sm
        transition
        delay-100
        duration-200
        ease-in-out
        hover:bg-primary
        hover:scale-110
      "
    >
      {display}
    </button>
  );
};
