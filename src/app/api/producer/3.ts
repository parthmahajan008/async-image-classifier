import KafkaService from "@/provider/kafkaservice";
import { NextResponse } from "next/server";

const kafkaService = new KafkaService();

export async function POST(req: Request) {
  const { messages } = await req.json();
  try {
    await kafkaService.connect();
    await kafkaService
      .sendMessage("quickstart-events", messages)
      
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    console.error("Error sending message:", err);
    return new NextResponse(err, { status: 500 });
  } finally {
    await kafkaService.disconnect().then(() => console.warn("Disconnected from Kafka"));
  }
}
