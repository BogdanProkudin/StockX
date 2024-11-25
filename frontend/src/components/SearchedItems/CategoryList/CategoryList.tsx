import CategoryItem from "./CategoryItem";

const CategoryList = () => {
  const categoryListItems = [
    {
      categoryName: "CATEGORY",
      subcategoryName: [
        "Snikers",
        "Apparel",
        "Shoes",
        "Accessories",
        "Collectibles",
      ],
    },
  ];
  return (
    <div>
      {categoryListItems.map((categoryName) => {
        return (
          <CategoryItem
            categoryName={categoryName.categoryName}
            subcategoryName={categoryName.subcategoryName}
          />
        );
      })}
    </div>
  );
};

export default CategoryList;
