import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 28, className = "", ...props }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MaskedLines({ lines, as: Tag = "h1", className = "", lineClassName = "", delay = 0.2, inView = false }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "-40px" });
  const active = inView ? seen : true;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: "115%" }}
            animate={active ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: 0.95, delay: delay + i * 0.1, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function CountUp({ to, suffix = "", prefix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}
