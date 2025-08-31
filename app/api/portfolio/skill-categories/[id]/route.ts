import {promises as fs} from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';

async function updateSkillCategory(id: string, data: any) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const portfolioData = JSON.parse(fileContent);

    const index = portfolioData.skillCategories.findIndex((cat: any) => cat.id === id);
    if (index === -1) {
      throw new Error('Skill category not found');
    }

    portfolioData.skillCategories[index] = {
      ...portfolioData.skillCategories[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(filePath, JSON.stringify(portfolioData, null, 2));
    return portfolioData.skillCategories[index];
  } catch (error) {
    console.error('Error updating skill category:', error);
    throw error;
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const result = await updateSkillCategory(params.id, data);
    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse('Failed to update skill category', { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const portfolioData = JSON.parse(fileContent);

    const filteredCategories = portfolioData.skillCategories.filter(
      (cat: any) => cat.id !== params.id
    );

    if (filteredCategories.length === portfolioData.skillCategories.length) {
      return new NextResponse('Skill category not found', { status: 404 });
    }

    portfolioData.skillCategories = filteredCategories;
    await fs.writeFile(filePath, JSON.stringify(portfolioData, null, 2));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Failed to delete skill category', { status: 500 });
  }
}
