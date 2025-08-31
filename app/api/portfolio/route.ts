import {promises as fs} from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';

async function getPortfolioData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return null;
  }
}

export async function GET() {
  const data = await getPortfolioData();
  if (!data) {
    return new NextResponse('Portfolio data not found', { status: 404 });
  }
  return NextResponse.json(data);
}
