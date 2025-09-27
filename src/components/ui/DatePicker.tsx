import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DatePickerProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  id: string;
}

const DatePicker = <T extends FieldValues>({
  name,
  control,
  id,
}: DatePickerProps<T>) => {
  // Create a unique anchor name for each DatePicker instance
  const anchorName = `--${id}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative">
          <button
            type="button"
            popoverTarget={id}
            className="input input-border"
            style={{ anchorName } as React.CSSProperties}
          >
            {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
          </button>
          <div
            id={id}
            popover="auto"
            className="dropdown"
            style={{ positionAnchor: anchorName } as React.CSSProperties}
          >
            <DayPicker
              className="react-day-picker"
              mode="single"
              selected={field.value && !isNaN(new Date(field.value).getTime()) ? new Date(field.value) : undefined}
              onSelect={(date) => {
                field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                // Close the popover after selection
                const popover = document.getElementById(id);
                if (popover) {
                  popover.hidePopover();
                }
              }}
            />
          </div>
        </div>
      )}
    />
  );
};

export default DatePicker;
