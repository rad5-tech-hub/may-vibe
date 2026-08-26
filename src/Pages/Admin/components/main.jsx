import { Outlet, useLocation } from "react-router-dom";
import { adminNav } from "../routes";

const PageTitle = () => {
  const location = useLocation();
  const item = adminNav.find(
    (nav) => nav.path === location.pathname || nav.children?.some((child) => child.path === location.pathname)
  );
  const child = item?.children?.find((c) => c.path === location.pathname);
  return child ? <p className="mb-2 text-sm font-medium text-orange-500">{child.label}</p> : null;
};

const Main = () => (
  <div className="mx-auto max-w-7xl">
    <PageTitle />
    <Outlet />
  </div>
);

export default Main;
