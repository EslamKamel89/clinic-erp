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
import { useLocalization } from "../../../shared/lib/localization/useLocalization";
import { useDeleteCountry } from "../hooks/useDeleteCountry";
import type { Country } from "../types/country.types";

type Props = {
  country: Country;
  onDelete: () => void;
};
export const DeleteButton = ({ country, onDelete }: Props) => {
  const { isPending, mutate } = useDeleteCountry();
  const { t } = useLocalization("p002");

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
          <AlertDialogTitle>{t("delete_title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("delete_confirm")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="" size="">
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            variant=""
            size=""
            disabled={isPending}
            onClick={() => {
              mutate(country.id, {
                onSuccess: () => {
                  onDelete();
                },
              });
            }}
          >
            {isPending ? t("deleting") : t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
