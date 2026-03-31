export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
                <div className="bg-slate-200 h-24 w-full"></div>
                <div className="p-6 space-y-6">
                    <div className="h-16 bg-slate-100 rounded-lg"></div>
                    <div className="space-y-4">
                        <div className="h-10 bg-slate-100 rounded"></div>
                        <div className="h-10 bg-slate-100 rounded"></div>
                        <div className="h-10 bg-slate-100 rounded"></div>
                        <div className="h-10 bg-slate-100 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
