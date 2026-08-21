import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const Icon = ({ children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
)

export const BagIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 9V6a3 3 0 0 1 6 0v3" />
  </Icon>
)

export const MenuIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
)

export const CloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Icon>
)

export const ArrowIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14M14 7l5 5-5 5" />
  </Icon>
)

export const PlusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
)

export const MinusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14" />
  </Icon>
)

export const SlidersIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 6h8M16 6h4M14 4v4M4 12h3M11 12h9M9 10v4M4 18h10M18 18h2M16 16v4" />
  </Icon>
)

export const LeafIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20 4C11 4 5 8 5 14c0 3 2 5 5 5 6 0 10-6 10-15Z" />
    <path d="M4 20c3-5 7-8 12-11" />
  </Icon>
)

export const CheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 12 4 4L19 6" />
  </Icon>
)

export const TruckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
  </Icon>
)
