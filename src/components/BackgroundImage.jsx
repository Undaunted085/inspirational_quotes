// Full-bleed background. Shows the Unsplash image when available, otherwise
// the category's gradient. A dark overlay keeps quote text legible, and two
// blurred floating blobs add subtle decoration.

export default function BackgroundImage({ image, gradient, accent }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient base — always present, and the fallback when no image. */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ background: gradient }}
      />

      {/* Unsplash image layer, fades in over the gradient. */}
      {image?.url && (
        <img
          src={image.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover animate-fade-slide-in"
        />
      )}

      {/* Readability overlay. */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Decorative floating blobs tinted with the mood accent. */}
      <div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl opacity-30 animate-float"
        style={{ background: accent }}
      />
      <div
        className="absolute -right-16 bottom-8 h-80 w-80 rounded-full blur-3xl opacity-20 animate-float-slow"
        style={{ background: accent }}
      />
    </div>
  )
}
