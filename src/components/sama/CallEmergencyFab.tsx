import { Phone } from "lucide-react";

/** زر اتصال عائم بالإسعاف 997 يظهر في كل الصفحات فوق الشريط السفلي */
export function CallEmergencyFab() {
  return (
    <a
      href="tel:997"
      aria-label="اتصال بالهلال الأحمر 997"
      className="fixed left-4 z-40 flex items-center justify-center min-h-14 min-w-14 rounded-full bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30 hover:bg-destructive/90 transition-colors print:hidden"
      style={{ bottom: "calc(62px + env(safe-area-inset-bottom) + 12px)" }}
    >
      <Phone className="h-6 w-6" strokeWidth={2.4} />
    </a>
  );
}
