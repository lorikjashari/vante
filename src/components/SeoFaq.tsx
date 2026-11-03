import { FAQ_SEO } from '../lib/seo.config';

export default function SeoFaq() {
  return (
    <section aria-labelledby="faq-heading" className="mt-4 md:mt-8 pt-4 md:pt-6 border-t border-charcoal/8">
      <h2 id="faq-heading" className="text-xs md:text-sm tracking-tight text-charcoal mb-3">
        Frequently asked questions
      </h2>
      <div className="space-y-2">
        {FAQ_SEO.map((item) => (
          <details
            key={item.question}
            className="group border-b border-charcoal/12 open:border-charcoal/35 transition-colors"
          >
            <summary className="cursor-pointer list-none py-3 md:py-4 text-xs md:text-sm text-charcoal font-normal [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                {item.question}
                <span className="text-charcoal/30 group-open:rotate-45 transition-transform text-base leading-none">+</span>
              </span>
            </summary>
            <p className="pb-3 md:pb-4 text-[11px] md:text-xs text-charcoal/55 leading-relaxed max-w-2xl">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
