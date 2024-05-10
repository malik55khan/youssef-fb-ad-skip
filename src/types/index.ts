export type Item  = {
    name:string
    id:number
}
export type Settings = {
    isFilterActive?: boolean
    isScrollActive?: boolean
    numberOfAds?: number
    cta?: Item[]
}