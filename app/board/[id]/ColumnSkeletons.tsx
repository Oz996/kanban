import { Skeleton } from "@/components/ui/skeleton";

export default function ColumnSkeletons() {
  return (
    <section className="flex gap-7">
      <div className="w-[17.5rem] rounded flex flex-col gap-4">
        <Skeleton className="w-[6rem] h-[1.5rem] mb-5" />
        <Skeleton className="w-[17.5rem] h-[5rem]" />
        <Skeleton className="w-[17.5rem] h-[5rem]" />
        <Skeleton className="w-[17.5rem] h-[5rem]" />
      </div>
      <div className="w-[17.5rem] rounded flex flex-col gap-4">
        <Skeleton className="w-[6rem] h-[1.5rem] mb-5" />
        <Skeleton className="w-[17.5rem] h-[5rem]" />
        <Skeleton className="w-[17.5rem] h-[7rem]" />
      </div>
    </section>
  );
}
