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
     
        const response = await fetch(`${scriptUrl}?truck_id=${encodeURIComponent(truckId)}`, {

            next: { revalidate: 0 },
        });

        if (!response.ok) {
            console.error(`Failed to fetch truck data: ${response.status} ${response.statusText}`);
            return null; // Or throw error depending on how we want to handle it
        }

        const data = await response.json();

     
        if (data && (data.truck_id || data.registration_no)) {
            return data as TruckData;
        }

   
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
