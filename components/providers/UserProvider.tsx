"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
    myList: string[];
    watchHistory: string[];
    toggleMyList: (id: string) => void;
    addToHistory: (id: string) => void;
    isInMyList: (id: string) => boolean;
    clearHistory: () => void;
    clearMyList: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [myList, setMyList] = useState<string[]>([]);
    const [watchHistory, setWatchHistory] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const storedList = localStorage.getItem("streamx_mylist");
            const storedHistory = localStorage.getItem("streamx_history");

            if (storedList) setMyList(JSON.parse(storedList));
            if (storedHistory) setWatchHistory(JSON.parse(storedHistory));
        } catch {
            // fallback
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem("streamx_mylist", JSON.stringify(myList));
            } catch {}
        }
    }, [myList, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem("streamx_history", JSON.stringify(watchHistory));
            } catch {}
        }
    }, [watchHistory, isLoaded]);

    const toggleMyList = (id: string) => {
        setMyList((prev) =>
            prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
        );
    };

    const addToHistory = (id: string) => {
        setWatchHistory((prev) => {
            const newList = prev.filter((mId) => mId !== id);
            return [id, ...newList].slice(0, 50);
        });
    };

    const clearHistory = () => {
        setWatchHistory([]);
        try {
            localStorage.removeItem("streamx_history");
        } catch {}
    };

    const clearMyList = () => {
        setMyList([]);
        try {
            localStorage.removeItem("streamx_mylist");
        } catch {}
    };

    const isInMyList = (id: string) => myList.includes(id);

    return (
        <UserContext.Provider
            value={{
                myList,
                watchHistory,
                toggleMyList,
                addToHistory,
                isInMyList,
                clearHistory,
                clearMyList,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
