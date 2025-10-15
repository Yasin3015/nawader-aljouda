// src/components/Container.jsx
const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full max-w-7xl mx-auto  sm:px-5 lg:px-7 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
