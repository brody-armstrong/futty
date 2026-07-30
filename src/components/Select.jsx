import * as RadixSelect from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'

// Shared Radix Select, styled to match the design system.
// Item values can't be an empty string (Radix reserves it) — callers using an
// "all" option should map their own sentinel value at the call site.
const SIZES = {
  md: 'px-4 py-3 text-base',
  sm: 'px-3 py-2 text-sm',
}

const Select = ({ value, onValueChange, placeholder, options, ariaLabel, size = 'md', className = '' }) => {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-between gap-2 rounded-xl border border-[--border] bg-white text-ink transition-all duration-200 hover:border-pitch/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-pitch/20 focus-visible:border-pitch data-[state=open]:border-pitch data-[state=open]:ring-2 data-[state=open]:ring-pitch/20 ${SIZES[size]} ${className}`}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <ChevronDown size={16} className="text-ink-muted" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className="overflow-hidden rounded-xl border border-[--border] bg-white shadow-xl z-50"
        >
          <RadixSelect.Viewport className="p-1 max-h-72 min-w-[var(--radix-select-trigger-width)]">
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                className="relative flex items-center pl-3 pr-8 py-2 rounded-lg text-sm text-ink cursor-pointer select-none outline-none data-[highlighted]:bg-turf-a data-[state=checked]:bg-pitch/10 data-[state=checked]:text-pitch data-[state=checked]:font-medium"
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="absolute right-3 flex items-center">
                  <Check size={14} />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

export default Select
