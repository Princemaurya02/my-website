import { motion } from "framer-motion";
import { Heart, Shield, Mail, Zap } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      style={{
        padding: "32px 24px 24px",
        textAlign: "center",
        borderTop: "1px solid var(--glass-border)",
        marginTop: 8,
      }}
    >
      {/* Built with */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginBottom: 16,
          fontSize: 12,
          color: "var(--text-muted)",
        }}
      >
        <Zap size={12} color="var(--accent)" fill="var(--accent)" />
        <span>Built with</span>
        <span style={{ color: "var(--accent)", fontWeight: 600 }}>React + Vite</span>
        <Heart size={12} color="#f43f5e" fill="#f43f5e" />
      </div>

      {/* Links */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <a href="#" className="footer-link" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Shield size={11} />
          Privacy
        </a>
        <a href="mailto:hello@example.com" className="footer-link" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Mail size={11} />
          Contact
        </a>
        <a href="#" className="footer-link">
          Terms
        </a>
        <a href="#" className="footer-link">
          About
        </a>
      </div>

      {/* Copyright */}
      <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
        © {year} Prince Maurya · All rights reserved
      </p>
    </motion.footer>
  );
}
