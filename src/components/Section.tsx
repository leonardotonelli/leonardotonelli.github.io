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
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-ink">
          {title}
        </h2>
      )}
      <div className="w-full">
        {children}
      </div>
    </motion.section>
  );
}
