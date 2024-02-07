import KafkaService from "@/provider/kafkaservice";
import { NextRequest, NextResponse } from "next/server";

const kafkaService = new KafkaService();

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return new NextResponse("No file found", { status: 400 });
  }
  const buffer = (await file
    .arrayBuffer()
    .then((b) => Buffer.from(b))) as Buffer;
  // const messages = [{ buffer } as any];
  const messages = [
    {
      key: "uniqueKey", // Provide a unique key for the message
      file: {
        name: file.name,
        type: file.type,
        data: buffer.toString("base64"), // Convert buffer to base64 string
      },
    },
  ];
  try {
    await kafkaService.connect();
    await kafkaService.sendMessage("quickstart-events", messages).then(() => {
      return NextResponse.json({ status: "success" });
    });
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  } finally {
    await kafkaService
      .disconnect()
      .then(() => console.warn("Disconnected from Kafka"));
  }
}
