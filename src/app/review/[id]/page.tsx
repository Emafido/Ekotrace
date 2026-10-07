import { notFound } from 'next/navigation';
import { SEEDED_CONTRIBUTION_REVIEWS } from '@/data/culturalAssets';
import { VerifierReviewClient } from './VerifierReviewClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SEEDED_CONTRIBUTION_REVIEWS.map((sub) => ({
    id: sub.id,
  }));
}

export default async function VerifierReviewPage({ params }: PageProps) {
  const { id } = await params;
  const submission = SEEDED_CONTRIBUTION_REVIEWS.find((s) => s.id === id) || SEEDED_CONTRIBUTION_REVIEWS[0];

  if (!submission) {
    notFound();
  }

  return <VerifierReviewClient submission={submission} />;
}
