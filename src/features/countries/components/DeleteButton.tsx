import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { TextSkeleton } from "../../../shared/components/skeleton/TextSkeleton";
import { useLocalization } from "../../../shared/lib/localization/useLocalization";
import { useDeleteCountry } from "../hooks/useDeleteCountry";
import type { Country } from "../types/country.types";

type Props = {
  country: Country;
  onDelete: () => void;
};

export const DeleteButton = ({ country, onDelete }: Props) => {
  const { isPending, mutate } = useDeleteCountry();
  const { t, isLoading: localeLoading } = useLocalization("p002");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {localeLoading ? <TextSkeleton width={12} /> : t("delete_title")}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {localeLoading ? <TextSkeleton width={20} /> : t("delete_confirm")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            {localeLoading ? <TextSkeleton width={6} /> : t("cancel")}
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={() => {
              mutate(country.id, {
                onSuccess: () => {
                  onDelete();
                },
              });
            }}
          >
            {localeLoading ? (
              <TextSkeleton width={6} />
            ) : isPending ? (
              t("deleting")
            ) : (
              t("delete")
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
