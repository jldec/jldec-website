import { LayoutProps } from 'rwsdk/router'
import { Menu } from './Menu'
import { Metadata } from './Metadata'
import { Splash } from './Splash'

export function ContentLayout({ children }: LayoutProps) {
  return (
    <div className="max-w-3xl m-auto py-3 px-3 lg:px-0 overflow-hidden">
      <Metadata />
      <Menu />
      <Splash />
      {children}
      <script dangerouslySetInnerHTML={{ __html: 'import("/js/image-enlarge.js")' }} type="module"></script>
    </div>
  )
}
