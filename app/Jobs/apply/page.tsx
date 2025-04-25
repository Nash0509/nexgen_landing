"use client";
import React, { Suspense } from "react";
import ApplyForm from "../ApplyForm";

const Page = () => {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ApplyForm />
    </Suspense>
  );
};

export default Page;
