import Products from "./Products";

export default async function Page({
    params,
}: {
    params: Promise<{ category: string }>
}) {
    const { category } = await params;
    console.log(category)
    return (
        <div className="grid grid-cols-4 max-w-7xl min-h-screen mx-auto gap-4">
            <div className="col-span-1">
            </div>
            <div className="col-span-3">
                <Products></Products>
            </div>
        </div>
    )
}
