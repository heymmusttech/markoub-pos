"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

interface Props {
    name: string;
    form: UseFormReturn<any>;
    label?: string,
    data?: { value: string, label: string }[],
    className?: string,
}

export function Combobox({ name, form, label = "", data = [], className }: Props) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className={cn(["flex flex-col gap-1 w-full", className])}>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel className="text-xs !text-gray-700 -mb-1">{label}</FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild className="w-full">
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                >
                                    {field.value
                                        ? data.find((item) => item.value === field.value)?.label
                                        : "Select..."}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0 mt-1" align="start">
                                <Command>
                                    <CommandInput placeholder="Search..." />
                                    <CommandList>
                                        <CommandEmpty>No items found.</CommandEmpty>
                                        <CommandGroup>
                                            {data.map((item) => (
                                                <CommandItem
                                                    key={item.value}
                                                    value={item.value}
                                                    // onSelect={(currentValue) => {
                                                    //     setValue(currentValue === value ? "" : currentValue)
                                                    //     setOpen(false)
                                                    // }}
                                                    onSelect={(item) => {
                                                        field.onChange(item);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {item.label}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            field.value === item.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage className='!m-0 !mt-1 relative' />
                    </FormItem>
                )}
            />
        </div>
    )
}
