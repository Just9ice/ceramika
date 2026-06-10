import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a fly-to-cart animation from a source element to the cart icon
 * @param sourceEl - The element to animate from (usually the product image)
 */
export function animateFlyToCart(sourceEl: HTMLElement | null) {
  if (!sourceEl) return;

  const cartIcon = document.getElementById('cart-icon');
  const cartRect = cartIcon?.getBoundingClientRect();
  if (!cartIcon || !cartRect) return;

  const rect = sourceEl.getBoundingClientRect();
  const clone = sourceEl.cloneNode(true) as HTMLElement;
  
  clone.style.position = 'fixed';
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.zIndex = '9999';
  clone.style.borderRadius = '12px';
  clone.style.pointerEvents = 'none';
  clone.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    clone.style.left = `${cartRect.left}px`;
    clone.style.top = `${cartRect.top}px`;
    clone.style.width = '24px';
    clone.style.height = '24px';
    clone.style.opacity = '0';
  });

  setTimeout(() => clone.remove(), 600);
}
