export interface Book {
    Name: string;
    PublishHouse: string;
    Author: string;
    PublishYear: number;
    Pages: number;
    Language: number;
    Cover: string;
    Stock: number;
    Categories: string[];
}

export interface Magazine {
    Name: string;
    PublishHouse: string;
    PublishYear: number;
    Pages: number;
    Language: number;
    Cover: string;
    Stock: number;
    Categories: string[];
}

export interface CD {
    Name: string;
    Cover: string;
    Stock: number;
    Artist: string;
    RecordLabel: string;
    Audio: string;
    Suport: string;
}

export interface DVD {
    Name: string;
    Cover: string;
    Stock: number;
    Director: string;
    Studio: string;
    Audio: string;
    Country: string;
    Suport: string;
    Time: number;
}

export interface IProduct {
    id?: number;
    name?: string;
    typeId?: number;
    publishHouse?: string;
    author?: string;
    publishYear?: number;
    pages?: number;
    language?: string;
    cover?: string;
    stock?: number;
    artist?: string;
    recordLabel?: string;
    audio?: string;
    suport?: string;
    director?: string;
    studio?: string;
    country?: string;
    time?: number;
    categories?: string[];
}

export interface ISaveProduct {
    name?: string;
    typeId?: number;
    publishHouse?: string;
    author?: string;
    publishYear?: number;
    pages?: number;
    language?: string;
    stock?: number;
    artist?: string;
    recordLabel?: string;
    audio?: string;
    suport?: string;
    director?: string;
    studio?: string;
    country?: string;
    time?: number;
    categories?: string[];
    cover?: string;
}

export interface IFilter {
    Books : boolean;
    Magazines : boolean;
    CD: boolean;
    DVD: boolean;
    BeginYear?: number;
    EndYear?: number;
}

export interface ICategory {
    productTypeId : number;
    name: string;
    id: number;
}

export interface IProductWithCategoriesModel {
    product: IProduct,
    categories: ICategory[],
    status: number
}

export interface IBorrow {
    id: number;
    productName: string;
    clientEmail: string;
    reservedDate: Date;
    borrowDate : Date;
    returnDate: Date;
}


