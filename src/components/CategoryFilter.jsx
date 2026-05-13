import { motion } from "framer-motion";
import { categories } from "../data/links";

export default function CategoryFilter({ active, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      style={{
        overflowX: "auto",
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 4,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          width: "max-content",
        }}
      >
        {categories.map((cat, i) => (
          <motion.button
            key={cat}
            className={`category-pill ${active === cat ? "active" : ""}`}
            onClick={() => onChange(cat)}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.72 + i * 0.05 }}
            whileTap={{ scale: 0.93 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
