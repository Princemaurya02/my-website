import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function QuickLinks({ links }) {
  return (
    <div className="px-4">
      <p className="section-label">🔗 Quick Links</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <AnimatePresence mode="popLayout">
          {links.map((link, i) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
              initial={{ opacity: 0, x: -20, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.97 }}
              transition={{
                delay: i * 0.04,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileTap={{ scale: 0.97 }}
              layout
            >
              {/* Icon */}
              <div className="link-icon-box">
                <span style={{ fontSize: 22 }}>{link.emoji}</span>
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.title}
                  </span>
                  {link.badge && (
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: "var(--accent-dim)",
                        border: "1px solid var(--accent-glow)",
                        fontSize: 10,
                        fontWeight: 600,
                        color: "var(--accent)",
                        flexShrink: 0,
                      }}
                    >
                      {link.badge}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.subtitle}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight
                size={16}
                color="var(--text-muted)"
                strokeWidth={2}
                style={{ flexShrink: 0 }}
              />
            </motion.a>
          ))}
        </AnimatePresence>

        {links.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "var(--text-muted)",
              fontSize: 14,
            }}
          >
            No links found 🔍
          </motion.div>
        )}
      </div>
    </div>
  );
}
