type Props = {
  width: number;
  className?: string;
};
export const TextSkeleton = ({ width = 5, className }: Props) => {
  return (
    <span
      className={`inline-block align-middle rounded-md bg-muted animate-pulse text-md text-transparent ${className}`}
      style={{ width: `${width}ch` }}
    >
      .
    </span>
  );
};
