export interface CategoryItem {
  code: string;
  name: string;
}

export const CategoryItems: CategoryItem[] = [
  { code: 'BARK', name: 'Barque' },
  { code: 'CATAMARAN', name: 'Catamaran' },
  { code: 'OCEAN_LINER', name: "Paquebot"},
  { code: 'SAILBOAT', name: 'Voilier' },
  { code: 'YACHT', name: 'Yacht' }
]

export const CategoryItemsSorted: CategoryItem[] = CategoryItems.sort((a, b) =>
  a.name.localeCompare(b.name, 'fr')
);
