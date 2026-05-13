import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork, ArrowUpRight } from "lucide-react";
import { featuredProject } from "../data/links";

export default function FeaturedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="px-4"
    >
      <p className="section-label">⭐ Featured</p>

      <motion.a
        href={featuredProject.url}
        target="_blank"
        rel="noopener noreferrer"
        className="featured-card block"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 999,
              background: "rgba(34,211,238,0.12)",
              border: "1px solid rgba(34,211,238,0.3)",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--accent)",
              letterSpacing: "0.05em",
            }}
          >
            {featuredProject.badge}
          </div>
          <ArrowUpRight size={20} color="var(--accent)" strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="mb-4">
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: 4,
            }}
          >
            {featuredProject.title}
          </h2>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--accent)",
              marginBottom: 10,
            }}
          >
            {featuredProject.subtitle}
          </p>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            {featuredProject.description}
          </p>
        </div>

        {/* Tags + Stars */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            {featuredProject.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "4px 10px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--text-muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 13,
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              <Star size={13} fill="currentColor" />
              {featuredProject.stars}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 13,
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              <ExternalLink size={13} />
              View
            </span>
          </div>
        </div>

        {/* Decorative shimmer line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, #22d3ee, #818cf8, transparent)",
            borderRadius: "0 0 28px 28px",
            opacity: 0.6,
          }}
        />
      </motion.a>
    </motion.div>
  );
}
