import { LayoutProps } from 'rwsdk/router'
import { Menu } from './Menu'
import { Metadata } from './Metadata'
import { Splash } from './Splash'

export function ContentLayout({ children }: LayoutProps) {
  return (
    <div className="max-w-3xl m-auto p-3">
      <Metadata />
      <Menu />
      <Splash />
      {children}
    </div>
  )
}
