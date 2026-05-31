import { motion } from 'framer-motion';

const testimonials = [
  { id: 1, quote: 'ArtSphere completely transformed how I get clients. My portfolio looks stunning.', author: 'Sofia Davis' },
  { id: 2, quote: 'Joining ArtSphere was the best decision for my career. The tools are intuitive.', author: 'Alex Chen' }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold">What creators are saying</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <p className="text-lg">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-muted-foreground">— {t.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
