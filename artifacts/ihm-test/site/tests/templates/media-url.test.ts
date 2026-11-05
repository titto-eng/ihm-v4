import { describe, expect, it } from 'vitest'
import { localUrl, mediaOf } from '@/components/blocks/media'

describe('localUrl', () => {
  it('makes same-origin media URLs relative and drops the slash after the file name', () => {
    expect(localUrl('http://localhost:3000/api/media/file/a5d85aa9c713-master-nursing.webp/')).toBe('/api/media/file/a5d85aa9c713-master-nursing.webp')
    expect(localUrl('https://ihm.edu.au/api/media/file/x-y.jpg/?v=2')).toBe('/api/media/file/x-y.jpg?v=2')
    expect(localUrl('/api/media/file/photo.png/')).toBe('/api/media/file/photo.png')
  })
  it('leaves other URLs alone', () => {
    expect(localUrl('/api/media/file/photo.png')).toBe('/api/media/file/photo.png')
    expect(localUrl('https://cdn.example.com/a/b.webp/')).toBe('https://cdn.example.com/a/b.webp/')
    expect(localUrl('/images/home/hero/community.webp')).toBe('/images/home/hero/community.webp')
  })
  it('mediaOf returns the fixed URL', () => {
    expect(mediaOf({ id: 5, alt: 'master nursing', url: 'http://localhost:3000/api/media/file/m.webp/' } as never)?.url).toBe('/api/media/file/m.webp')
  })
})
