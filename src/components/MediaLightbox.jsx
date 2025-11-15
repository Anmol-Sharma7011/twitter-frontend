import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

const MediaLightbox = ({ open, onClose, url, type = "image", alt = "media" }) => {
  const overlayRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = original);
  }, [open]);

  // Keyboard support (ESC + Zoom)
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, parseFloat((z + 0.25).toFixed(2))));
      if (e.key === "-" || e.key === "_") setZoom((z) => Math.max(0.5, parseFloat((z - 0.25).toFixed(2))));
      if (e.key === "0") setZoom(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleZoomIn = () => setZoom((z) => Math.min(3, parseFloat((z + 0.25).toFixed(2))));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, parseFloat((z - 0.25).toFixed(2))));
  const handleResetZoom = () => setZoom(1);

  const zoomPercent = Math.round(zoom * 100); // ✅ Dynamic zoom value

  const content = (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose?.();
      }}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex flex-col"
    >
      {/* 🔝 Header Controls */}
      <div className="flex items-center justify-end px-4 py-3">
        <div className="flex items-center gap-2 text-white/80">
          <button
            onClick={handleZoomOut}
            className="px-2 py-1 rounded bg-white/10 hover:bg-white/20"
            title="Zoom out (- or _)"
          >
            –
          </button>
          <button
            onClick={handleResetZoom}
            className="px-2 py-1 rounded bg-white/10 hover:bg-white/20"
            title="Reset (0)"
          >
            {zoomPercent}%
          </button>
          <button
            onClick={handleZoomIn}
            className="px-2 py-1 rounded bg-white/10 hover:bg-white/20"
            title="Zoom in (+ or =)"
          >
            +
          </button>
          <button
            onClick={onClose}
            className="ml-2 p-2 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* 🖼️ Media Section */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        {type === "video" ? (
          <video
            src={url}
            controls
            className="max-h-[90vh] max-w-[95vw] rounded-lg"
          />
        ) : (
          <img
            src={url}
            alt={alt}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              transition: "transform 0.15s ease",
              maxHeight: "90vh",
              maxWidth: "95vw",
              objectFit: "contain",
            }}
            className="rounded-lg select-none"
            draggable={false}
          />
        )}
      </div>

      {/* 📄 Footer */}
      <div className="px-4 pb-4 text-center text-xs text-white/50">
        Esc to close • + / - / 0 to zoom
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default MediaLightbox;
