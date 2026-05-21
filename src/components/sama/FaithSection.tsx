import faithImg from "@/assets/faith-section.png";

export function FaithSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-sand)] border border-sand/60">
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 items-center p-6 sm:p-10">
        <div className="space-y-5 text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-sand-foreground">
            وقفة إيمانية
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-sand-foreground leading-snug">
            أولاً: هذا ابتلاء… ومعه لطف الله
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-sand-foreground/90 leading-loose">
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
          <blockquote className="rounded-2xl bg-white/70 border border-sand p-5 mt-2">
            <p className="font-quranic text-xl sm:text-2xl leading-[2] text-sand-foreground text-center">
              «نؤمن بقضاء الله، ونأخذ بالأسباب، ونتعلم لنحمي أبناءنا.»
            </p>
          </blockquote>
        </div>
        <div className="relative">
          <img
            src={faithImg}
            alt="أم تحتضن طفلها عند نافذة مضاءة بنور الفجر"
            width={1280}
            height={768}
            loading="lazy"
            className="rounded-2xl shadow-[var(--shadow-card)] w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
