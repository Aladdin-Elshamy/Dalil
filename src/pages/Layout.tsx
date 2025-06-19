import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="container">
      <p>hello</p>
      <Outlet />
    </div>
  );
}
