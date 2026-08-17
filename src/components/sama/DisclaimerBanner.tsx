import { Link } from "@tanstack/react-router";
import { Info } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="w-full bg-warning/15 border-b border-warning/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2.5 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-warning-foreground">
        <Info className="h-4 w-4 shrink-0" />
        <p className="flex-1 min-w-[200px]">
          <span className="font-semibold">تنويه:</span> هذا المحتوى تثقيفي وداعم، تمت مراجعته طبيًا، ولا يغني عن متابعة الطبيب أو فريق السكري.{" "}
          <Link to="/about" className="font-semibold underline">
            عن المنصة والمصادر وأرقام الطوارئ
          </Link>
        </p>
      </div>
    </div>
  );
}
