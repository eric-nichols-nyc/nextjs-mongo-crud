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
// get all topics
export async function GET() {
  await connectDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

// delete topic by id
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  console.log('delete topic by id = ', id);
  await connectDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Topic deleted' }, { status: 200 });
}