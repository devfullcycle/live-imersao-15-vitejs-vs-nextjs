import Image from "next/image";
import Link from "next/link";
import {
    format, parseISO
} from 'date-fns';

export async function getPhoto(photoId: number) {
  return fetch(`http://localhost:8000/photos/${photoId}`).then((res) =>
    res.json()
  );
}

export default async function PhotoDetailPage({
  params
}: {
  params: { photoId: string };
}) {
  const photo = await getPhoto(Number(params.photoId));
  return (
    <div className="container auto px-5 py-2">
      <div>
        <h1 className="text-2xl font-bold">Photo Details</h1>
      </div>
      <div className="flex mt-1 gap-1">
        <div>
          <Image src={photo.url} alt={photo.title} width={600} height={600}/>
        </div>
        <div>
          <p>{photo.title}</p>
          <p>{format(parseISO(photo.created_at), 'dd/MM/yyyy')}</p>
        </div>
      </div>
      <div className="flex mt-1 gap-1">
        <div>
          <Link href="/" className="text-blue-500">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
