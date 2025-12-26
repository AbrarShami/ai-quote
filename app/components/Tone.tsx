export default function Tone({ tone, setTone }: { tone: string, setTone: (tone: string) => void }) {
    return (
        <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
                Choose a tone:
            </label>
            <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
                <option value="motivational">💪 motivational</option>
                <option value="funny">😄 Funny</option>
                <option value="inspirational">🌟 Inspirational</option>
            </select>
        </div>
    );
}