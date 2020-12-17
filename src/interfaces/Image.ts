export interface IImageItem {
    created_date: string
    description: string
    extension: string
    mime: string
    size: number
    title: string
    type: string
    updated_date: string
    url: string
}

export interface IImageLists {
    current: number
    items: IImageItem[]
    next: string
    prev: string
    total: number
}