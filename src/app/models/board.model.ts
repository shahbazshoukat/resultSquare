export interface Board{
  _id: string,
  key: string,
  title: string,
  province: string,
  city: string,
  examTypes: object[],
  sections: string[],
  webUrl: string,
  resultUrl: string,
  tags: string[]
}
