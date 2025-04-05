export function Card({ children, className = "" }) {
  return (
    <div className={`p-4 shadow-lg rounded-lg bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}
