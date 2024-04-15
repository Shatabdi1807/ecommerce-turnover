"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { faker } from "@faker-js/faker";

import { api } from "~/trpc/react";

export function SelectInterest() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxPageNumbers = 5;

  const interestsQuery = api.interest.getInterests.useQuery();

  const totalPages = Math.ceil(interestsQuery.data?.length / itemsPerPage);
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-2/6 rounded-3xl border px-14 py-10">
      <h1 className="pb-9 text-center text-3xl font-semibold">
        Please mark your interests!
      </h1>
      <p className="pb-3 text-center text-xl">We will keep you notified.</p>
      <p className="pb-8 text-xl font-light">My saved interests!</p>
      <div className="flex flex-col gap-4">
        {interestsQuery.data
          ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((i: any) => (
            <div className="flex" key={i.id}>
              <input
                type="checkbox"
                name="interest"
                value={i.name}
                className="h-6 w-10 "
              />
              <p className="text-sm">{i.name}</p>
            </div>
          ))}
      </div>
      <div className="mt-4 flex">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
          className="mx-2 rounded text-gray-300 text-xl"
        >
          {"<"}
        </button>
        {startPage !== 1 && (
          <button
            onClick={() => setCurrentPage(1)}
            className={`mx-1 rounded text-gray-300 text-xl`}
          >
            1
          </button>
        )}
        {startPage !== 1 && <span className="mx-1 text-gray-300 text-xl">...</span>}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`mx-1 rounded text-xl ${currentPage === page ? "text-black" : "text-gray-300"}`}
          >
            {page}
          </button>
        ))}
        {endPage !== totalPages && (
          <span className=" mx-1 text-gray-300 text-xl">...</span>
        )}
        {endPage !== totalPages && (
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`mx-1 rounded text-gray-300 text-xl`}
          >
            {totalPages}
          </button>
        )}
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="mx-2 rounded text-gray-300 text-xl"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
