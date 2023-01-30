'use client'

import { useEffect, useRef, useState } from 'react'
import Microphone from 'remixicon-react/Mic2LineIcon'
import MicrophoneOpen from 'remixicon-react/MicOffFillIcon'

import styles from './mic-input.module.css'

export type MicInputProps = {
  onResult: (transcript: string) => void
}

export default function MicInput({ onResult }: MicInputProps) {
  const [isRecoding, setIsRecoding] = useState(false)
  const recognitionRef = useRef<SpeechRecognition>()

  useEffect(() => {
    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) return
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.interimResults = true
    recognition.lang = 'en-US'

    const handleResult = (e: SpeechRecognitionEvent) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join(' ')

      onResult(transcript)
    }

    const handleEnd = () => {
      recognition.stop()
      setIsRecoding(false)
    }

    recognition.addEventListener('result', handleResult)
    recognition.addEventListener('end', handleEnd)

    recognitionRef.current = recognition

    return () => {
      recognitionRef.current?.stop()
      recognition.removeEventListener('result', handleResult)
      recognition.removeEventListener('end', handleEnd)
    }
  }, [onResult])

  const handleClick = () => {
    if (!recognitionRef.current) return
    if (isRecoding) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
    }

    setIsRecoding((prev) => !prev)
  }

  return (
    <button
      className={styles.icon}
      data-recoding={isRecoding}
      data-icon-right
      data-icon-button
      onClick={handleClick}
      disabled={!recognitionRef.current}
    >
      {isRecoding ? <MicrophoneOpen size="16" /> : <Microphone size="16" />}
    </button>
  )
}
