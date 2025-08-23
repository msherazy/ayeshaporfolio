import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

async function getProjectsData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading projects data:', error);
    return [];
  }
}

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projects = await getProjectsData();
    const project = projects.find(proj => proj.id === params.id);

    if (!project) {
      return new NextResponse('Project not found', { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return new NextResponse('Server error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const projects = await getProjectsData();
    const updatedData = await request.json();

    const index = projects.findIndex(proj => proj.id === params.id);
    if (index === -1) {
      return new NextResponse('Project not found', { status: 404 });
    }

    projects[index] = {
      ...projects[index],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));
    return NextResponse.json(projects[index]);
  } catch (error) {
    return new NextResponse('Server error', { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const projects = await getProjectsData();

    const filteredProjects = projects.filter(proj => proj.id !== params.id);
    if (filteredProjects.length === projects.length) {
      return new NextResponse('Project not found', { status: 404 });
    }

    await fs.writeFile(filePath, JSON.stringify(filteredProjects, null, 2));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Server error', { status: 500 });
  }
}
