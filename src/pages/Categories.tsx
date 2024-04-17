import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/shared";
import useCategories from "@hooks/useCategories";
import { TCategory } from "@types";

const Categories = () => {
  const { error, loading, records } = useCategories();

  return (
    <>
      <Heading title="Categories" />
      <Loading status={loading} error={error}>
        <GridList<TCategory>
          records={records}
          renderItem={(record) => <Category {...record} />}
          emptyMessage="No categories found."
        />
      </Loading>
    </>
  );
};

export default Categories;
