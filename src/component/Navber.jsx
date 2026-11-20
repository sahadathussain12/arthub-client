
// "use client";

// import { useState } from "react";
// import { useSession, authClient } from "@/lib/auth-client";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   FiMenu,
//   FiX,
//   FiChevronDown,
//   FiShoppingBag,
//   FiArrowUpRight,
//   FiUser,
//   FiLogOut,
//   FiSettings,
// } from "react-icons/fi";
// import { toast } from "react-toastify";

// const navLinks = [
//   { name: "Home", href: "/" },
//   { name: "Browse Artworks", href: "/artworks" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const pathname = usePathname();
//   const router = useRouter();

//   const { data: session } = useSession();
//   const user = session?.user;
//   console.log(user);

//   const isActive = (path) => pathname === path;

//   // Logout Function
//  const handleLogout = async () => {
//   try {
//     setLoading(true);

//     const { error } = await authClient.signOut();

//     if (error) {
//       toast.error(error.message || "Logout failed");
//       return;
//     }

//     // Immediately update Navbar UI
//     toast.success("Logout successful!");

//     setProfileOpen(false);
//     setDropdownOpen(false);
//     setMenuOpen(false);

//     router.replace("/");
//     router.refresh();

//   } catch (error) {
//     console.error("Logout error:", error);
//     toast.error("Something went wrong!");
//   } finally {
//     setLoading(false);
//   }
// };

//   // User Avatar
//   const avatar = user?.image;
//   const userName = user?.name || "User";
//   const userRole = user?.role || "user";

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080714]/90 text-white shadow-lg shadow-black/10 backdrop-blur-xl">

//       <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">

//         {/* Logo */}
//         <Link href="/" className="group flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-800 shadow-lg shadow-purple-500/25 transition duration-300 group-hover:rotate-6 group-hover:scale-105">
//             <FiShoppingBag className="text-xl text-white" />
//           </div>

//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">
//               Art<span className="text-purple-400">Hub</span>
//               <span className="text-purple-400">.</span>
//             </h1>

//             <p className="text-[9px] font-medium uppercase tracking-[3px] text-gray-400">
//               Discover Original Art
//             </p>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden items-center gap-8 lg:flex">

//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className={`relative py-2 text-sm font-medium transition duration-300 ${
//                 isActive(link.href)
//                   ? "font-semibold text-purple-400"
//                   : "text-gray-300 hover:text-purple-400"
//               }`}
//             >
//               {link.name}

//               <span
//                 className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-purple-500 transition-all duration-300 ${
//                   isActive(link.href) ? "w-full" : "w-0"
//                 }`}
//               />
//             </Link>
//           ))}

//           {/* Dashboard Dropdown */}
//           {user && (
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center gap-1.5 py-2 text-sm font-medium text-gray-300 transition hover:text-purple-400"
//               >
//                 Dashboard

//                 <FiChevronDown
//                   className={`text-xs transition-transform ${
//                     dropdownOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 z-50 mt-3 w-52 rounded-2xl border border-white/10 bg-[#0D0B1B] p-2 shadow-2xl">

//                   <Link
//                     href="/dashboard/user"
//                     onClick={() => setDropdownOpen(false)}
//                     className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-purple-500/15 hover:text-purple-300"
//                   >
//                     User Dashboard
//                   </Link>

//                   <Link
//                     href="/dashboard/artist"
//                     onClick={() => setDropdownOpen(false)}
//                     className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-purple-500/15 hover:text-purple-300"
//                   >
//                     Artist Dashboard
//                   </Link>

//                   {userRole === "admin" && (
//                     <Link
//                       href="/dashboard/admin"
//                       onClick={() => setDropdownOpen(false)}
//                       className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-purple-500/15 hover:text-purple-300"
//                     >
//                       Admin Dashboard
//                     </Link>
//                   )}

//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Desktop Auth Actions */}
//         <div className="hidden items-center gap-5 lg:flex">

//           {!user ? (
//             <>
//               <Link
//                 href="/auth/login"
//                 className="text-sm font-semibold text-gray-300 transition hover:text-white"
//               >
//                 Sign In
//               </Link>

//               <Link
//                 href="/auth/register"
//                 className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-purple-500 hover:to-violet-500"
//               >
//                 Get Started
//                 <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
//               </Link>
//             </>
//           ) : (

//             /* Logged In User Profile */
//             <div className="relative">

//               <button
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-3 transition hover:border-purple-500/50 hover:bg-purple-500/10"
//               >

//                 {avatar ? (
//                   <img
//                     src={avatar}
//                     alt={userName}
//                     className="h-10 w-10 rounded-full border-2 border-purple-500 object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-800 text-lg font-bold text-white">
//                     {userName.charAt(0).toUpperCase()}
//                   </div>
//                 )}

//                 <div className="text-left">
//                   <p className="max-w-[110px] truncate text-sm font-semibold text-white">
//                     {userName}
//                   </p>
//                   <p className="text-[10px] capitalize text-purple-400">
//                     {userRole}
//                   </p>
//                 </div>

//                 <FiChevronDown
//                   className={`text-gray-400 transition ${
//                     profileOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {/* Profile Dropdown */}
//               {profileOpen && (
//                 <div className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#100D20] p-2 shadow-2xl shadow-black/50">

//                   <div className="border-b border-white/10 px-4 py-3">
//                     <p className="truncate text-sm font-semibold text-white">
//                       {userName}
//                     </p>
//                     <p className="truncate text-xs text-gray-400">
//                       {user.email}
//                     </p>
//                   </div>

//                   <Link
//                     href={
//                       userRole === "artist"
//                         ? "/dashboard/artist"
//                         : userRole === "admin"
//                         ? "/dashboard/admin"
//                         : "/dashboard/user"
//                     }
//                     onClick={() => setProfileOpen(false)}
//                     className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-400"
//                   >
//                     <FiUser />
//                     My Dashboard
//                   </Link>

//                   <Link
//                     href="/profile"
//                     onClick={() => setProfileOpen(false)}
//                     className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-400"
//                   >
//                     <FiSettings />
//                     My Profile
//                   </Link>

//                   <div className="my-2 border-t border-white/10" />

//                   <button
//                     onClick={handleLogout}
//                     disabled={loading}
//                     className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
//                   >
//                     <FiLogOut />
//                     {loading ? "Logging out..." : "Logout"}
//                   </button>

//                 </div>
//               )}
//             </div>
//           )}

//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label={menuOpen ? "Close menu" : "Open menu"}
//           aria-expanded={menuOpen}
//           className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-purple-500/40 hover:bg-purple-500/10 lg:hidden"
//         >
//           {menuOpen ? <FiX size={23} /> : <FiMenu size={23} />}
//         </button>

//       </nav>

//       {/* Mobile Menu */}
//       <div
//         className={`overflow-hidden border-t border-white/10 bg-[#0D0B1B] transition-all duration-300 lg:hidden ${
//           menuOpen
//             ? "max-h-[750px] opacity-100"
//             : "max-h-0 border-transparent opacity-0"
//         }`}
//       >

//         <div className="space-y-2 px-5 py-5 sm:px-8">

//           {/* Mobile User Info */}
//           {user && (
//             <div className="mb-4 flex items-center gap-3 rounded-xl border border-purple-500/20 bg-purple-500/5 p-3">

//               {avatar ? (
//                 <img
//                   src={avatar}
//                   alt={userName}
//                   className="h-12 w-12 rounded-full border-2 border-purple-500 object-cover"
//                 />
//               ) : (
//                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
//                   {userName.charAt(0).toUpperCase()}
//                 </div>
//               )}

//               <div className="min-w-0">
//                 <p className="truncate text-sm font-semibold text-white">
//                   {userName}
//                 </p>
//                 <p className="truncate text-xs text-gray-400">
//                   {user.email}
//                 </p>
//                 <p className="text-xs capitalize text-purple-400">
//                   {userRole}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Mobile Navigation */}
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               onClick={() => setMenuOpen(false)}
//               className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
//                 isActive(link.href)
//                   ? "bg-purple-500/20 font-semibold text-purple-400"
//                   : "text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* Mobile Dashboard Links */}
//           {user && (
//             <div className="mt-3 border-t border-white/10 pt-3">

//               <p className="mb-2 px-4 text-[10px] font-bold uppercase tracking-wider text-purple-400">
//                 Dashboard
//               </p>

//               <Link
//                 href="/dashboard/user"
//                 onClick={() => setMenuOpen(false)}
//                 className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
//               >
//                 User Dashboard
//               </Link>

//               <Link
//                 href="/dashboard/artist"
//                 onClick={() => setMenuOpen(false)}
//                 className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
//               >
//                 Artist Dashboard
//               </Link>

//               {userRole === "admin" && (
//                 <Link
//                   href="/dashboard/admin"
//                   onClick={() => setMenuOpen(false)}
//                   className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
//                 >
//                   Admin Dashboard
//                 </Link>
//               )}

//               <Link
//                 href="/profile"
//                 onClick={() => setMenuOpen(false)}
//                 className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
//               >
//                 My Profile
//               </Link>

//             </div>
//           )}

//           {/* Mobile Auth Buttons */}
//           <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">

//             {!user ? (
//               <>
//                 <Link
//                   href="/auth/login"
//                   onClick={() => setMenuOpen(false)}
//                   className="rounded-full border border-white/15 py-3 text-center text-sm font-semibold text-white transition hover:border-purple-500"
//                 >
//                   Sign In
//                 </Link>

//                 <Link
//                   href="/auth/register"
//                   onClick={() => setMenuOpen(false)}
//                   className="flex items-center justify-center gap-2 rounded-full bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
//                 >
//                   Get Started
//                   <FiArrowUpRight />
//                 </Link>
//               </>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 disabled={loading}
//                 className="col-span-2 flex items-center justify-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
//               >
//                 <FiLogOut />
//                 {loading ? "Logging out..." : "Logout"}
//               </button>
//             )}

//           </div>

//         </div>
//       </div>

//     </header>
//   );
// }
"use client";

import { useState, Suspense } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiShoppingBag,
  FiArrowUpRight,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { toast } from "react-toastify";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Artworks", href: "/artworks" },
];

function NavbarContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const isActive = (path) => pathname === path;

  // Logout Function
  const handleLogout = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed");
        return;
      }

      toast.success("Logout successful!");

      setProfileOpen(false);
      setDropdownOpen(false);
      setMenuOpen(false);

      router.replace("/");
      router.refresh();

    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const avatar = user?.image;
  const userName = user?.name || "User";
  const userRole = user?.role || "user";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080714]/90 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-800 shadow-lg shadow-purple-500/25 transition duration-300 group-hover:rotate-6 group-hover:scale-105">
            <FiShoppingBag className="text-xl text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Art<span className="text-purple-400">Hub</span>
              <span className="text-purple-400">.</span>
            </h1>

            <p className="text-[9px] font-medium uppercase tracking-[3px] text-gray-400">
              Discover Original Art
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative py-2 text-sm font-medium transition duration-300 ${
                isActive(link.href)
                  ? "font-semibold text-purple-400"
                  : "text-gray-300 hover:text-purple-400"
              }`}
            >
              {link.name}

              <span
                className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-purple-500 transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0"
                }`}
              />
            </Link>
          ))}

          {/* Dashboard Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 py-2 text-sm font-medium text-gray-300 transition hover:text-purple-400"
              >
                Dashboard
                <FiChevronDown
                  className={`text-xs transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 z-50 mt-3 w-52 rounded-2xl border border-white/10 bg-[#0D0B1B] p-2 shadow-2xl">
                  <Link
                    href="/dashboard/user"
                    onClick={() => setDropdownOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-purple-500/15 hover:text-purple-300"
                  >
                    User Dashboard
                  </Link>

                  <Link
                    href="/dashboard/artist"
                    onClick={() => setDropdownOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-purple-500/15 hover:text-purple-300"
                  >
                    Artist Dashboard
                  </Link>

                  {userRole === "admin" && (
                    <Link
                      href="/dashboard/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-purple-500/15 hover:text-purple-300"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Auth Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-gray-300 transition hover:text-white"
              >
                Sign In
              </Link>

              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-purple-500 hover:to-violet-500"
              >
                Get Started
                <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-3 transition hover:border-purple-500/50 hover:bg-purple-500/10"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={userName}
                    className="h-10 w-10 rounded-full border-2 border-purple-500 object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-800 text-lg font-bold text-white">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="text-left">
                  <p className="max-w-[110px] truncate text-sm font-semibold text-white">
                    {userName}
                  </p>
                  <p className="text-[10px] capitalize text-purple-400">
                    {userRole}
                  </p>
                </div>

                <FiChevronDown
                  className={`text-gray-400 transition ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#100D20] p-2 shadow-2xl shadow-black/50">
                  <div className="border-b border-white/10 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-white">
                      {userName}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href={
                      userRole === "artist"
                        ? "/dashboard/artist"
                        : userRole === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    }
                    onClick={() => setProfileOpen(false)}
                    className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-400"
                  >
                    <FiUser />
                    My Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-400"
                  >
                    <FiSettings />
                    My Profile
                  </Link>

                  <div className="my-2 border-t border-white/10" />

                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                  >
                    <FiLogOut />
                    {loading ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-purple-500/40 hover:bg-purple-500/10 lg:hidden"
        >
          {menuOpen ? <FiX size={23} /> : <FiMenu size={23} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0D0B1B] transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[750px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="space-y-2 px-5 py-5 sm:px-8">
          {user && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-purple-500/20 bg-purple-500/5 p-3">
              {avatar ? (
                <img
                  src={avatar}
                  alt={userName}
                  className="h-12 w-12 rounded-full border-2 border-purple-500 object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {userName}
                </p>
                <p className="truncate text-xs text-gray-400">
                  {user.email}
                </p>
                <p className="text-xs capitalize text-purple-400">
                  {userRole}
                </p>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive(link.href)
                  ? "bg-purple-500/20 font-semibold text-purple-400"
                  : "text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="mb-2 px-4 text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Dashboard
              </p>

              <Link
                href="/dashboard/user"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
              >
                User Dashboard
              </Link>

              <Link
                href="/dashboard/artist"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
              >
                Artist Dashboard
              </Link>

              {userRole === "admin" && (
                <Link
                  href="/dashboard/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
                >
                  Admin Dashboard
                </Link>
              )}

              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
              >
                My Profile
              </Link>
            </div>
          )}

          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
            {!user ? (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-white/15 py-3 text-center text-sm font-semibold text-white transition hover:border-purple-500"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
                >
                  Get Started
                  <FiArrowUpRight />
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                disabled={loading}
                className="col-span-2 flex items-center justify-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
              >
                <FiLogOut />
                {loading ? "Logging out..." : "Logout"}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// মূল এক্সপোর্ট যেখানে সাসপেন্স দিয়ে মোড়ানো আছে
export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-[76px] bg-[#080714]" />}>
      <NavbarContent />
    </Suspense>
  );
}