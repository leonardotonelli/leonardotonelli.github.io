import { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface MacroAreaAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  titleClassName?: string;
}

export function MacroAreaAccordion({ title, children, defaultOpen = false, titleClassName }: MacroAreaAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="border-t border-border last:border-b">
      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          "w-full flex items-center justify-between px-2 py-5 group text-left transition-colors outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent/50",
          isOpen && "bg-border/10"
        )}
      >
        <h3 className={cn(
          "text-xs uppercase tracking-[0.3em] font-bold transition-colors",
          isOpen ? "text-accent" : "text-muted group-hover:text-ink",
          titleClassName
        )}>
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className={cn(
            "text-muted transition-colors",
            isOpen ? "text-accent" : "group-hover:text-ink"
          )}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2, ease: "easeOut" }
            }}
            style={{ willChange: "height, opacity" }}
            className="overflow-hidden"
          >
            <div className="ml-2 md:ml-3 pl-3 md:pl-4 pr-1 md:pr-2 pt-3 pb-4 border-l-2 border-accent/20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
