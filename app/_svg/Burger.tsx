const Burger = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Layer_1"
      onClick={onClick}
      x="0px"
      y="0px"
      viewBox="0 0 120 120"
      className={className}
    >
      <path
        fill="#000066"
        d="M21.8,96c-2.7,0-5-2.2-5-5c0-2.7,2.2-5,5-5h76.4c2.7,0,5,2.2,5,5c0,2.7-2.2,5-5,5H21.8L21.8,96z M21.8,64.6  c-2.7,0-5-2.2-5-5c0-2.7,2.2-5,5-5h76.4c2.7,0,5,2.2,5,5c0,2.7-2.2,5-5,5H21.8L21.8,64.6z M21.8,33.9c-2.7,0-5-2.2-5-5  c0-2.7,2.2-5,5-5h76.4c2.7,0,5,2.2,5,5c0,2.7-2.2,5-5,5H21.8z"
      />
    </svg>
  );
};

export default Burger;
