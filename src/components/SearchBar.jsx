import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.4 }}
      className="px-4"
      style={{ position: "relative" }}
    >
      <Search
        size={16}
        color="var(--text-muted)"
        style={{
          position: "absolute",
          left: 32,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
      <input
        className="search-bar"
        type="text"
        placeholder="Search links, projects, resources..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            right: 28,
            top: "50%",
            transform: "translateY(-50%)",
            background: "var(--glass-bg)",
            border: "none",
            borderRadius: "50%",
            width: 22,
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-muted)",
          }}
        >
          <X size={13} />
        </motion.button>
      )}
    </motion.div>
  );
}
