interface CarsPros {
    id: string,
    name: string,
    description: string,
    dailyRate: number,
    available: boolean
    license_plate: string,
    fine_amount: number,
    brand: string,
    category_id: string,
    SpecificationsCars: {
        id: string,
        car_id: string,
        specification_id: string,
        Specification:{
            id: string,
            name: string,
            description: string,
        }
    }[]
}

export  type {CarsPros} 