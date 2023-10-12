import Link from "next/link";
import { PhotoList } from "../components/PhotoList";

export function HomePage({
  searchParams,
}: {
  searchParams: { page: string; search: string };
}) {

  const page = Number(searchParams.page || 1);
  const search = searchParams.search || "";

  return (
    <div className="container auto px-5 py-2">
      <div>
        <h1 className="text-2xl font-bold">Vite - Gallery</h1>
      </div>
      <div className="flex mt-1 gap-1">
        <form
          action="/"
          method="get"
        >
          <input type="hidden" name="page" value={page} />
          <input
            type="search"
            placeholder="Search"
            className="border text-black"
            name="search"
            defaultValue={search}
          />
          <button type="submit" className="border">
            Search
          </button>
        </form>
        <div className="flex gap-1">
          <Link
            href={`?page=${page - 1}&search=${search}`}
            className="text-blue-500"
          >
            Previous
          </Link>
          <a
            href={`?page=${page + 1}&search=${search}`}
            className="text-blue-500"
          >
            Next
          </a>
        </div>
      </div>

      <div className="flex flex-wrap">
        <PhotoList page={page} search={search} />
      </div>
    </div>
  );
}

export default HomePage;
