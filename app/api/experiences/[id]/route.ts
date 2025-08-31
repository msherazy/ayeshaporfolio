import {promises as fs} from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';
import {Experience} from '@/types/experience';

async function getExperiencesData(): Promise<Experience[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'experiences.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading experiences data:', error);
    return [];
  }
}

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const experiences = await getExperiencesData();
    const experience = experiences.find((exp: Experience) => exp.id === params.id);

    if (!experience) {
      return new NextResponse('Experience not found', { status: 404 });
    }

    return NextResponse.json(experience);
  } catch (error) {
    return new NextResponse('Server error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'experiences.json');
    const experiences = await getExperiencesData();
    const updatedData = await request.json();

    const index = experiences.findIndex((exp: Experience) => exp.id === params.id);
    if (index === -1) {
      return new NextResponse('Experience not found', { status: 404 });
    }

    experiences[index] = {
      ...experiences[index],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(filePath, JSON.stringify(experiences, null, 2));
    return NextResponse.json(experiences[index]);
  } catch (error) {
    return new NextResponse('Server error', { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'experiences.json');
    const experiences = await getExperiencesData();

    const filteredExperiences = experiences.filter((exp: Experience) => exp.id !== params.id);
    if (filteredExperiences.length === experiences.length) {
      return new NextResponse('Experience not found', { status: 404 });
    }

    await fs.writeFile(filePath, JSON.stringify(filteredExperiences, null, 2));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Server error', { status: 500 });
  }
}
