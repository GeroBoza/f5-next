export default function ProtectedRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-lvh justify-center px-24 pb-5 pt-24">
      <div data-theme="light" className="w-full">
        {children}
      </div>
    </div>
  );
}
