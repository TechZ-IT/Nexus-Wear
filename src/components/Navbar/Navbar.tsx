import { MdLocalGroceryStore } from "react-icons/md";
import Nav_1 from "./Nav_1/Nav_1";
import Nav_2 from "./Nav_2/Nav_2";

export default function Navbar() {
    return (
        <div className="shadow-xl">
            <div className="max-w-7xl flex flex-col gap-2 md:px-5 px-3 mx-auto  py-2.5">
                <Nav_1></Nav_1>
                <Nav_2></Nav_2>
            </div>
        </div>
    )
}
