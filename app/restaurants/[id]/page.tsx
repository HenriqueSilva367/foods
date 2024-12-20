import Image from "next/image";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { RestaurantImage } from "./_components/restaurant-image";
import { StarIcon } from "lucide-react";
import { DeliveryInfo } from "@/app/_components/delivery-info";
import { ProductList } from "@/app/_components/product-list";

type RestaurantPageProps = {
  params: {
    id: string;
  };
};

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          Product: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      Product: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound;
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <div className="flex justify-between items-center px-5 pt-5 relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="font-semibold text-xl">{restaurant.name}</h1>
        </div>
        <div className="flex gap-[3px] items-center top-2 text-white left-2 py-[2px] px-2 rounded-full bg-muted-foreground">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
          <span className="font-semibold text-xs">5.0</span>
        </div>
      </div>
      <DeliveryInfo restaurant={restaurant} />

      <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5 mt-3">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="bg-[#f4f4f4] min-w-[167px] rounded-lg text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="px-5 font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.Product} />
      </div>
      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={category.Product} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantPage;
