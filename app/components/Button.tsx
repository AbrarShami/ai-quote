export default function Button({ handleGenerateQuote, isLoading }: { handleGenerateQuote: () => void, isLoading: boolean }) {
    return (
        <button
            onClick={handleGenerateQuote}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors mb-8"
        >
            {isLoading ? "Loading..." : "Generate Quote"}
        </button>
    )
}