export interface AdminCarts {
    date: string,
    userId: number,
    cartsId: number,
    products: [{cartsId: number,
                productId: number,
                quantity: number}],
    name: string,
    phone: string
}
