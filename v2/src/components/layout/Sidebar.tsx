"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  User, 
  Users, 
  MessageSquare, 
  Briefcase, 
  Bell, 
  Settings, 
  Heart 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Feed", href: "/feed", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Connections", href: "/connections", icon: Users },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Dating", href: "/dating", icon: Heart },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-surface-raised border-r border-border hidden md:flex flex-col p-4">
      <div className="mb-8 px-4">
        <h2 className="text-2xl font-bold text-brand">Rhockstar</h2>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "text-secondary hover:bg-surface hover:text-primary hover:shadow-sm"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-white font-bold">
            EP
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Elijah Peter</span>
            <span className="text-xs text-tertiary">@elijah_p</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
