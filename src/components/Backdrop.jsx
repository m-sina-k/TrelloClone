const Backdrop = ({ isActive }) => {
  const bgStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(2px)",
  };

  return (
    <div
      className={`backdrop opacity-0 fixed z-40 pointer-events-none top-0 left-0 right-0 bottom-0 transition-all duration-200 ${
        isActive ? "pointer-events-auto opacity-100" : ""
      }`}
      style={bgStyle}
    ></div>
  );
};

export default Backdrop;
