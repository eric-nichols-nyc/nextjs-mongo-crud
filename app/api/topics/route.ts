import { connectDB } from '@/libs/mongodb';
import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest } from 'next';
import Topic from '@/models/Topic';

export async function POST(req: NextRequest): Promise<NextResponse> {
  // destructuring the title and description from the request body
  console.log('req.body;', req.body);

  const { title, description } = await req.json();
  // connect to the server
  await connectDB();
  // create a new topica
  await Topic.create({ title, description });

  // return a response
  return NextResponse.json(
    { message: 'Topic created successfully' },
    { status: 201 }
  );
}

// return all topics
export async function GET(): Promise<NextResponse> {
  await connectDB();
  const topics = await Topic.find();
  console.log('topics = ', topics);
  return NextResponse.json({ topics });
}

// Delete topic by id
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    await Topic.findByIdAndDelete(
      request.nextUrl.searchParams.get('id')
    );
    return NextResponse.json(
      { message: 'Topic deleted successfully' },
      { status: 201 }
    );
  } catch (err) {
    console.log('err = ', err);
    return NextResponse.json({ message: 'Topic not deleted' }, { status: 201 });
  }
}
