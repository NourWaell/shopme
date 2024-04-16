import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/shared";
import { TCategory } from "@customTypes/category";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { error, loading, records } = useCategories();

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
