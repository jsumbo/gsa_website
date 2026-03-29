"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"

interface AthleteMediaProps {
  gallery: string[]
  highlightVideo?: string
  athleteName: string
}

export function AthleteMedia({ gallery, highlightVideo, athleteName }: AthleteMediaProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      {/* Video Highlights */}
      {highlightVideo && (
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="w-8 h-[3px] mb-6" style={{ backgroundColor: "#fee11b" }} />
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-8" style={{ color: "#01255f" }}>
              HIGHLIGHTS
            </h2>
            <div
              className="relative aspect-video bg-neutral-900 cursor-pointer group overflow-hidden"
              onClick={() => setShowVideo(true)}
            >
              <Image
                src={gallery[1] || gallery[0]}
                alt={`${athleteName} highlights`}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div
                  className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#fee11b" }}
                >
                  <Play className="h-8 w-8 ml-1" style={{ color: "#01255f" }} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6">
                <p className="font-heading font-semibold text-sm uppercase tracking-wider text-white">
                  Watch {athleteName}&apos;s Season Highlights
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="w-8 h-[3px] mb-6" style={{ backgroundColor: "#fee11b" }} />
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-8" style={{ color: "#01255f" }}>
              GALLERY
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] bg-neutral-200 cursor-pointer group overflow-hidden"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${athleteName} photo ${index + 1}`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(1,37,95,0.3)" }}
                  >
                    <span className="font-heading font-bold text-xs uppercase tracking-widest text-white/90">View</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-white/70 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[4/3]">
            <Image src={selectedImage} alt="Gallery image" fill className="object-contain" />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideo && highlightVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-white/70 transition-colors"
            onClick={() => setShowVideo(false)}
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={highlightVideo}
              title={`${athleteName} highlights`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}
