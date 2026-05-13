import { Trash2 } from "lucide-react";
import { useDeleteDoctor } from "../hooks/useDeleteDoctor";
import type { Doctor } from "../types/doctor.types";

import { Button } from "@/components/ui/button";
import { TText } from "@/shared/components/localization/TText";

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
} from "@/components/ui/alert-dialog";
type Props = {
  doctor: Doctor;
  onDelete?: () => void;
};
export const DeleteDoctorButton = ({ doctor, onDelete }: Props) => {
  const deleteMutation = useDeleteDoctor();
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
            <TText ns="p009" k="delete_title" width={12} />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <TText ns="p009" k="delete_confirm" width={30} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <TText ns="p009" k="cancel" width={8} />
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteMutation.isPending}
            onClick={async (e) => {
              e.preventDefault();

              await deleteMutation.mutateAsync(doctor.id);

              onDelete?.();
            }}
          >
            <TText
              ns="p009"
              k={deleteMutation.isPending ? "deleting" : "delete"}
              width={10}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
