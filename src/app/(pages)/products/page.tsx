import Products from "./[category]/Products";
import ProductPageSideBar from "./ProductPageSideBar";

export default function Page() {
  return (
    <div className="max-w-7xl min-h-screen mx-auto grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <ProductPageSideBar></ProductPageSideBar>
      </div>
      <div className="col-span-3">
        <Products></Products>
      </div>
    </div>
  )
}
