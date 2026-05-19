import { Link } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";

export function EmergencyFloatingButton() {
  return (
    <Link
      to="/what-to-do-now"
      aria-label="ماذا أفعل الآن؟ — دليل الحالات الطارئة"
      className="fixed z-50 bottom-20 md:bottom-6 left-4 md:left-6 inline-flex items-center gap-2 rounded-full bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30 px-4 py-3 text-sm font-bold hover:scale-105 active:scale-95 transition-transform ring-4 ring-destructive/15"
    >
      <LifeBuoy className="h-5 w-5" strokeWidth={2.4} />
      <span>ماذا أفعل الآن؟</span>
    </Link>
  );
}
