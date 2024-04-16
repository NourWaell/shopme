import {
  actGetCategories,
  cleanupCategoriesRecords,
} from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(actGetCategories());

    return () => {
      dispatch(cleanupCategoriesRecords());
    };
  }, [dispatch]);

  return { records, error, loading };
};
export default useCategories;
