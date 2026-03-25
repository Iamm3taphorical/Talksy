'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden border-none rounded-none md:rounded-3xl">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
      />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
            Talksy 3D AI Chat Platform
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg text-lg">
            Experience real-time conversations enhanced with a magical AI assistant. 
            Connect with friends, colleagues, and AI seamlessly.
          </p>
          <div className="mt-8">
            <Link href="/chat">
              <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-neutral-200">
                Enter Chat
              </Button>
            </Link>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative min-h-[300px] md:min-h-full pointer-events-auto">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
