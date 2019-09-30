export interface Result{
  _id: string,
  status: boolean,
  sectionId: string,
  board: string,
  year: string,
  announceDate: string,
  examType: number,
  apiMode: number, //0 = api, 1 = scrapping, 2 = url
  resultUrl: string,
  apiUrl: string,
  requestType: number, //0 = GET, 1 = POST
  apiParams: string[],
  tags: string[]
}
  