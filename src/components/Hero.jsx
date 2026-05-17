import { motion } from "framer-motion";
import { BadgeCheck, Camera, X } from "lucide-react";
import { profileData } from "../data/links";
import { useState, useRef, useEffect } from "react";

export default function Hero() {
  const [avatar, setAvatar] = useState(profileData.avatar || null);
  const [hovering, setHovering] = useState(false);
  const fileInputRef = useRef(null);

  // Load saved avatar from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("dev-hub-avatar");
    if (saved) setAvatar(saved);
    else if (profileData.avatar) setAvatar(profileData.avatar);
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setAvatar(dataUrl);
      localStorage.setItem("dev-hub-avatar", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Remove avatar
  const handleRemove = (e) => {
    e.stopPropagation();
    setAvatar(null);
    localStorage.removeItem("dev-hub-avatar");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center gap-5 pt-10 pb-4 px-4"
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
        style={{ position: "relative" }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
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

        {/* Camera overlay on hover — click to upload */}
        <motion.button
          onClick={() => fileInputRef.current?.click()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={hovering ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          title="Change profile picture"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.55)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            backdropFilter: "blur(2px)",
            zIndex: 2,
          }}
        >
          <Camera size={22} color="#22d3ee" strokeWidth={1.8} />
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              color: "#22d3ee",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Change
          </span>
        </motion.button>

        {/* Remove button — only when avatar is set */}
        {avatar && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleRemove}
            title="Remove photo"
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid #000",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
            }}
          >
            <X size={11} color="#fff" strokeWidth={3} />
          </motion.button>
        )}

        {/* Online indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 6,
            right: avatar ? 18 : 6,
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

      {/* Upload hint — shown when no avatar */}
      {!avatar && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => fileInputRef.current?.click()}
          style={{
            marginTop: -8,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 14px",
            borderRadius: 999,
            background: "rgba(34,211,238,0.08)",
            border: "1px dashed rgba(34,211,238,0.35)",
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 500,
            color: "var(--accent)",
            letterSpacing: "0.04em",
          }}
        >
          <Camera size={12} strokeWidth={2} />
          Upload your photo
        </motion.button>
      )}

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
