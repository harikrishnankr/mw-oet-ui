import { useEffect, useRef, useState } from "react";

interface IInfiniteLoading {
    getItems: ({ page }: { page: string|number }) => any;
}

export const useInfiniteLoading = (props: IInfiniteLoading) => {
    const { getItems } = props;
    const [items, setItems] = useState<any[]>([]);
    const pageToLoad = useRef(
        new URLSearchParams(window.location.search).get("page") || 1
    );
    const initialPageLoaded = useRef(false);
    const [hasMore, setHasMore] = useState(true);

    const loadItems = async () => {
        const data = await getItems({ page: pageToLoad.current });
        setHasMore(data.hasMore);
        setItems((prevItems) => [...prevItems, ...data.list]);
    };

    useEffect(() => {
        if (initialPageLoaded.current) {
            return;
        }

        loadItems();
        initialPageLoaded.current = true;
    }, [loadItems]);

    return {
        items,
        hasMore,
        loadItems,
    };
};
