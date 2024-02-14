type BusinessList = {
    readonly businessLists: {
        readonly id: string,
        readonly name: string,
        readonly contactPerson: string,
        readonly adress: string,
        readonly email: string,
        readonly about: string,
        readonly category: {
            readonly name: string
        }
        readonly images: {
            readonly url: string
        }[]
    }[]
}

type Categories = {
    readonly categories: {
        readonly id: string,
        readonly name: string
        readonly icon: {
            readonly url: string
        }
    }[]
}

type Sliders = {
    readonly sliders: {
        readonly id: string,
        readonly image: {
            readonly url: string
        }
        readonly name: string
    }[]
}

type Category = "Cleaning" | "Repairing" | "Painting" | "Shifting"