import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import { useLocalization } from "../../../shared/lib/localization/useLocalization";
import { useCreateCountry } from "../hooks/useCreateCountry";
import { CountryForm } from "./CountryForm";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CountryCreateSheet = ({ onOpenChange, open }: Props) => {
  const mutation = useCreateCountry();
  const { t } = useLocalization("p002");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh]">
        <SheetHeader>
          <SheetTitle>{t("create_title")}</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto px-4">
          <CountryForm
            isLoading={mutation.isPending}
            onSubmit={(data) => {
              data.Notes = data.Notes ?? "";
              // @ts-expect-error Notes couldn't be undefined
              mutation.mutate(data, {
                onSuccess: () => {
                  onOpenChange(false);
                },
              });
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
