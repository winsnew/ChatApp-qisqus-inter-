import { NextResponse } from 'next/server';
import chatData from '@/data/chat.json';

export async function GET() {
  return NextResponse.json(chatData);
}