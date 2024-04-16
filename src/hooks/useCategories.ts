import { actGetCategories, cleanupCategoriesRecords } from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const promise = dispatch(actGetCategories());

    return () => {
      dispatch(cleanupCategoriesRecords());
      promise.abort();
    };
  }, [dispatch]);

  return { records, error, loading };
};
export default useCategories;
