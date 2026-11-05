import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { renderThankYou, thankYouMetadata } from '@/components/templates/landing/route'

// /enquirenow/scholarship/thanks.php: the landing row's thankYouPath (src/content/landing.ts). Always noindex (60 §5).
const PATH = '/enquirenow/scholarship/'
const SEGMENT = 'thanks.php'

export async function generateMetadata(): Promise<Metadata> {
  return thankYouMetadata(PATH, SEGMENT)
}

export default async function ThankYouPage() {
  return (await renderThankYou(PATH, SEGMENT)) ?? notFound()
}
