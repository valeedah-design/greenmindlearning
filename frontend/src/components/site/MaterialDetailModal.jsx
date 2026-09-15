import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ButtonLink } from "@/components/site/ui";

export default function MaterialDetailModal({ material, onClose, typeColor, topicColor }) {
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();

  if (!material) return null;

  const images = material.images && material.images.length > 0 ? material.images : material.thumbnail ? [material.thumbnail] : [];

  const requestResource = () => {
    onClose();
    navigate("/about-contact#contact", {
      state: {
        topic: "Learning Material Request",
        message: `I'd like to request access to "${material.title}".`,
      },
    });
  };

  return (
    <Dialog open={!!material} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0" data-testid="material-detail-modal">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow"
        >
          <X className="h-4 w-4" />
        </button>

        {images.length > 0 && (
          <div className="relative h-56 w-full bg-mist sm:h-72">
            <img src={images[imgIndex]} alt={material.title} className="h-full w-full object-cover" />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {images.map((_, i) => (
                    <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === imgIndex ? "bg-white" : "bg-white/40"}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="p-7 sm:p-9">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white" style={{ backgroundColor: typeColor || "#0B1220" }}>
              {material.type}
            </span>
            <span className="rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ backgroundColor: topicColor || "#177A3B" }}>
              {material.topic}
            </span>
            <span className="text-xs font-semibold text-slate-500">{material.level}</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Clock className="h-3.5 w-3.5" /> {material.minutes}m
            </span>
          </div>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">{material.title}</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-body">{material.description}</p>
          <div className="mt-7">
            <ButtonLink onClick={requestResource} variant="primary" testid="material-request-resource-button" arrow className="w-full sm:w-auto">
              Request the Resource
            </ButtonLink>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
