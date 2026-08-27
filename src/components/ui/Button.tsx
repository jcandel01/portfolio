import type { ReactNode } from 'react'

/**
 * Three grammars and nothing in between (DESIGN.md "Buttons"):
 *   primary   pill, Action Blue      the one true CTA
 *   secondary ghost pill             the second CTA when two sit together
 *   utility   rounded-sm, near-black compact nav actions
 *
 * Only default, active/pressed and focus-visible are styled. DESIGN.md's
 * iteration guide says never document hover.
 */

type Variant = 'primary' | 'secondary' | 'utility' | 'large'

const VARIANT: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary-pill',
  utility: 'btn-utility',
  large: 'btn-large',
}

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  /** Renders an anchor instead of a button. */
  href?: string
  onClick?: () => void
  external?: boolean
  className?: string
  'aria-label'?: string
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  external = false,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = `${VARIANT[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  )
}
