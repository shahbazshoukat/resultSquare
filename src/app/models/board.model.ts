export interface Board{
  _id: string,
  title: string,
  province: string,
  city: string,
  examTypes: object[],
  classes: string[],
  apiMode: number, //0 = api, 1 = scrapping, 2 = url
  webUrl: string,
  resultUrl: string,
  apiUrl: string,
  requestType: number, //0 = GET, 1 = POST
  apiParams: string[],
  tags: string[]
}
  