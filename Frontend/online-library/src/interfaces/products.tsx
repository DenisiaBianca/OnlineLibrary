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

export interface Product {
    Id: number;
    Name: string;
    TypeId: number;
    PublishHouse: string;
    Author: string;
    PublishYear: number;
    Pages: number;
    Language: string;
    Cover: string;
    Stock: number;
    Artist: string;
    RecordLabel: string;
    Audio: string;
    Suport: string;
    Director: string;
    Studio: string;
    Country: string;
    Time: number;
    Categories: string[];
}


