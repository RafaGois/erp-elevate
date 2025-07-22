import { FormField, FormLabel, FormMessage } from "@/components/ui/form"

import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormItem } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form";
import { EquipamentExit } from "@/lib/models/EquipamentExit";
import { Equipament } from "@/lib/models/Equipament";

interface InputMultiCheckboxProps {
    items: Equipament[],
    form: UseFormReturn<EquipamentExit>
}

/* function teste(items: Equipament[]) {
  return items.map((item) => {
    return {
      id: item.uid,
      label: item.name
    }
  })
} */

export default function InputMultiCheckbox(props: InputMultiCheckboxProps) {
    return (
        <FormField
        control={props.form.control}
        name="equipaments"
        render={() => (
          <FormItem>
            {props.items.map((item) => (
              <FormField
                key={item.uid}
                control={props.form.control}
                name="equipaments"
                render={({ field }) => {
                  console.log(field);
                  return (
                    <FormItem
                      key={item.uid}
                      className="flex flex-row items-center gap-2"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.some((equipament) => equipament.uid === item.uid)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.uid])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: Equipament) => value.uid !== item.uid
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.name}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    
  )
}

