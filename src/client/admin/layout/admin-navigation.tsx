"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import {
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  Menu,
  MessageSquareQuote,
  SearchCheck,
  Settings,
  Users,
  Workflow,
  X,
} from "lucide-react";
import styles from "./admin-shell.module.css";

type NavigationItem = {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
};

const navigationItems: NavigationItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Services", href: "/admin/services", icon: BriefcaseBusiness },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Process", href: "/admin/process", icon: Workflow },
  { label: "Impact", href: "/admin/impact", icon: BarChart3 },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "SEO", href: "/admin/seo", icon: SearchCheck },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <Link className={styles.brand} href="/admin" onClick={onNavigate}>
        <span className={styles.brandMark}>
          <Image src="/images/brand/huipper-mark-clean.png" alt="" width={28} height={28} />
        </span>
        <span>
          <strong>Huipper</strong>
          <small>Administration</small>
        </span>
      </Link>

      <nav className={styles.nav} aria-label="Admin navigation">
        <p className={styles.navLabel}>Workspace</p>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              href={item.href}
              key={item.href}
              onClick={onNavigate}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
              <ChevronRight className={styles.navChevron} size={15} />
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <FileText size={17} />
        <span>Foundation phase</span>
      </div>
    </>
  );
}

export default function AdminNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentItem = navigationItems.find((item) =>
    item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href),
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <aside className={styles.desktopSidebar}>
        <SidebarContent />
      </aside>

      <header className={styles.topbar}>
        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
          aria-expanded={isOpen}
        >
          <Menu size={21} />
        </button>
        <div className={styles.topbarTitle}>
          <span>Admin</span>
          <strong>{currentItem?.label ?? "Workspace"}</strong>
        </div>
        <div className={styles.environmentBadge}>Preview</div>
      </header>

      <div className={`${styles.mobileOverlay} ${isOpen ? styles.mobileOverlayOpen : ""}`}>
        <button
          className={styles.overlayDismiss}
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsOpen(false)}
        />
        <aside className={`${styles.mobileSidebar} ${isOpen ? styles.mobileSidebarOpen : ""}`}>
          <button className={styles.closeButton} type="button" onClick={() => setIsOpen(false)} aria-label="Close navigation">
            <X size={20} />
          </button>
          <SidebarContent onNavigate={() => setIsOpen(false)} />
        </aside>
      </div>
    </>
  );
}
