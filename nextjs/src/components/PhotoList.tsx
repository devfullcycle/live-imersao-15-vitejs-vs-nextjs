//server component
import Image from "next/image";
import Link from "next/link";

export async function getPhotos(page: number, search: string) {
  const response = await fetch(
    `http://localhost:8000/photos?_page=${page}&_limit=10&q=${search}`
  );
  return response.json();
}

export async function PhotoList({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const photos = await getPhotos(page, search);
  return (
    <>
      {photos.map((item, key) => (
        <div className="flex w-1/3 p-2" key={key}>
          <Link href={`/photos/${item.id}`}>
            <div className="w-full flex flex-col">
              <Image
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src={item.url}
                width={600}
                height={600}
              />
              <span>{item.title.slice(0, 10)}...</span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
