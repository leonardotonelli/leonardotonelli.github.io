import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ title, children, className, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      {title && (
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-ink">
            {title}
          </h2>
          <span className="w-7 h-px bg-accent/50" aria-hidden="true" />
        </div>
      )}
      <div className="w-full">
        {children}
      </div>
    </motion.section>
  );
}
