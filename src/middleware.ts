import { Kafka } from "kafkajs";
import multer from "multer";
import multiparty from "multiparty";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export function middleware(req: NextApiRequest, res: NextResponse) {
  async () => {
    console.log("Initializing kafka...");
    const kafka = new Kafka({
      clientId: "kafka-nodejs-starter",
      brokers: ["localhost:9092"],
    });

    // Initialize the Kafka producer and consumer
    const producer = kafka.producer();
    const consumer = kafka.consumer({ groupId: "demoTopic-consumerGroup" });

    await producer.connect();
    console.log("Connected to producer.");

    await consumer.connect();
    console.log("Connected to consumer.");

    // KAFKA SUBSCRIPTION
    const subscribeToTopic = async ({
      topic,
      fromBeginning,
    }: {
      topic: string;
      fromBeginning: boolean;
    }) => {
      await consumer.subscribe({ topic, fromBeginning });
    };
    subscribeToTopic({ topic: "quickstart-events", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("Consumed a message = ", {
          topic,
          partition,
          value: message.value!.toString(),
        });
      },
    });

    // Send an event to the demoTopic topic
    // await producer.send({
    //   topic: 'quickstart-events',
    //   messages: [
    //     { value: 'This event came from another service.' },
    //   ],
    // });

    // Disconnect the producer once we’re done

    // app.post("/api/producer-api", async (req, res) => {
      
    // });
  };
  return NextResponse.next();
}

export const config = {
  matcher: "/api/upload",
};
