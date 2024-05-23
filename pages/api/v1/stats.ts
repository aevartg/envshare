import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = Redis.fromEnv();
export default async function handler(req: NextRequest) {
  const [reads, writes] = await redis
    .pipeline()
    .get('envshare:metrics:reads')
    .get('envshare:metrics:writes')
    .exec<[number, number]>();

  return NextResponse.json({ reads, writes });
}

export const config = {
  runtime: 'edge',
};
