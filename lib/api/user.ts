export const updateUser = async (id: string, data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to update user");
    }

    return res.json();
};

