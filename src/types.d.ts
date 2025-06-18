declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.pdf' {
  const content: string
  export default content
}

interface ImportMeta {
  readonly env: {
    readonly BASE_URL: string
  }
} 