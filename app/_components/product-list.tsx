import { Prisma } from "@prisma/client";
import { ProductItem } from "./product-item";

type ProductListProp = {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
};

export const ProductList = ({ products }: ProductListProp) => {
  return (
    <>
      <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
