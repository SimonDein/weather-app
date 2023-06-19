export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <h1 className="text-xl font-semibold">{children}</h1>
    </div>
  );
}
