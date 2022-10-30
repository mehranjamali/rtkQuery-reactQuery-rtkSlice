import { NavLink } from "react-router-dom";

export default function Navbar() {
   // generate nav link class name
   const generateNavLinkClassName = (isActive: boolean): string => {
      return `hover:text-sky-400 py-2 ${
         isActive && "border-b border-sky-400 text-slate-900 dark:text-slate-50 text-sky-400"
      }`;
   };
   return (
      <div
         className="flex flex-row justify-between items-center w-full text-sm bg-white border 
                      border-slate-slate rounded-md mb-10 shadow-xl px-4"
      >
         <NavLink to={"custom-query"} className={({ isActive }) => generateNavLinkClassName(isActive)}>
            custom query
         </NavLink>
         <NavLink to={"react-query"} className={({ isActive }) => generateNavLinkClassName(isActive)}>
            react-query
         </NavLink>
         <NavLink to={"rtk-query"} className={({ isActive }) => generateNavLinkClassName(isActive)}>
            rtk-query
         </NavLink>
         <NavLink to={"rtk-slice"} className={({ isActive }) => generateNavLinkClassName(isActive)}>
            rtk slice
         </NavLink>
      </div>
   );
}
