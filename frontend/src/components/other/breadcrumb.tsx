import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbElement } from "@/interfaces";
import { cn } from "@/lib/utils";

interface Props {
    list: BreadcrumbElement[];
}

export function Breadcrumbs({ list }: Props) {
    return (
        <Breadcrumb className="mb-2">
            <BreadcrumbList>
                {list.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        <BreadcrumbLink
                            href={item.href}
                            className={cn([
                                "!text-slate-600 hover:!text-slate-800",
                                index === list.length - 1 && "!pointer-events-none !text-slate-800 font-medium",
                            ])}
                        >
                            {item.name}
                        </BreadcrumbLink>
                        {index !== list.length - 1 && (
                            <BreadcrumbSeparator className="text-slate-400" />
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
