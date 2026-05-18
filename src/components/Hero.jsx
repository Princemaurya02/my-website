import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { profileData } from "../data/links";
import { useState, useEffect } from "react";

export default function Hero() {
  const [avatar, setAvatar] = useState(profileData.avatar || null);

  // Load saved avatar from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("dev-hub-avatar");
    if (saved) setAvatar(saved);
    else if (profileData.avatar) setAvatar(profileData.avatar);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center gap-5 pt-10 pb-4 px-4"
    >

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
        style={{ position: "relative" }}
      >
        {/* Spinning gradient ring */}
        <div className="profile-ring">
          <div className="profile-inner">
            {avatar ? (
              <img
                src={avatar}
                alt="Profile"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #22d3ee 0%, #818cf8 60%, #06b6d4 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#000",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.02em",
                  userSelect: "none",
                }}
              >
                {profileData.initials}
              </div>
            )}
          </div>
        </div>



        {/* Online indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 6,
            right: 6,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#22c55e",
            border: "2.5px solid #000",
            boxShadow: "0 0 10px rgba(34,197,94,0.6)",
            zIndex: 1,
          }}
        />
      </motion.div>



      {/* Name + Badge */}
      <div className="flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-2"
        >
          <h1
            className="shimmer-text"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {profileData.name}
          </h1>
          <BadgeCheck size={22} color="#22d3ee" strokeWidth={2} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="badge"
        >
          <div className="verified-dot" />
          <span>{profileData.title}</span>
        </motion.div>
      </div>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        style={{
          color: "var(--text-secondary)",
          fontSize: 14,
          lineHeight: 1.65,
          maxWidth: 300,
          fontWeight: 400,
        }}
      >
        {profileData.bio}
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "16px 28px",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          borderRadius: 20,
          backdropFilter: "blur(20px)",
        }}
      >
        {profileData.stats.map((s, i) => (
          <div key={s.label} className="flex items-center gap-6">
            {i !== 0 && <div className="stat-divider" />}
            <div className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
