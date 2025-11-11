import { LayoutProps } from 'rwsdk/router'
import { Menu } from './Menu'
import { Metadata } from './Metadata'
import { Splash } from './Splash'

export function ContentLayout({ children }: LayoutProps) {
  return (
    <div className="max-w-3xl m-auto py-3 px-3 lg:px-0 overflow-hidden">
      <script type="module" src="/js/image-enlarge.js" defer></script>
      <Metadata />
      <Menu />
      <Splash />
      {children}
    </div>
  )
}
