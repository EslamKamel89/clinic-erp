import { TText } from "@/shared/components/localization/TText";
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
import { useDeleteCountry } from "../hooks/useDeleteCountry";
import type { Country } from "../types/country.types";

type Props = {
  country: Country;
  onDelete: () => void;
};

export const DeleteButton = ({ country, onDelete }: Props) => {
  const { isPending, mutate } = useDeleteCountry();

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
            <TText ns="p002" k="delete_title" width={12} />
          </AlertDialogTitle>

          <AlertDialogDescription>
            <TText ns="p002" k="delete_confirm" width={20} />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            <TText ns="p002" k="cancel" width={6} />
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
            {isPending ? (
              <TText ns="p002" k="deleting" width={6} />
            ) : (
              <TText ns="p002" k="delete" width={6} />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
