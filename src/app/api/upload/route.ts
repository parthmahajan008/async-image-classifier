import { useRouter } from "next/router";
import { Kafka } from "kafkajs";

import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest, res: NextResponse) {
  const router = useRouter();
}
