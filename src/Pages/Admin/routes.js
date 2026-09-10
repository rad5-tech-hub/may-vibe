import { LayoutDashboard, Music2, Users, UserCheck } from "lucide-react";

export const adminNav = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Releases", path: "/admin/releases", icon: Music2 },
  { label: "Distro Artiste", path: "/admin/distro-artiste", icon: Users },
  {
    label: "Distributions",
    icon: Music2,
    children: [
      { label: "All Album Distributions", path: "/admin/distributions/albums" },
      { label: "All Track Distributions", path: "/admin/distributions/tracks" },
    ],
  },
  { label: "All Transactions", path: "/admin/transactions", icon: Music2 },
  { label: "Transactions Without Accounts", path: "/admin/transactions-without-accounts", icon: Music2 },
  { label: "All Fundings", path: "/admin/fundings", icon: Music2 },
  { label: "All Registered Users", path: "/admin/users", icon: Users },
  { label: "Payment Requests", path: "/admin/payment-requests", icon: Music2 },
  { label: "Add Admin", path: "/admin/add-admin", icon: UserCheck },
  { label: "Add Genre", path: "/admin/add-genre", icon: Music2 },
  { label: "Set Account Activation Fees", path: "/admin/activation-fees", icon: Music2 },
  { label: "Verify Artist", path: "/admin/verify-artist", icon: UserCheck },
  { label: "Profile", path: "/admin/profile", icon: Users },
];
