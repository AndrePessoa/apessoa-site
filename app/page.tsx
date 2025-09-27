'use client'

import ScreenHome from '../src/screens/home'
import ScreenAbout from '../src/screens/about'
import ScreenResume from '../src/screens/resume'
import ScreenPortfolio from '../src/screens/portfolio'

export default function HomePage() {
  return (
    <>
      <ScreenHome />
      <ScreenAbout />
      <ScreenPortfolio />
      <ScreenResume />
    </>
  )
}