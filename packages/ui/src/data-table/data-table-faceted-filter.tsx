import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import type { Column } from "@tanstack/react-table";

import { cn } from "..";
import { Badge } from "../badge";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Separator } from "../separator";
import type { Option } from "./types";

interface DataTableFacetedFilterProps {
  values: string[];
  title?: string;
  options: Option[];
  onValuesChange: (values: string[]) => void;
}

export function DataTableFacetedFilter({ values, onValuesChange, options, title }: DataTableFacetedFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 size-4" />
          {title}
          {values.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {values.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {values.length > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {values.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => values.includes(option.value))
                    .map((option) => (
                      <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12.5rem] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = values.includes(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const newValues = isSelected
                        ? values.filter((value) => value !== option.value)
                        : [...values, option.value];
                      onValuesChange(newValues);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className="size-4" aria-hidden="true" />
                    </div>
                    {option.icon && <option.icon className="mr-2 size-4 text-muted-foreground" aria-hidden="true" />}
                    <span>{option.label}</span>
                    {/* {option.withCount && column?.getFacetedUniqueValues()?.get(option.value) && (
                      <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {column?.getFacetedUniqueValues().get(option.value)}
                      </span>
                    )} */}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {/* {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )} */}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
