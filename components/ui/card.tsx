interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export function Card({ children, title }: CardProps) {
  return (
    <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700">
      {title && (
        <div className="px-6 py-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
        </div>
      )}
      <div className={title ? "" : "p-6"}>
        {children}
      </div>
    </div>
  );
}
