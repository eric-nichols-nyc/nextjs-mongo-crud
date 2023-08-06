import { connectDB } from '@/libs/mongodb';
import Topic from '@/models/Topic';
import { NextRequest, NextResponse } from 'next/server';

// edit topic by id
export async function PUT(request:NextRequest, { params }: any) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectDB();
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: 'Topic updated' }, { status: 200 });
}

// get topic by id
export async function GET(request:NextRequest, { params }: any) {
  const { id } = params;
  await connectDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
