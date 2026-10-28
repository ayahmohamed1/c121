import type { Metadata } from 'next'
import giftData from '@/lib/giftData'
import GiftClient from '@/components/GiftClient'

export const metadata: Metadata = {
  metadataBase: new URL('https://agiftforyouuu.vercel.app'),
  title: 'Happy Birthday Jomana! 🎂',
  description: 'A special birthday message for Jomana 🤍',
  openGraph: {
    title: 'Happy Birthday Jomana! 🎂',
    description: 'A special birthday message for Jomana 🤍',
    url: 'https://agiftforyouuu.vercel.app',
    siteName: 'Birthday Gift',
    type: 'website',
    images: [
      {
        url: 'https://agiftforyouuu.vercel.app/images/og-cat.jpg',
        secureUrl: 'https://agiftforyouuu.vercel.app/images/og-cat.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Happy Birthday Jomana Cat 🐱🎂',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Birthday Jomana! 🎂',
    description: 'A special birthday message for Jomana 🤍',
    images: ['https://agiftforyouuu.vercel.app/images/og-cat.jpg'],
  },
}

export default function Home() {
  const data = giftData.jomana || giftData.ahmed || giftData.amir
  return <GiftClient data={data} />
}