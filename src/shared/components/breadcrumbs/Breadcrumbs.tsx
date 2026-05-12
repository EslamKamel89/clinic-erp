import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { appRoutes } from "@/features/navigation/routes";
import { Link } from "react-router-dom";

type Props = {
  resourceLabel: React.ReactNode;
  resourceHref: string;
  currentPageLabel: React.ReactNode;
};

export function Breadcrumbs({
  resourceLabel,
  resourceHref,
  currentPageLabel,
}: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={appRoutes.home}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Resource Index */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={resourceHref}>{resourceLabel}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Current Page */}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPageLabel}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
