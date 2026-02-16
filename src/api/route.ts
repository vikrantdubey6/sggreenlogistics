export interface TruckData {
    truck_id: string;
    registration_no: string;
    chassis_no: string;
    brand: string;
    plant_location: string;
}

export async function fetchTruckData(truckId: string): Promise<TruckData | null> {
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
        throw new Error("GOOGLE_SCRIPT_URL is not defined");
    }

    try {
        // Append the truckId as a query parameter
        // The script is expected to handle ?id=TRK001
        const response = await fetch(`${scriptUrl}?truck_id=${encodeURIComponent(truckId)}`, {
            // Revalidate every hour, or use no-store if real-time is needed.
            // For now, let's cache it for a bit to be efficient, but maybe 0 for dev.
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            console.error(`Failed to fetch truck data: ${response.status} ${response.statusText}`);
            return null; // Or throw error depending on how we want to handle it
        }

        const data = await response.json();

        // The Apps Script might return { status: 'success', data: ... } or just the object.
        // Or it might return { error: 'Not found' }. 
        // I'll assume a direct return of the object or null/error structure.
        // Let's assume for now it returns the truck object directly or has a 'data' field.
        // A common pattern for these scripts is to return the matching row object.

        // Check if the returned data looks like our truck object
        if (data && (data.truck_id || data.registration_no)) {
            return data as TruckData;
        }

        // If it returns a list (maybe filter didn't work on server side?), find it here (fallback).
        if (Array.isArray(data)) {
            const found = data.find((t: any) => t.truck_id === truckId);
            return found || null;
        }

        return null;
    } catch (error) {
        console.error("Error fetching truck data:", error);
        return null;
    }
}
