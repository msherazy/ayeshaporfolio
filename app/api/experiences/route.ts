import {promises as fs} from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';

async function getExperiencesData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'experiences.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading experiences data:', error);
    return [];
  }
}

export async function GET() {
  const data = await getExperiencesData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'experiences.json');
    const experiences = await getExperiencesData();
    const newExperience = await request.json();

    newExperience.id = Date.now().toString();
    newExperience.createdAt = new Date().toISOString();
    newExperience.updatedAt = new Date().toISOString();

    experiences.unshift(newExperience);
    await fs.writeFile(filePath, JSON.stringify(experiences, null, 2));

    return NextResponse.json(newExperience);
  } catch (error) {
    return new NextResponse('Failed to create experience', { status: 500 });
  }
}
