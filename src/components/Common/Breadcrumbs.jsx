import React from "react";
import { Home, Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";
import bg from '../../assets/images/breadcrumbs.jpg'

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((x) => x);

  const crumbs = paths.map((segment) => {
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    return name;
  });

  // ✅ تاريخ اليوم
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative h-40 mb-10 overflow-hidden text-white">
      <img
        src={bg}
        alt="breadcrumb background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      {/* المحتوى */}
      <div className="relative !w-full p-6 lg:p-8 flex flex-col sm:items-between sm:justify-between gap-5">
        {/* العنوان والمسار */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {crumbs[crumbs.length - 1] || "Dashboard"}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-200">
            <Home className="w-4 h-4" />
            <span>Home</span>
            {crumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <span className="text-gray-400">{">"}</span>
                <span
                  className={`${
                    i === crumbs.length - 1
                      ? "text-emerald-400 font-medium"
                      : "text-white"
                  }`}
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* التاريخ */}
        <div className="flex items-center justify-end !w-full gap-2 text-lg !text-end text-white mt-4 sm:mt-0">
          <Calendar className="w-4 h-4 text-white" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
