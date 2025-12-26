export default function QuoteCard({ quote, error }: { quote: string | null, error: string | null }) {
  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 min-h-[120px] flex items-center justify-center">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {quote && (
        <p className="text-xl text-gray-700 text-center italic">
          "{quote}"
        </p>
      )}
    </div>
  );
}