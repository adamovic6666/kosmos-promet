import { BreadcrumbItem } from "./Breadcrumbs";

export const buildBreadcrumbs = (
  middleCrumbs: BreadcrumbItem[] = [],
  currentPageTitle?: string
): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    { name: "Proizvodi", link: "/prodavnica" },
    ...middleCrumbs,
  ];

  if (currentPageTitle) {
    items.push({ name: currentPageTitle, link: "#" });
  }

  return items;
};
