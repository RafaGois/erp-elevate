import type { ServiceSection } from "@/lib/data/services";

export function SectionBlock({ section }: { section: ServiceSection }) {
  if (section.type === "paragraph") {
    return (
      <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
        {section.text}
      </p>
    );
  }
  if (section.type === "subtitle") {
    return (
      <h3 className="mt-8 text-xl font-semibold text-white md:mt-10 md:text-2xl">
        {section.text}
      </h3>
    );
  }
  if (section.type === "list") {
    return (
      <ul className="mt-4 space-y-3 md:mt-6">
        {section.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 text-lg text-gray-300 md:text-xl"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#bdfa3c]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}
