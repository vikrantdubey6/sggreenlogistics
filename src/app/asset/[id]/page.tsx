import { fetchAssetData } from '@/api/route';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AssetQRGenerator from '../../../components/AssetQRGenerator';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AssetPage(props: PageProps) {
    const params = await props.params;
    const { id } = params;

    if (!id) return notFound();

    const asset = await fetchAssetData(id);

    if (!asset) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 relative">

            <Link
                href="/"
                className="absolute top-4 left-4 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5"></path>
                    <path d="M12 19l-7-7 7-7"></path>
                </svg>
                <span className="font-medium text-sm">Back</span>
            </Link>

            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mt-8">

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
                    <h1 className="text-2xl font-bold tracking-wide uppercase">Asset Information</h1>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Asset ID</span>
                        <span className="block text-lg font-bold text-slate-800">{asset.asset_id || id}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="border-b border-gray-100 pb-3">
                            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Brand / Model</span>
                            <span className="block text-base font-medium text-slate-900">{asset.brand || 'N/A'}</span>
                        </div>

                        <div className="border-b border-gray-100 pb-3">
                            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Serial Number</span>
                            <span className="block text-base font-medium text-slate-900 break-all">{asset.serial_no || 'N/A'}</span>
                        </div>

                        <div className="border-b border-gray-100 pb-3">
                            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Assigned Employee ID</span>
                            <span className="block text-base font-medium text-slate-900">{asset.emp_id || 'N/A'}</span>
                        </div>

                        <div className="pt-1">
                            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Branch / Location</span>
                            <span className="block text-base font-medium text-slate-900 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {asset.branch || 'N/A'}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        <AssetQRGenerator assetId={asset.asset_id || id} />
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
