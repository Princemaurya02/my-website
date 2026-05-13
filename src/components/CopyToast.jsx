import { motion, AnimatePresence } from "framer-motion";
import { Copy, Share2, Check, X } from "lucide-react";
import { useState } from "react";

export default function CopyToast({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="copy-toast"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <Check size={14} style={{ display: "inline", marginRight: 6 }} />
          Profile link copied!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
