"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Iinstitute } from "./institute.types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createInstitute } from "@/lib/store/institute/instituteSlice";
import { Status } from "@/lib/store/global/types";
import HomePageLayout from "@/components/homepagelayout/HomePageLayout";

function CreateInstitute() {
  const { status } = useAppSelector((state) => state.institute);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<Iinstitute>({
    instituteName: "",
    instituteEmail: "",
    institutePhoneNumber: "",
    instituteAddress: "",
    instituteVatNo: "",
    institutePanNo: "",
  });
  // console.log(data, "form data...");
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // get from localStorage or get from Redux

    if (!token) return alert("Token not found");

    dispatch(createInstitute(data, token));
  };

  useEffect(() => {

    if (status === Status.Success) {
      alert("Institute created successfully, Please! login again as institute");
      localStorage.removeItem("token")
      window.location.href = "/auth/login"
    } else if (status === Status.Error) {
      alert("Institute already created !!!");
      window.location.href = "/institute/dashboard";
    }

  }, [status]);

  return (
    <>
      <HomePageLayout>
        <section id="create-institute" className="py-16 bg-gray-50 rounded-2xl shadow-lg" style={{paddingTop:"110px"}}>
          <div className="container mx-auto px-4 max-w-3xl p-8">
            <div className="contact-form">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Institute</h3>
              <form className="work-request space-y-6" onSubmit={handleSubmit}>
                {/* Institute Name */}
                <div className="form-group">
                  <label htmlFor="instituteName" className="block text-sm font-medium text-gray-700 mb-1">
                    Institute Name
                  </label>
                  <input
                    type="text"
                    id="instituteName"
                    name="instituteName"
                    onChange={handleChange}
                    placeholder="Enter your institute name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="instituteEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="instituteEmail"
                    name="instituteEmail"
                    onChange={handleChange}
                    placeholder="example@domain.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label htmlFor="institutePhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="institutePhoneNumber"
                    name="institutePhoneNumber"
                    onChange={handleChange}
                    placeholder="+977 9812345678"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>

                {/* Address */}
                <div className="form-group">
                  <label htmlFor="instituteAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    id="instituteAddress"
                    name="instituteAddress"
                    rows={3}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>

                {/* VAT No */}
                <div className="form-group">
                  <label htmlFor="instituteVatNo" className="block text-sm font-medium text-gray-700 mb-1">
                    VAT Number
                  </label>
                  <input
                    type="text"
                    id="instituteVatNo"
                    name="instituteVatNo"
                    onChange={handleChange}
                    placeholder="Enter VAT Number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>

                {/* PAN No */}
                <div className="form-group">
                  <label htmlFor="institutePanNo" className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    id="institutePanNo"
                    name="institutePanNo"
                    onChange={handleChange}
                    placeholder="Enter PAN Number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
                  style={{ padding: "12px" }}
                >
                  Create Institute
                </button>
              </form>
            </div>
          </div>
        </section>
      </HomePageLayout>
    </>
  );
}

export default CreateInstitute;
