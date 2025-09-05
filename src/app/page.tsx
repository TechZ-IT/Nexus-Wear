// import Image from "next/image";

import Banner from "@/components/Home/Banner/Banner";
import Categories from "@/components/Home/Categories/Categories";
import For_Sale from "@/components/Home/For_Sale/For_Sale";
import Today_For_You from "@/components/Home/Today_For_You/Today_For_You";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <For_Sale></For_Sale>
      <Today_For_You></Today_For_You>
    </div>
  );
}
