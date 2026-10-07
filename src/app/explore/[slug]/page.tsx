import { notFound } from 'next/navigation';
import { CULTURAL_ASSETS } from '@/data/culturalAssets';
import { CulturalRecordClient } from './CulturalRecordClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CULTURAL_ASSETS.map((asset) => ({
    slug: asset.slug,
  }));
}

export default async function CulturalRecordPage({ params }: PageProps) {
  const { slug } = await params;
  const asset = CULTURAL_ASSETS.find((a) => a.slug === slug);

  if (!asset) {
    notFound();
  }

  return <CulturalRecordClient asset={asset} />;
}
