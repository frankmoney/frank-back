type SqlBuildContext = {
  appendText(text: string): void
  appendParam(value: any): number
}

export default SqlBuildContext
