import {
  useLocalization,
  type Namespace,
} from "@/shared/lib/localization/useLocalization";
import { TextSkeleton } from "../skeleton/TextSkeleton";

type Props = {
  ns: Namespace;
  k: string;
  width?: number;
  className?: string;
};

export const TText = ({ ns, k, width, className = "text-md" }: Props) => {
  const { t, isLoading } = useLocalization(ns);

  if (isLoading) {
    return <TextSkeleton width={width ?? 5} className={className} />;
  }

  return <>{t(k)}</>;
};
