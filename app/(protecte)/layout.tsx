import NavBar from "./_components/navbar";

interface Props {
  children: React.ReactNode;
}
export default function ProtectedLayout({ children }: Props) {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center   justify-center bg-sky-500">
      <NavBar />
      {children}
    </div>
  );
}
