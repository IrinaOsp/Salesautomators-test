"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import initialValues from "@/data/formikData";
import { phoneRegExp } from "@/data/data";
import { useEffect } from "react";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

export default function Form() {
  useEffect(() => {
    const getSDK = async () => {
      const sdk = await new AppExtensionsSDK({
        identifier: process.env.ID,
      }).initialize();
    };

    getSDK();
  }, []);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(1)
        .max(50, "Max 50 characters")
        .required("Required"),
      lastName: Yup.string()
        .min(1)
        .max(50, "Max 50 characters")
        .required("Required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
      email: Yup.string().email("Invalid email address").notRequired(),
      jobType: Yup.string().required("Required"),
      jobSource: Yup.string().required("Required"),
      jobDescription: Yup.string().notRequired(),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zipCode: Yup.string().required("Required"),
      area: Yup.string().required("Required"),
      startDate: Yup.date()
        .min(new Date(), "Start date can be from tomorrow")
        .required("Required"),
      startTime: Yup.string().required("Required"),
      endTime: Yup.string().required("Required"),
      testSelect: Yup.string().required("Required"),
    }),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 auto-rows-auto sm:grid-cols-2 gap-5 items-start justify-start"
    >
      <div className="flex-1 border border-gray-900/10 p-4 max-w-md min-w-64 h-full shadow-lg">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Client details
        </h2>
        <div className="grid grid-cols-2 gap-x-2">
          <input
            type="text"
            id="firstName"
            placeholder="First name"
            className="mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 invalid:border-pink-500 sm:text-sm sm:leading-6"
            {...formik.getFieldProps("firstName")}
          />
          <input
            type="text"
            id="lastName"
            placeholder="Last name"
            className="mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
            {...formik.getFieldProps("lastName")}
          />
          <p className="text-red-500 text-xs h-3 mb-3">
            {!!formik.errors.firstName && formik.touched.firstName
              ? formik.errors.firstName
              : ""}
          </p>
          <p className="text-red-500 text-xs h-3 mb-3">
            {!!formik.errors.lastName && formik.touched.lastName
              ? formik.errors.lastName
              : ""}
          </p>
        </div>
        <input
          type="phone"
          id="phone"
          placeholder="Phone"
          className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
          {...formik.getFieldProps("phone")}
        />
        <p className="text-red-500 text-xs h-3 mb-3">
          {!!formik.errors.phone && formik.touched.phone
            ? formik.errors.phone
            : ""}
        </p>
        <input
          type="email"
          placeholder="Email (optional)"
          {...formik.getFieldProps("email")}
          className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
        />
        <p className="text-red-500 text-xs h-3 mb-3">
          {!!formik.errors.email && formik.touched.email
            ? formik.errors.email
            : ""}
        </p>
      </div>
      <div className="flex-1 border border-gray-900/10 p-4 max-w-md min-w-64 h-full shadow-lg">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Job details
        </h2>
        <div className="grid grid-cols-2 gap-x-2">
          <input
            placeholder="Job type"
            {...formik.getFieldProps("jobType")}
            className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
          />
          <input
            placeholder="Job source"
            {...formik.getFieldProps("jobSource")}
            className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
          />
          <p className="text-red-500 text-xs h-3 mb-3">
            {!!formik.errors.jobType && formik.touched.jobType
              ? formik.errors.jobType
              : ""}
          </p>
          <p className="text-red-500 text-xs h-3 mb-3">
            {!!formik.errors.jobSource && formik.touched.jobSource
              ? formik.errors.jobSource
              : ""}
          </p>
        </div>
        <textarea
          placeholder="Job description (optional)"
          rows={3}
          {...formik.getFieldProps("jobDescription")}
          className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
        />
        <p className="text-red-500 text-xs h-3 mb-3">
          {!!formik.errors.jobDescription ? formik.errors.jobDescription : ""}
        </p>
      </div>
      <div className="flex-1 border border-gray-900/10 p-4 max-w-md min-w-64 h-full shadow-lg">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Service location
        </h2>
        <input
          placeholder="Address"
          {...formik.getFieldProps("address")}
          className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
        />
        <p className="text-red-500 text-xs h-3 mb-3">
          {!!formik.errors.address && formik.touched.address
            ? formik.errors.address
            : ""}
        </p>
        <input
          placeholder="City"
          {...formik.getFieldProps("city")}
          className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
        />
        <p className="text-red-500 text-xs h-3 mb-3">
          {!!formik.errors.city && formik.touched.city
            ? formik.errors.city
            : ""}
        </p>
        <input
          placeholder="State"
          {...formik.getFieldProps("state")}
          className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
        />
        <p className="text-red-500 text-xs h-3 mb-3">
          {!!formik.errors.state && formik.touched.state
            ? formik.errors.state
            : ""}
        </p>
        <div className="grid grid-cols-2 gap-x-2">
          <input
            placeholder="Zip code"
            {...formik.getFieldProps("zipCode")}
            className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
          />
          <input
            placeholder="Area"
            {...formik.getFieldProps("area")}
            className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
          />
          <p className="text-red-500 text-xs h-3 mb-3">
            {!!formik.errors.zipCode && formik.touched.zipCode
              ? formik.errors.zipCode
              : ""}
          </p>
          <p className="text-red-500 text-xs h-3 mb-3">
            {!!formik.errors.area && formik.touched.area
              ? formik.errors.area
              : ""}
          </p>
        </div>
      </div>
      <div className="flex-1 border border-gray-900/10 p-4 max-w-md min-w-64 h-full shadow-lg">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Scheduled
        </h2>
        <input
          type="text"
          placeholder="Start date"
          {...formik.getFieldProps("startDate")}
          onFocus={(e) => (e.target.type = "date")}
          className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
        />
        <p className="text-red-500 text-xs h-3 mb-3">
          {!!formik.errors.startDate && formik.touched.startDate
            ? formik.errors.startDate
            : ""}
        </p>
        <div className="grid grid-cols-2 gap-x-2">
          <input
            type="text"
            placeholder="Start time"
            onFocus={(e) => (e.target.type = "time")}
            {...formik.getFieldProps("startTime")}
            className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            placeholder="End time"
            onFocus={(e) => (e.target.type = "time")}
            {...formik.getFieldProps("endTime")}
            className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
          />
          <p className="text-red-500 text-xs h-3 mb-3">
            {!!formik.errors.startTime && formik.touched.startTime
              ? formik.errors.startTime
              : ""}
          </p>
          <p className="text-red-500 text-xs h-3 mb-3">
            {!!formik.errors.endTime && formik.touched.endTime
              ? formik.errors.endTime
              : ""}
          </p>
        </div>
        <input
          placeholder="Test select"
          onFocus={(e) => (e.target.type = "time")}
          {...formik.getFieldProps("testSelect")}
          className="block w-full mt-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 ring-1 focus:ring-0 sm:text-sm sm:leading-6"
        />
        <p className="text-red-500 text-xs h-3 mb-3">
          {!!formik.errors.testSelect && formik.touched.testSelect
            ? formik.errors.testSelect
            : ""}
        </p>
      </div>
      <div className="w-full">
        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className="block rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
