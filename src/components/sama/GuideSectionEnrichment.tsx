import { useState } from "react";
import {
  Apple,
  Droplet,
  Key,
  Zap,
  XCircle,
  CheckSquare,
  Phone,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import insulinRapidImg from "@/assets/insulin-rapid.jpg";
import insulinLongImg from "@/assets/insulin-long.jpg";
import penHumalog from "@/assets/pen-humalog.jpg";
import penNovorapid from "@/assets/pen-novorapid.jpg";
import penApidra from "@/assets/pen-apidra.jpg";
import penFiasp from "@/assets/pen-fiasp.jpg";
import penLantus from "@/assets/pen-lantus.jpg";
import penToujeo from "@/assets/pen-toujeo.jpg";
import penLevemir from "@/assets/pen-levemir.jpg";
import penTresiba from "@/assets/pen-tresiba.jpg";
import faithImg from "@/assets/faith-section.jpg";
import familyKitchen from "@/assets/family-kitchen.jpg";

type Brand = { name: string; ar: string; img: string; note: string };

const rapidBrands: Brand[] = [
  { name: "Humalog", ar: "هيومالوج", img: penHumalog, note: "إنسولين ليسبرو — سريع المفعول، يُعطى عند الوجبات بتوجيه الطبيب." },
  { name: "NovoRapid", ar: "نوفورابيد", img: penNovorapid, note: "إنسولين أسبارت — سريع المفعول، شائع الاستخدام عند الوجبات." },
  { name: "Apidra", ar: "أبيدرا", img: penApidra, note: "إنسولين جلوليزين — سريع المفعول." },
  { name: "Fiasp", ar: "فياسب", img: penFiasp, note: "أسبارت فائق السرعة — يبدأ مفعوله أسرع من نوفورابيد." },
];

const longBrands: Brand[] = [
  { name: "Lantus", ar: "لانتوس", img: penLantus, note: "إنسولين جلارجين U-100 — طويل المفعول، مرة يومياً غالباً." },
  { name: "Toujeo", ar: "توجيو", img: penToujeo, note: "إنسولين جلارجين U-300 — مركّز أكثر ومفعول أطول." },
  { name: "Levemir", ar: "ليفيمير", img: penLevemir, note: "إنسولين ديتيمير — طويل المفعول، قد يُعطى مرة أو مرتين يومياً." },
  { name: "Tresiba", ar: "تريسيبا", img: penTresiba, note: "إنسولين ديجلوديك — مفعول يمتد لأكثر من ٢٤ ساعة." },
];

function BrandChip({ brand }: { brand: Brand }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium hover:bg-primary-soft hover:border-primary/40 hover:text-primary transition-colors"
        >
          {brand.name} — {brand.ar}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-right">
          <DialogTitle>{brand.name} — {brand.ar}</DialogTitle>
          <DialogDescription className="leading-loose">{brand.note}</DialogDescription>
        </DialogHeader>
        <div className="rounded-2xl overflow-hidden border border-border bg-muted/30">
          <img src={brand.img} alt={`قلم ${brand.ar}`} loading="lazy" className="w-full h-auto object-contain" />
        </div>
        <p className="text-[11px] text-muted-foreground text-right leading-loose">
          الصورة توضيحية فقط. اختيار النوع قرار طبي.
        </p>
      </DialogContent>
    </Dialog>
  );
}

function BrandPanel({ tone, image, alt, brands }: { tone: "mint" | "sand"; image: string; alt: string; brands: Brand[] }) {
  return (
    <div className={`space-y-3 rounded-2xl border border-border p-4 ${tone === "mint" ? "bg-mint/20" : "bg-sand/30"}`}>
      <div className="aspect-[3/4] max-w-xs mx-auto rounded-xl overflow-hidden border border-border bg-card">
        <img src={image} alt={alt} loading="lazy" className="w-full h-full object-contain" />
      </div>
      <div className="text-xs font-bold text-muted-foreground">
        أنواع تجارية شائعة — اضغط على الاسم لرؤية صورة القلم:
      </div>
      <div className="flex flex-wrap gap-2">
        {brands.map((b) => <BrandChip key={b.name} brand={b} />)}
      </div>
      <p className="text-[11px] text-muted-foreground leading-loose">
        الأسماء للتعريف فقط. اختيار النوع والجرعة قرار طبي يتخذه فريق السكري المعالج لطفلك.
      </p>
    </div>
  );
}

function FlowStep({
  icon: Icon, label, tint,
}: { icon: React.ElementType; label: string; tint: "blue" | "mint" | "sand" | "rose" }) {
  const tints = {
    blue: "bg-primary-soft text-primary",
    mint: "bg-mint/40 text-mint-foreground",
    sand: "bg-sand text-sand-foreground",
    rose: "bg-destructive/10 text-destructive",
  } as const;
  return (
    <div className="flex flex-col items-center text-center gap-2 min-w-[70px]">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tints[tint]}`}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <span className="text-[11px] sm:text-xs font-medium">{label}</span>
    </div>
  );
}

const Arrow = () => <div className="text-muted-foreground text-lg select-none">←</div>;

function DiabetesFlow() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-mint/50 bg-mint/10 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">عند الطفل السليم</h4>
          <span className="text-[10px] rounded-full bg-mint/60 text-mint-foreground px-2 py-0.5">طبيعي</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-1">
          <FlowStep icon={Apple} label="الطعام" tint="mint" />
          <Arrow />
          <FlowStep icon={Droplet} label="سكر بالدم" tint="blue" />
          <Arrow />
          <FlowStep icon={Key} label="إنسولين" tint="mint" />
          <Arrow />
          <FlowStep icon={Zap} label="طاقة" tint="sand" />
        </div>
      </div>
      <div className="rounded-2xl border border-primary/30 bg-primary-soft/50 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">عند طفل النوع الأول</h4>
          <span className="text-[10px] rounded-full bg-primary text-primary-foreground px-2 py-0.5">يحتاج إنسولين</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-1">
          <FlowStep icon={Apple} label="الطعام" tint="mint" />
          <Arrow />
          <FlowStep icon={Droplet} label="سكر مرتفع" tint="rose" />
          <Arrow />
          <FlowStep icon={XCircle} label="لا إنسولين" tint="rose" />
          <Arrow />
          <FlowStep icon={Zap} label="نقص طاقة" tint="sand" />
        </div>
      </div>
    </div>
  );
}

function InjectionVideo() {
  return (
    <div className="space-y-2">
      <div className="text-xs font-bold text-muted-foreground">فيديو توضيحي لطريقة الحقن</div>
      <div className="aspect-video rounded-2xl overflow-hidden border border-border bg-muted/30">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/7SLD3YQtNoE"
          title="طريقة حقن الإنسولين"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p className="text-[11px] text-muted-foreground leading-loose">
        الفيديو للتوعية فقط — اطلب من فريقك الطبي جلسة تدريب عملية.
      </p>
    </div>
  );
}

const diabetesBagChecklist = [
  "جهاز قياس السكر",
  "شرائط قياس كافية",
  "إبر وخز نظيفة",
  "قلم إنسولين سريع المفعول + إبر جديدة",
  "قلم إنسولين طويل المفعول (عند الحاجة)",
  "حقيبة تبريد صغيرة في الجو الحار",
  "عصير صغير أو أقراص جلوكوز",
  "تمر أو وجبة خفيفة",
  "ماء كافٍ ومناديل تعقيم",
  "بطاقة تعريف بحالة الطفل",
  "رقم الطبيب والطوارئ",
  "دفتر تسجيل القراءات",
];

function DiabetesBagChecklist() {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <CheckSquare className="h-4 w-4 text-primary" />
        <h4 className="font-semibold text-sm">قائمة جاهزة للطباعة</h4>
      </div>
      <ul className="grid sm:grid-cols-2 gap-2">
        {diabetesBagChecklist.map((it) => (
          <li key={it} className="flex items-center gap-2 rounded-xl border border-border bg-card p-2.5">
            <span aria-hidden className="h-4 w-4 rounded border-2 border-muted-foreground/40 shrink-0" />
            <span className="text-xs leading-snug">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaithCallout() {
  return (
    <div className="rounded-2xl overflow-hidden border border-sand bg-[image:var(--gradient-sand)]">
      <div className="grid sm:grid-cols-[1.2fr_1fr] gap-6 p-5 sm:p-6 items-center">
        <div className="space-y-3 text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-sand-foreground">
            وقفة إيمانية
          </span>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-sand-foreground leading-snug">
            أولاً: هذا ابتلاء… ومعه لطف الله
          </h3>
          <div className="space-y-2 text-sm text-sand-foreground/90 leading-loose">
            <p>
              قد يكون خبر إصابة طفلك بسكري النوع الأول صعباً على قلبك. وقد تسأل: لماذا طفلي؟ ولماذا نحن؟
            </p>
            <p>
              في هذه اللحظة، تذكّر أن ما أصابنا لم يكن ليخطئنا، وأن أمر المؤمن كله خير إذا صبر واحتسب وأخذ بالأسباب.
            </p>
            <p>
              والصبر لا يعني أن نبقى عاجزين أو خائفين، بل يعني أن نثبت، ونتعلم، ونسأل، ونعمل بما ينفع طفلنا.
            </p>
            <p>
              الإيمان بالقضاء والقدر لا يلغي العلاج، بل يقوّي القلب على الالتزام به. سكري النوع الأول ليس عقوبة، وليس دليلاً على تقصير الوالدين.
            </p>
          </div>
          <blockquote className="rounded-2xl bg-white/70 border border-sand p-4 mt-2">
            <p className="font-quranic text-lg sm:text-xl leading-[2] text-sand-foreground text-center">
              «نؤمن بقضاء الله، ونأخذ بالأسباب، ونتعلم لنحمي أبناءنا.»
            </p>
          </blockquote>
        </div>
        <img
          src={faithImg}
          alt="أم تحتضن طفلها عند نافذة مضاءة بنور الفجر"
          loading="lazy"
          className="rounded-2xl shadow-[var(--shadow-card)] w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}

function FamilyTestimonial() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card grid sm:grid-cols-[1fr_1.3fr]">
      <img src={familyKitchen} alt="عائلة في المطبخ" loading="lazy" className="w-full h-48 sm:h-full object-cover" />
      <div className="p-4 space-y-2">
        <span className="inline-block text-[11px] rounded-full bg-primary-soft text-primary px-2 py-0.5 font-medium">
          من تجارب الأهل
        </span>
        <p className="text-sm leading-loose text-foreground/90">
          «اليوم فهد عمره ٩ سنوات، يلعب كرة قدم، أوّل على فصله، ويعطي إنسولينه بنفسه. السكري صار جزء بسيط من يومنا، مو حياتنا كلها.»
        </p>
        <p className="text-[11px] text-muted-foreground">— أم فهد، الرياض</p>
      </div>
    </div>
  );
}

const warningSigns = [
  "فقدان الوعي أو صعوبة الإيقاظ",
  "تشنّجات أو ارتباك شديد",
  "قيء متكرر مع رفض الأكل والشرب",
  "تنفّس سريع وعميق أو رائحة فواكه من الفم",
  "انخفاض سكر شديد لا يرتفع بعد إعطاء سكر سريع",
];

function WarningSignsList() {
  return (
    <div className="rounded-2xl border-2 border-destructive/30 bg-destructive/5 p-4 space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <h4 className="font-semibold text-sm text-destructive">متى تطلب المساعدة فورًا</h4>
      </div>
      <ul className="space-y-1.5">
        {warningSigns.map((s) => (
          <li key={s} className="flex items-start gap-2 text-xs leading-loose">
            <Phone className="h-3.5 w-3.5 text-destructive mt-1 shrink-0" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


export function GuideSectionEnrichment({ sectionId }: { sectionId: string }) {
  switch (sectionId) {
    case "journey-start":
      return <FaithCallout />;
    case "what-is-t1d":
      return (
        <div className="space-y-4">
          <DiabetesFlow />
          <MisconceptionsMini />
        </div>
      );
    case "parents-feelings":
      return <FamilyTestimonial />;
    case "rapid-insulin":
      return <BrandPanel tone="mint" image={insulinRapidImg} alt="أقلام الإنسولين سريع المفعول" brands={rapidBrands} />;
    case "long-insulin":
      return <BrandPanel tone="sand" image={insulinLongImg} alt="أقلام الإنسولين طويل المفعول" brands={longBrands} />;
    case "injection-basics":
      return <InjectionVideo />;
    case "diabetes-bag":
      return <DiabetesBagChecklist />;
    case "emergency":
    case "severe-low":
      return <WarningSignsList />;
    default:
      return null;
  }
}
