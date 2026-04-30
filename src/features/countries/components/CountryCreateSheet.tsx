import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import { useCreateCountry } from "../hooks/useCreateCountry";
import { CountryForm } from "./CountryForm";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CountryCreateSheet = ({ onOpenChange, open }: Props) => {
  const mutation = useCreateCountry();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh]">
        <SheetHeader>
          <SheetTitle>Create Country</SheetTitle>
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
