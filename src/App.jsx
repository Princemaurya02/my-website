import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Share2 } from "lucide-react";

import Hero from "./components/Hero";
import SocialIcons from "./components/SocialIcons";
import FeaturedCard from "./components/FeaturedCard";
import QuickLinks from "./components/QuickLinks";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import CopyToast from "./components/CopyToast";

import { quickLinks } from "./data/links";

export default function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const isScrollingRef = useRef(false);

  // Scroll to section when nav tab is clicked
  const handleNavChange = (id) => {
    setActiveNav(id);
    const sectionMap = {
      home: "section-home",
      links: "section-links",
      featured: "section-featured",
      profile: "section-profile",
    };
    const targetId = sectionMap[id];
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      isScrollingRef.current = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { isScrollingRef.current = false; }, 800);
    }
  };

  // Auto-update active nav based on scroll position
  useEffect(() => {
    const sections = [
      { id: "section-profile", nav: "profile" },
      { id: "section-featured", nav: "featured" },
      { id: "section-links", nav: "links" },
      { id: "section-home", nav: "home" },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sections.find((s) => s.id === entry.target.id);
            if (matched) setActiveNav(matched.nav);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Filter links
  const filteredLinks = quickLinks.filter((link) => {
    const matchesCategory =
      activeCategory === "All" || link.category === activeCategory;
    const matchesSearch =
      search.trim() === "" ||
      link.title.toLowerCase().includes(search.toLowerCase()) ||
      link.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      link.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Copy profile link
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {
      const el = document.createElement("input");
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Share profile
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Prince Maurya | Developer Hub",
          text: "Check out my developer link hub!",
          url: window.location.href,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Background orbs */}
      <div className="bg-scene">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      {/* Toast */}
      <CopyToast show={showToast} />

      {/* Main container — mobile-first, centered */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 480,
          margin: "0 auto",
          paddingBottom: 100,
        }}
      >
        {/* Top action bar */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 10,
            padding: "16px 20px 0",
          }}
        >
          <button className="ghost-btn" onClick={handleCopy}>
            <Copy size={14} />
            Copy Link
          </button>
          <button className="accent-btn" onClick={handleShare}>
            <Share2 size={14} />
            Share
          </button>
        </motion.div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Profile / Hero */}
          <div id="section-profile">
            <div id="section-home">
              <Hero />
              <SocialIcons />
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, var(--glass-border), transparent)",
              margin: "0 24px",
            }}
          />

          {/* Featured card */}
          <div id="section-featured">
            <FeaturedCard />
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, var(--glass-border), transparent)",
              margin: "0 24px",
            }}
          />

          {/* Search + Links */}
          <div id="section-links">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
            <AnimatePresence mode="wait">
              <QuickLinks key={activeCategory + search} links={filteredLinks} />
            </AnimatePresence>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav
        active={activeNav}
        onChange={handleNavChange}
        onShare={handleShare}
      />
    </div>
  );
}
