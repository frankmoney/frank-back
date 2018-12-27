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
  logoAlign?: 'left' | 'center'
  body: React.ReactElement<any>
}

export type TemplateBuilder<TData> = (
  args: TemplateBuilderArgs<TData>,
) => TemplateBuilderResult

export type UserType = {
  lastName?: null | string
  firstName: string
}

export type AccountType = {
  name: string
}
