import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiurls";
import useFetch from "@/hooks/api-fetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function RedirectLink() {

    const { shortUrl } = useParams();

    const {
        data,
        loading,
        fn
    } = useFetch(getLongUrl);

    const {
        loading: loadingStats,
        fn: fnStats
    } = useFetch(storeClicks);

    useEffect(() => {
        fn(shortUrl);
    }, [shortUrl]);

    useEffect(() => {
        if (data) {
            fnStats({
                id: data.id,
                original_url: data.original_url,
            });
        }
    }, [data]);

    if (loading || loadingStats) {
        return <h1>Redirecting...</h1>;
    }

    return null;
}

export default RedirectLink;