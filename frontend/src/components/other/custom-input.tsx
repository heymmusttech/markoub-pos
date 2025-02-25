import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from "../ui/input"; // Keep this import for the input field

interface Props {
    type?: string;
    name: string;
    form: UseFormReturn<any>;
    label?: string;
    placeholder?: string;
}

// Rename component to avoid conflict
const CustomInput = ({ name, form, label = "", placeholder = "", type = "text" }: Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel className="text-xs !text-gray-700 -mb-1">
                        {label}
                    </FormLabel>
                    <Input
                        {...field} // Spread field props to integrate with react-hook-form
                        type={type}
                        id={name} // Use dynamic id based on name
                        placeholder={placeholder}
                        onChange={(e) => {
                            if (type === "number") {
                                // Convert the string value to a number
                                field.onChange(Number(e.target.value));
                            } else {
                                field.onChange(e.target.value);
                            }
                        }}
                    />
                    <FormMessage className="!m-0 !mt-1 relative" />
                </FormItem>
            )}
        />
    );
};

export default CustomInput;
