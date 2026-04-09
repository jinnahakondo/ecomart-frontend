export const getOrders = async (userId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/user/${userId}`)
    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    const data = await res.json()
    return data.data

}