import Link from 'next/link';

export default function LoopActionsBar({ loopSlug, loop }) {
  // Derive slug from either prop; fall back to empty string
  const slug = loopSlug ?? loop?.slug ?? '';

  const offerHref = slug
    ? `/new-listing?loop=${encodeURIComponent(slug)}`
    : '/new-listing';

  const requestHref = slug
    ? `/new-request?loop=${encodeURIComponent(slug)}`
    : '/new-request';

  return (
    <div className="flex gap-4 justify-start mt-4">
      <Link
        href={offerHref}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded transition inline-block"
      >
        Offer an Item
      </Link>
      <Link
        href={requestHref}
        className="bg-gray-100 hover:bg-gray-200 text-sm font-medium py-2 px-4 rounded transition inline-block"
      >
        Request Help
      </Link>
    </div>
  );
}
