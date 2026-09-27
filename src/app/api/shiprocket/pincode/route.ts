import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pincode } = await req.json();

    if (!pincode || !/^\d{6}$/.test(String(pincode).trim())) {
      return NextResponse.json(
        { error: "Invalid 6-digit Indian pincode" },
        { status: 400 }
      );
    }

    const token = process.env.SHIPROCKET_API_TOKEN;

    // If Shiprocket Token is configured in environment, call Shiprocket live API
    if (token) {
      try {
        const pickupPincode = process.env.SHIPROCKET_PICKUP_PINCODE || "313004"; // Udaipur, Rajasthan
        const res = await fetch(
          `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${pickupPincode}&delivery_postcode=${pincode}&weight=0.5&cod=1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 3600 },
          }
        );
        const data = await res.json();
        if (data.status === 200 && data.data.available_courier_companies?.length > 0) {
          const courier = data.data.available_courier_companies[0];
          return NextResponse.json({
            serviceable: true,
            courierName: courier.courier_name,
            estimatedDeliveryDays: courier.etd,
            codAvailable: courier.cod === 1,
            rate: courier.rate,
          });
        }
      } catch (err) {
        console.error("Shiprocket API call failed:", err);
      }
    }

    // Default intelligent simulation (when API keys are pending KYC)
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formatted = date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return NextResponse.json({
      serviceable: true,
      courierName: "Delhivery / Bluedart Air",
      estimatedDeliveryDays: `Delivery by ${formatted}`,
      codAvailable: true,
      rate: 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify pincode", details: String(error) },
      { status: 500 }
    );
  }
}
