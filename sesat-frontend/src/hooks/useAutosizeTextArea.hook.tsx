import { useEffect } from 'react'

// Updates the height on value update.
export const useAutosizeTextArea = (textAreaRef: HTMLTextAreaElement | null, value: string) => {
  useEffect(() => {
    // make sure that textAreaRef exists
    if (textAreaRef) {
      // We need to reset the height first to get the correct scrollHeight for the textarea
      textAreaRef.style.height = '0px'
      const { scrollHeight } = textAreaRef

      // Now we set the height directly
      textAreaRef.style.height = `${scrollHeight}px`
    }
  }, [textAreaRef, value])
}