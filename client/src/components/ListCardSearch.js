import React from "react";
import SearchCard from "./SearchCard";

const ListCardSearch = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between gap-4 overflow-x-scroll scrollbar-hide transition-all">
            {loading
                ? loadingList.map((product, index) => {
                      return (
                          <div className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow dark:bg-neutral-900 dark:text-slate-300  ">
                              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                              <div className="grid gap-3 p-4">
                                  <div className="p-1 py-2 text-base font-medium text-black rounded-full md:text-lg text-ellipsis line-clamp-1 animate-pulse bg-slate-200"></div>
                                  <p className="p-1 py-2 capitalize rounded-full text-slate-500 animate-pulse bg-slate-200"></p>
                                  <div className="flex gap-3">
                                      <p className="w-full p-1 py-2 font-medium text-red-600 rounded-full animate-pulse bg-slate-200"></p>
                                      <p className="w-full p-1 py-2 line-through rounded-full text-slate-500 animate-pulse bg-slate-200"></p>
                                  </div>
                                  <button className="px-3 py-2 text-sm text-white rounded-full bg-slate-200 animate-pulse"></button>
                              </div>
                          </div>
                      );
                  })
                : data.map((product, index) => {
                      return (
                          <SearchCard
                              product={product}
                              key={index}
                          ></SearchCard>
                      );
                  })}
        </div>
    );
};

export default ListCardSearch;
