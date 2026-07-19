import React from 'react'
import Hero from './_components/Hero'
import TrustedBy from './_components/TrustedBy'
import TechStack from './_components/TechStack'
import Features from './_components/Features'
import FeaturesTab from './_components/FeaturesTab'
import Dashboards from './_components/Dashboards'
import Plugins from './_components/Plugins'
import CTA from './_components/CTA'
import Blogs from './_components/Blogs'

function page() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      <Hero />
      <TrustedBy />
      <TechStack />
      <Features />
      <FeaturesTab />
      <Dashboards />
      <Plugins />
      <CTA />
      <Blogs />
    </main>
  )
}

export default page