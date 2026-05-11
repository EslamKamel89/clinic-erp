import { Button } from "@/components/ui/button";
import { TText } from "../localization/TText";

type Props = {
  onRetry: () => void;
};

export const ErrorState = ({ onRetry }: Props) => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-destructive">
          <TText ns="p001" k="error" width={16} />
        </p>
        <Button variant="outline" onClick={() => onRetry()}>
          <TText ns="p001" k="retry" width={6} />
        </Button>
      </div>
    </div>
  );
};
