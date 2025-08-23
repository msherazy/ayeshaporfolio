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

export async function GET() {
  const data = await getProjectsData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const projects = await getProjectsData();
    const newProject = await request.json();

    newProject.id = Date.now().toString();
    newProject.createdAt = new Date().toISOString();
    newProject.updatedAt = new Date().toISOString();

    projects.unshift(newProject);
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

    return NextResponse.json(newProject);
  } catch (error) {
    return new NextResponse('Failed to create project', { status: 500 });
  }
}
