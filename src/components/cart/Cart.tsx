"use client";

import { PiShoppingCartSimple} from "react-icons/pi";
import { useRouter } from "next/navigation";

const CartIcon = ({ itemCount = 0 }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/cart"); // ✅ Navigates to /cart page
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer"
      title="Go to Cart"
      style={{marginTop:"5px",marginLeft:"5px"}}
    >
      <PiShoppingCartSimple className="text-[33px] text-gray-800 hover:text-blue-800 opacity-80" />

      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
