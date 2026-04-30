import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import { useUpdateCountry } from "../hooks/useUpdateCountry";
import type { Country } from "../types/country.types";
import { CountryForm } from "./CountryForm";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  country: Country | null;
};

export const CountryUpdateSheet = ({ open, onOpenChange, country }: Props) => {
  const mutation = useUpdateCountry();
  if (!country) return null;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh]">
        <SheetHeader>
          <SheetTitle>Edit Country</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto px-4">
          <CountryForm
            defaultValues={{
              Notes: country.notes,
              Obj_Name: country.name,
              PhoneCode: country.phoneCode,
            }}
            isLoading={mutation.isPending}
            onSubmit={(data) => {
              data.Notes = data.Notes ?? "";
              mutation.mutate(
                // @ts-expect-error Notes couldn't be undefined
                { id: country.id, payload: data },
                {
                  onSuccess: () => {
                    onOpenChange(false);
                  },
                },
              );
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
