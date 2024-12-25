import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SUMMARY_API from "../common";
import VerticalCard from "../components/VerticalCard";

function Search() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const query = useLocation();

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    SUMMARY_API.searchProduct.url + query.search
                );
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="container p-4 mx-auto">
            {loading && <p className="text-lg text-center">Loading ...</p>}

            <p className="my-3 text-lg font-semibold">
                Search Results : {data.length}
            </p>

            {data.length === 0 && !loading && (
                <p className="p-4 text-lg text-center bg-white">
                    No Data Found....
                </p>
            )}

            {data.length !== 0 && !loading && (
                <VerticalCard loading={loading} data={data} />
            )}
        </div>
    );
}

export default Search;
