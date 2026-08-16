'use client';

import * as React from 'react';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

interface ButtonContextValue {
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'secondary' | 'tertiary';
  design?: 'fill' | 'outline';
  disabled?: boolean;
}

interface ButtonProviderProps {
  value: ButtonContextValue;
  children: React.ReactNode;
}

/*
 * ============================================
 * Context
 * ============================================
 */

const ButtonContext = React.createContext<ButtonContextValue | null>(null);

/*
 * ============================================
 * Provider
 * ============================================
 */

/**
 * Shares button presentation options with descendants.
 *
 * Lets compound parts (icons, labels, spinners) pick up size and variant
 * without every one of them taking the same props.
 *
 * @param value - Options to share
 * @param children - Child components to wrap
 */
export function ButtonProvider({ value, children }: ButtonProviderProps) {
  return <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>;
}

/*
 * ============================================
 * Custom Hook
 * ============================================
 */

/**
 * Reads the surrounding button context.
 *
 * @returns The context value, or null when used outside a ButtonProvider
 */
export function useButtonContext() {
  return React.useContext(ButtonContext);
}
