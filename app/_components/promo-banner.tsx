import Image, { ImageProps } from "next/image";

export const PromoBanner = (props: ImageProps) => {
  return (
    <>
      <Image
        height={0}
        width={0}
        className="h-auto w-full object-contain"
        sizes="100vw"
        quality={100}
        {...props}
      />
    </>
  );
};
