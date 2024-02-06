// kafkaService.ts

import { Kafka, EachMessagePayload, KafkaMessage } from "kafkajs";

class KafkaService {
  private kafka: Kafka;
  private producer: any; // Adjust the type based on kafkajs documentation
  private consumer: any; // Adjust the type based on kafkajs documentation

  constructor() {
    this.kafka = new Kafka({
      clientId: "kafka-nodejs-starter",
      brokers: ["localhost:9092"],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "demoTopic-consumerGroup" });
  }

  async connect(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async subscribeToTopic(params: {
    topic: string;
    fromBeginning?: boolean;
  }): Promise<void> {
    await this.consumer.subscribe(params);
  }

  async runConsumer(
    handler: (payload: {
      topic: string;
      partition: number;
      message: KafkaMessage;
    }) => void,
  ): Promise<void> {
    await this.consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: {
        topic: string;
        partition: number;
        message: KafkaMessage;
      }) => {
        console.log({
          topic,
          partition,
          value: message.value!.toString(),
        });
        // handler({ topic, partition, value: message.value.toString() });
      },
    });
  }

  async sendMessage(topic: string, messages: any[]): Promise<void> {
    await this.producer.send({
      topic,
      messages,
    });
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }
}

export default KafkaService;
