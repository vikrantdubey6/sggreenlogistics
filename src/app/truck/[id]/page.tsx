import { fetchTruckData } from '@/api/route';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function TruckPage(props: PageProps) {
    const params = await props.params;
    const { id } = params;

    if (!id) return notFound();

    const truck = await fetchTruckData(id);

    if (!truck) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

                {/* Header */}
                <div className="bg-slate-900 text-white p-6 text-center">
                     <Image
        src="/logo.jpeg"
        alt="SG Green Logistics Logo"
        width={150}
        height={100}
        className="mx-auto mb-2 object-contain"
    />
                    <p className="text-slate-400 text-sm mt-1">SG Green Logistics</p>
                    <h1 className="text-2xl font-bold tracking-wide uppercase">Truck Information</h1>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Truck ID</span>
                        <span className="block text-lg font-bold text-slate-800">{truck.truck_id || id}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="border-b border-gray-100 pb-3">
                            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Registration No</span>
                            <span className="block text-base font-medium text-slate-900">{truck.registration_no || 'N/A'}</span>
                        </div>

                        <div className="border-b border-gray-100 pb-3">
                            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Chassis No</span>
                            <span className="block text-base font-medium text-slate-900 break-all">{truck.chassis_no || 'N/A'}</span>
                        </div>

                        <div className="border-b border-gray-100 pb-3">
                            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Brand</span>
                            <span className="block text-base font-medium text-slate-900">{truck.brand || 'N/A'}</span>
                        </div>

                        <div className="pt-1">
                            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Plant Location</span>
                            <span className="block text-base font-medium text-slate-900 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {truck.plant_location || 'N/A'}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">© {new Date().getFullYear()} SG Green Logistics</p>
                </div>
            </div>
        </div>
    );
}
