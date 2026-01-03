import { ViewTransition } from 'react'

export const SplashImage = ({ src }: { src: string }) => (
  <ViewTransition>
    <img
      id="splashimage"
      src={src}
      className="h-42 w-full my-6 object-cover cursor-default rounded"
      alt="splash image"
    />
  </ViewTransition>
)
