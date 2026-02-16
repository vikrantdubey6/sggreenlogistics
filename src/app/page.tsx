'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [truckId, setTruckId] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (truckId.trim()) {
      router.push(`/truck/${truckId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <Image
                src="/logo.jpeg"
                alt="SG Green Logistics Logo"
                width={150}
                height={100}
                className="mx-auto mb-2 object-contain"
            />
        <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Truck Lookup System</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="truckId" className="block text-sm font-medium text-slate-700 mb-1">
              Enter Truck ID
            </label>
            <input
              type="text"
              id="truckId"
              value={truckId}
              onChange={(e) => setTruckId(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g., TRK001"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            View Truck Details
          </button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">Scan a QR code or enter ID manually</p>
        </div>
      </div>
    </div>
  );
}
