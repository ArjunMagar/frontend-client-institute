'use client'
import { useAppSelector } from "@/lib/store/hooks";
import { useState } from "react";
import Modal1 from "./components/modal/Modal1";

const Cart = () => {
    const { items } = useAppSelector((store) => store.cart)
    const [isModalOpen1, setIsModalOpen1] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const openModal1 = (id: string) => {
        setSelectedId(id);
        setIsModalOpen1(true);
    };

    const closeModal1 = () => {
        setIsModalOpen1(false);
        setSelectedId(null);
    };

    const subTotal = items.reduce((total,item)=>Number(item.coursePrice)+total,0)
    const totalQty = items.length
    const TaxCharge = (13/100)*subTotal
    const Total = subTotal + TaxCharge


    return (
        <>
            {/* Cart Section */}
            <section id="portfolio" className="portfolio" >
                <div className="container" style={{ paddingTop: "60px" }}>
                    {isModalOpen1 && <Modal1 id={selectedId} closeModal1={closeModal1} />}
                    <div className="bg-gray-100 py-8">
                        <div className="container mx-auto px-4">
                            <h1 className="text-2xl font-semibold mb-4" style={{ fontSize: "24px" }}>Cart Details</h1>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="md:w-3/4">
                                    <div className="bg-white rounded-lg shadow-md p-6 mb-4" style={{ padding: "24px", marginBottom: "16px" }}>
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th className="text-left font-semibold">Product</th>
                                                    <th className="text-left font-semibold">Name</th>
                                                    <th className="text-left font-semibold">Price</th>
                                                    <th className="text-left font-semibold">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody >
                                                {items.length > 0 && items.map((item) => {
                                                    return (
                                                        <tr key={item.cartId}>
                                                            <td className="py-4" style={{ padding: "16px 0px" }}>
                                                                <div className="flex items-center">
                                                                    <img className="h-16 w-16 mr-4" src={item.courseThumbnail} alt="Product image" />
                                                                </div>
                                                            </td>
                                                            <td className="py-4" style={{ padding: "16px 0px" }}>
                                                                <div className="flex items-center">
                                                                    <span className="font-semibold">{item.courseName}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-4" style={{ padding: "16px 0px" }}>Rs {item.coursePrice}</td>
                                                            <td className="py-4" style={{ padding: "16px 0px" }}>
                                                                <div className="flex items-center" style={{ marginLeft: "14px" }}>
                                                                    <button
                                                                        onClick={() => openModal1(item.cartId)}
                                                                        className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                                {/* More product rows */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="md:w-1/4">
                                    <div className="bg-white rounded-lg shadow-md p-6" style={{ padding: "24px" }}>
                                        <h2 className="text-lg font-semibold mb-4" style={{ marginBottom: "16px", fontSize: "18px" }} >Order Summary</h2>
                                        <div className="flex justify-between mb-2" style={{ marginBottom: "8px" }}>
                                            <span>Subtotal</span>
                                            <span>Rs: {subTotal}</span>
                                        </div>
                                        <div className="flex justify-between mb-2" style={{ marginBottom: "8px" }}>
                                            <span>Total Items</span>
                                            <span>Qty: {totalQty}</span>
                                        </div>
                                        <div className="flex justify-between mb-2" style={{ marginBottom: "8px" }}>
                                            <span>Tax Pay: 13%</span>
                                            <span>Rs: {TaxCharge}</span>
                                        </div>
                                        <hr className="my-2" />
                                        <div className="flex justify-between mb-2" style={{ marginBottom: "8px" }}>
                                            <span className="font-semibold">Total</span>
                                            <span className="font-semibold">Rs: {Total}</span>
                                        </div>
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full btn" style={{ padding: "8px 16px", marginTop: "16px" }}>Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    );
}

export default Cart;