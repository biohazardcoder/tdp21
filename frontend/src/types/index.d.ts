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