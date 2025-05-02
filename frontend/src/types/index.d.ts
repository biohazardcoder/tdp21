export interface UserProps{
    _id: string;
    clerkId: string;
    isVerified: boolean;
    coins: number;
    createdAt: string;
    updatedAt: string;
    savedLoads: string[];
    createdLoads: string[];
    loads: string[];
    __v: number;
}
export interface Load {
    _id: string
    createdAt: string
    updatedAt: string
    customer: Customer,
    title: string,
    description: string,
    contact: number,
    price: number,
    images: string[],
    location: {
        from: {
            city: string,
            code: string,
            coordinates: { lat: number, lng: number },
        },
        to: {
            city: string,
            code: string,
            coordinates: { lat: number, lng: number },
        },
    },
    weight: {
        number: number,
        type: string
    }
    fridge: boolean,
    connentor: {
        driver: Driver,
        cordinates: { lat: number, lng: number },
    } 
    connections: [
        {
            driver: Driver,
            date: string
        },
    ]
}


export interface ContactInterface {
    title: string,
    description: string
    email: string
    phone: string
    location: string
    links: Icon[]
}
export interface Icon {
    icon: string
    link: string
}

export interface CarouselType {
    title: string
    description: string
    images: string[]
    link: string
    _id?: string
    createdAt?: string
}

export interface Partner {
    title: string
    description: string
    images: string[],
    link: string
}

export interface StatsInterface {
    title: string
    length: number
    image: string,
}

export interface Creator {
    id: string
    firstName: string
    lastName: string
    emailAddresses: [
        {
            emailAddress: string
            id: string
        }
    ]
    phone: string
    imageUrl: string
}