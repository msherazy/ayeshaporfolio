import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const portfolioData = JSON.parse(fileContent);

    const newCategory = await request.json();
    newCategory.id = Date.now().toString();
    newCategory.createdAt = new Date().toISOString();
    newCategory.updatedAt = new Date().toISOString();

    portfolioData.skillCategories.push(newCategory);
    await fs.writeFile(filePath, JSON.stringify(portfolioData, null, 2));

    return NextResponse.json(newCategory);
  } catch (error) {
    return new NextResponse('Failed to create skill category', { status: 500 });
  }
}
