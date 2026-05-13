import { motion } from "framer-motion";
import { Home, Link2, Star, User, Share2 } from "lucide-react";

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "links", icon: Link2, label: "Links" },
  { id: "featured", icon: Star, label: "Featured" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "share", icon: Share2, label: "Share" },
];

export default function BottomNav({ active, onChange, onShare }) {
  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <motion.button
            key={item.id}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
            onClick={() => {
              if (item.id === "share") {
                onShare();
              } else {
                onChange(item.id);
              }
            }}
            whileTap={{ scale: 0.88 }}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <motion.div
              animate={isActive ? { scale: 1.15 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.2 : 1.6}
                color={isActive ? "var(--accent)" : "var(--text-muted)"}
              />
            </motion.div>
            <span>{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="nav-dot"
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 6px var(--accent)",
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
