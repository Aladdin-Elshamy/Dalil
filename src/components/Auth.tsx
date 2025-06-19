import { useLocation } from "react-router";
import { Navigate } from "react-router";

export default function Auth({
  redirectPath,
  isAllowed,
  children,
}: {
  redirectPath: string;
  isAllowed: boolean;
  children: React.ReactNode;
}) {
  const pathName = useLocation().pathname;
  console.log(isAllowed);

  if (!isAllowed) return children;
  return <Navigate to={redirectPath} state={{ from: pathName }} replace />;
}
