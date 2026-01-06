// import { NavLink } from "react-router-dom";

// export default function BottomNav() {
//   return (
//     <nav className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
//       <div className="w-full max-w-md bg-white/95 backdrop-blur border-t border-pink-100 rounded-t-3xl px-4 py-2">
//         <div className="flex justify-between items-center">

//           <NavItem to="/home" label="Home" icon="🏠" />
//           <NavItem to="/calendar" label="Calendar" icon="📅" />
//           <NavItem to="/add" label="Add" icon="➕" />
//           <NavItem to="/knowledge" label="Learn" icon="📖" />
//           <NavItem to="/settings" label="Settings" icon="⚙️" />

//         </div>
//       </div>
//     </nav>
//   );
// }

// function NavItem({
//   to,
//   icon,
//   label,
// }: {
//   to: string;
//   icon: string;
//   label: string;
// }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex flex-col items-center text-xs px-2 py-1 rounded-xl transition
//         ${
//           isActive
//             ? "text-pink-600 font-semibold"
//             : "text-gray-500"
//         }`
//       }
//     >
//       <span className="text-lg">{icon}</span>
//       <span className="mt-0.5">{label}</span>
//     </NavLink>
//   );
// }

import { NavLink } from "react-router-dom";
import {
  Home,
  CalendarDays,
  PlusCircle,
  BookOpen,
  Settings,
} from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
      <div className="w-full max-w-md bg-white/95 backdrop-blur border-t border-pink-100 rounded-t-3xl px-4 py-2">
        <div className="flex justify-between items-center">

          <NavItem to="/home" label="Home" icon={<Home />} />
          <NavItem to="/calendar" label="Calendar" icon={<CalendarDays />} />
          <NavItem to="/add" label="Add" icon={<PlusCircle />} />
          <NavItem to="/knowledge" label="Learn" icon={<BookOpen />} />
          <NavItem to="/settings" label="Settings" icon={<Settings />} />

        </div>
      </div>
    </nav>
  );
}

function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center text-xs px-2 py-1 rounded-xl transition
        ${
          isActive
            ? "text-pink-600 font-semibold"
            : "text-gray-500"
        }`
      }
    >
      <span className="w-6 h-6 flex items-center justify-center">
        {icon}
      </span>
      <span className="mt-0.5">{label}</span>
    </NavLink>
  );
}
