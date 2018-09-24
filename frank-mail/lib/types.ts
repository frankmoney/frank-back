import React from 'react'

export type TemplateArgs<TData> = {
  data: TData
}

export type TemplateResult = {
  subject: string
  html: string
}

export type Template<TData> = (args: TemplateArgs<TData>) => TemplateResult

export type TemplateBuilderArgs<TData> = {
  data: TData
}

export type TemplateBuilderResult = {
  subject: string
  body: React.ReactElement<any>
}

export type TemplateBuilder<TData> = (
  args: TemplateBuilderArgs<TData>
) => TemplateBuilderResult
