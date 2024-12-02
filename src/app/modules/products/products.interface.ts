

export type TProduct = {
    productName: string
    images: string[]
    quantity: string
    status: "active" | "inactive"
    rating: { totalPeople: string, totalRating: string }
    productPrice: string
    discount: string
    description: string
    category: string
    productUnit: string
}