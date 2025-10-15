import { useState, useEffect } from "react";
import { searchData } from "../FakeData/SearchData";
import useDebounce from "./useDebounce";

export const useSearchLogic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setResults([]);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    const filtered = searchData.filter((item) =>
      item.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    setResults(filtered);
    setIsTyping(false);
  }, [debouncedSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setIsTyping(true);
  };

  const handleSelect = (item) => {
    setSearchTerm(item);
    setResults([]);
  };

  return {
    searchTerm,
    results,
    isTyping,
    handleChange,
    handleSelect,
  };
};
