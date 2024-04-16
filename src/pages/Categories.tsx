import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/shared";
import { TCategory } from "@customTypes/category";
import {
  actGetCategories,
  cleanupCategoriesRecords,
} from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const Categories = () => {
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

  return (
    <>
      <Heading title="Categories" />
      <Loading status={loading} error={error}>
        <GridList<TCategory>
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  );
};

export default Categories;
