'use client'
import { ReactNode } from 'react'
import Draggable from 'react-draggable-bottom-sheet'

import styles from './bottom-sheet.module.css'

interface BottomSheetProps {
  children: ReactNode
  close: VoidFunction
  isOpen: boolean
  modalOnDesktop?: boolean
  desktopBreakpoint?: number
  disabled?: boolean
  // onDrag?: DraggableEventHandler;
  onMouseDown?: (e: MouseEvent) => void
  // onStart?: DraggableEventHandler;
  // onBackdropClick?: MouseEventHandler;
  classNames?: {
    bottomSheet?: string
    backdrop?: string
    draggable?: string
    window?: {
      wrap?: string
      content?: string
    }
    dragIndicator?: {
      wrap?: string
      indicator?: string
    }
  }
  styles?: {
    bottomSheet?: React.CSSProperties
    backdrop?: React.CSSProperties
    draggable?: React.CSSProperties
    window?: {
      wrap?: React.CSSProperties
      content?: React.CSSProperties
    }
    dragIndicator?: {
      wrap?: React.CSSProperties
      indicator?: React.CSSProperties
    }
  }
}

export default function BottomSheet({ children, ...props }: BottomSheetProps) {
  return (
    <Draggable
      {...props}
      classNames={{
        bottomSheet: styles.bottom_sheet,
        window: {
          wrap: styles.window_wrap,
        },
        dragIndicator: {
          indicator: styles.drag_indicator,
        },
      }}
    >
      {children}
    </Draggable>
  )
}
