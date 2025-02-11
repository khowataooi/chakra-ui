import { For, SegmentGroup } from "@chakra-ui/react"
import { forwardRef } from "react"

interface Item {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface SegmentControlProps extends SegmentGroup.RootProps {
  items?: Array<string | Item>
}

function normalize(items: Array<string | Item>): Item[] {
  return items.map((item) => {
    if (typeof item === "string") return { value: item, label: item }
    return item
  })
}

export const SegmentControl = forwardRef<HTMLDivElement, SegmentControlProps>(
  function SegmentControl(props, ref) {
    const { items, ...rest } = props
    const data = normalize(items ?? [])

    return (
      <SegmentGroup.Root ref={ref} {...rest}>
        <SegmentGroup.Indicator />
        <For each={data}>
          {(item) => (
            <SegmentGroup.Item value={item.value} disabled={item.disabled}>
              <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          )}
        </For>
      </SegmentGroup.Root>
    )
  },
)
