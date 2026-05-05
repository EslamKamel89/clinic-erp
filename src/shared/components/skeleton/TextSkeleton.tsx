type Props = {
  width: number;
  className?: string;
};
export const TestSkelton = ({ width, className }: Props) => {
  return (
    <span
      className={`inline-block rounded-md bg-muted animate-pulse ${className}`}
      style={{ width: `${width}ch` }}
    ></span>
  );
};
