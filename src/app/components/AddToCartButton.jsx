"use client";

import Swal from "sweetalert2";

export default function AddToCartButton({ productName }) {
  const handleAddToCart = async () => {
    await Swal.fire({
      icon: "success",
      title: "Added to cart",
      text: `${productName} is ready for checkout.`,
      timer: 1400,
      showConfirmButton: false,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 md:w-auto"
    >
      Add to Cart
    </button>
  );
}
