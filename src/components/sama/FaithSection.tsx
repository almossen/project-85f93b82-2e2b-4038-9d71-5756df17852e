import faithImg from "@/assets/faith-section.jpg";

export function FaithSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-sand)] border border-sand/60">
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 items-center p-6 sm:p-10">
        <div className="space-y-5 text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-sand-foreground">
            وقفة إيمانية
          </span>
          <blockquote className="space-y-4">
            <p className="font-quranic text-2xl sm:text-3xl leading-[2.1] text-sand-foreground">
              ﴿ وَبَشِّرِ الصَّابِرِينَ ۝ الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ ﴾
            </p>
            <footer className="text-sm text-sand-foreground/80">— سورة البقرة، الآيتان ١٥٥–١٥٦</footer>
          </blockquote>
          <p className="text-sm sm:text-base text-sand-foreground/90 leading-loose">
            ما أصاب ابنك ليس عقوبة، بل ابتلاء يرفع الله به الدرجات ويكفّر به الخطايا. ثقوا أن الله اختار لكم رحلةً ستنبت فيها ثمارٌ من الصبر والوعي والقرب منه سبحانه.
          </p>
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
