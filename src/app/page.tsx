// import Image from "next/image";

import Banner from "@/components/Home/Banner/Banner";
import Categories from "@/components/Home/Categories/Categories";
import For_Sale from "@/components/Home/For_Sale/For_Sale";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <For_Sale></For_Sale>
    </div>
  );
}
