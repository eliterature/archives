// src/global.d.ts
declare module '@yaireo/tagify/dist/react.tagify' {
  import { FC, RefObject } from 'react'
  import { TagifySettings } from '@yaireo/tagify'

  interface TagsProps {
    tagifyRef?: RefObject<any>
    settings?: Partial<TagifySettings>
    value?: string
    onChange?: (e: CustomEvent) => void
    showDropdown?: boolean  // Add this line
    autoFocus?: boolean     // Add autoFocus if it’s not already defined
    whitelist?: { value: string; color: string }[] // Add whitelist if needed
    placeholder?: string    // Add placeholder if needed
  }

  const Tags: FC<TagsProps>
  export default Tags
}
