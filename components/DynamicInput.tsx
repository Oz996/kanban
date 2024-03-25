import Image from "next/image";
import Cross from "@/assets/icon-cross.svg";
import CrossError from "@/assets/Icon-cross-error.svg";

interface props {
  handleRemove: any;
  index: number;
  error: string;
}

export default function DynamicInput({ handleRemove, index, error }: props) {
  if (error)
    return (
      <Image
        onClick={() => handleRemove(index)}
        className="cursor-pointer"
        src={CrossError}
        height={15}
        width={15}
        alt="Cross icon error"
      />
    );

  return (
    <Image
      onClick={() => handleRemove(index)}
      className="cursor-pointer"
      src={Cross}
      height={15}
      width={15}
      alt="Cross icon"
    />
  );
}
