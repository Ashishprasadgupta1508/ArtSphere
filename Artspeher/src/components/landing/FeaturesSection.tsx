import { motion } from 'framer-motion';
import { Star, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    title: 'Premium Portfolios',
    description: 'Build a breathtaking portfolio in minutes with our drag-and-drop builder.'
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-500" />,
    title: 'Instant Discovery',
    description: 'Get featured in our talent marketplace and be discovered by top clients.'
  },
  {
    icon: <Shield className="h-6 w-6 text-green-500" />,
    title: 'Secure Hiring',
    description: 'Clients can hire you directly through the platform with secure proposals.'
  }
];

export default function FeaturesSection() {
  return (
    <section className="border-t bg-muted/20 py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to stand out</h2>
          <p className="mt-4 text-muted-foreground">Purpose-built tools for modern creators.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
