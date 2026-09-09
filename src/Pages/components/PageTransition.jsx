import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const prevPath = useRef(location.pathname);
  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isDashboard) return;
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname;
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isDashboard]);

  if (isDashboard) return <>{children}</>;

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
      <div className={loading ? "" : "page-enter-active"} style={loading ? {} : { opacity: 1 }}>
        {children}
      </div>
    </>
  );
}
