"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import KafkaService from "@/provider/kafkaservice";

export default function PendingPage() {
  const tasks = useQuery(api.tasks.get);
  // const kafkaservice = new KafkaService();
  // kafkaservice.connect();
  const mutation = useMutation(api.operations.insertEntry);
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
        {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
      </div>
      <Button
        onClick={() => {
          mutation({ task: "abc", filepath: "/paeth" });
        }}
      >
        Ignore this button
      </Button>
      {/* {kafkaservice.runConsumer(({ topic, partition, message }) => {
        <div>{topic + " " + partition + " " + message}</div>;
      })} */}
    </>
  );
}
