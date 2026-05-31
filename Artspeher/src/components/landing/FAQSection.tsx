export default function FAQSection() {
  const faqs = [
    { q: 'How do I create a portfolio?', a: 'Use our Builder from the dashboard to add projects, images and links.' },
    { q: 'Can clients hire me directly?', a: 'Yes — clients can send hiring requests from your profile.' }
  ];

  return (
    <section className="border-t py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="mb-6 text-2xl font-bold">Frequently asked questions</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
