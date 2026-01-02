import { requestInfo as r } from 'rwsdk/worker'
import { SplashImage } from './SplashImage'

export const Splash = () => {
  const pageData = r.ctx.pageContext?.pageData

  const splashimage = pageData?.attrs.splash?.image ?? pageData?.attrs.splashimage
  if (!splashimage) return null
  return <SplashImage src={splashimage} />
}
