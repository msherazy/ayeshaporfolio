import {promises as fs} from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';

async function updatePortfolioSection(section: string, data: any) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const portfolioData = JSON.parse(fileContent);

    portfolioData[section] = {
      ...portfolioData[section],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(filePath, JSON.stringify(portfolioData, null, 2));
    return portfolioData[section];
  } catch (error) {
    console.error(`Error updating ${section}:`, error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await updatePortfolioSection('contactInfo', data);
    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse('Failed to update contact info', { status: 500 });
  }
}
