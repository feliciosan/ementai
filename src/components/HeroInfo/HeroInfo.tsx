import Image from "next/image";

export default function HeroInfo({
  titleStart,
  titleEndColored,
  description,
}: {
  titleStart: string;
  titleEndColored: string;
  description: string;
}) {
  return (
    <div className="">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
        {titleStart}
        <span className="text-teal-600"> {titleEndColored}</span>
      </h1>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="flex">
        <Image
          src="/mock-hero.png"
          alt="Menu online Ementai"
          width={620}
          height={620}
        />
      </div>
    </div>
  );
}
