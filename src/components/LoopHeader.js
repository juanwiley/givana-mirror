export default function LoopHeader({ name, description, imageUrl }) {
  return (
    <div className="text-center mb-6">
      {imageUrl && (
        <img src={imageUrl} alt={name} className="mx-auto h-24 rounded-full object-cover" />
      )}
      <h1 className="text-3xl font-bold mt-4">{name}</h1>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
