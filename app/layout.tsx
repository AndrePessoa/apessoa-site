import { Metadata } from 'next'
import './globals.css'
import './inline-styles.css'
import schemaData from './schema.json'
import { readFileSync } from 'fs'
import { join } from 'path'

// Read the JavaScript files at build time
const fontPreloadScript = readFileSync(join(process.cwd(), 'app/font-preload.js'), 'utf8')
const analyticsScript = readFileSync(join(process.cwd(), 'app/analytics.js'), 'utf8')

export const metadata: Metadata = {
  title: 'André Pessoa – Creative Developer, Squad Lead & Designer',
  description: 'André Pessoa – Creative developer, fullstack engineer, and designer with 16+ years of experience in interactivity, design, and leadership. Currently Interface Squad Lead at Clutch.',
  keywords: [
    'André Pessoa',
    'Creative Developer',
    'Squad Lead',
    'Designer',
    'Fullstack Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Interface Design',
    'Animation',
    'Web Development'
  ],
  authors: [{ name: 'André Pessoa', url: 'https://apessoa.com' }],
  creator: 'André Pessoa',
  publisher: 'André Pessoa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://apessoa.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'André Pessoa – Creative Developer, Squad Lead & Designer',
    description: 'Manager, fullstack developer and designer with 25+ years of experience in interactivity and leadership. Based in Europe, currently leading Interface Squad at Clutch.',
    type: 'profile',
    url: 'https://apessoa.com/',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'André Pessoa - Creative Developer',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'André Pessoa – Creative Developer & Squad Lead',
    description: 'Fullstack developer and designer with 25+ years of experience in UI/UX, animation, and leadership. Currently Interface Squad Lead at Clutch.',
    images: ['/preview.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#da532c',
    'theme-color': '#000000',
  },
}

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

function Footer(props: FooterProps) {
  return (
    <footer {...props}>
      Power by <a href="https://github.com/AndrePessoa">@AndrePessoa</a>
    </footer>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        <link
          href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=Comic+Neue:wght@700&display=swap"
          rel="preload"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=Comic+Neue:wght@700&display=swap"
          rel="stylesheet"
        />
        
        <link
          href="https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap"
          rel="preload"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap"
          rel="stylesheet"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData)
          }}
        />



        <script dangerouslySetInnerHTML={{
          __html: fontPreloadScript
        }} />

        <script dangerouslySetInnerHTML={{
          __html: analyticsScript
        }} />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}