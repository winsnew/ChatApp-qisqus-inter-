import { NextResponse } from 'next/server';
import chatData  from '@/app/api/chat/chat-data.json';

export async function GET() {
  return NextResponse.json(chatData);
}