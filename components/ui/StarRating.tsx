// Reusable star rating component
// Usage: <StarRating rating={4.5} />

export default function StarRating({ rating }: { rating: number }) {
 return (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
   {[1, 2, 3, 4, 5].map((star) => (
    <span
     key={star}
     className={`text-xs ${
      star <= Math.round(rating) ? "text-[#a68038] " : "text-white/15"
     }`}
    >
     ★
    </span>
   ))}
  </div>
 );
}
