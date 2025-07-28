import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Mic, Loader2 } from 'lucide-react'
import { RiVoiceprintFill } from "react-icons/ri"
import manfoldinghands from "../media/manfoldinghands.png"
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { geminiService } from '@/services/geminiService'
import { cn } from "@/lib/utils"

function FeedbackPage() {
  const [feedback, setFeedback] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recordingError, setRecordingError] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Feedback submitted:', feedback)
    toast.success('Feedback submitted successfully')
    setFeedback('')
  }

  const startRecording = async () => {
    try {
      setRecordingError('')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        setIsProcessing(true)
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
          await convertSpeechToText(audioBlob)
        } catch (error) {
          setRecordingError('Failed to process audio. Please try again.')
          console.error('Speech to text error:', error)
        } finally {
          setIsProcessing(false)
        }
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      setRecordingError('Microphone access denied. Please allow microphone access and try again.')
      console.error('Microphone error:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  const convertSpeechToText = async (audioBlob: Blob): Promise<void> => {
    try {
      const transcribedText = await geminiService.speechToText(audioBlob)
      setFeedback(prev => prev + (prev ? ' ' : '') + transcribedText)
    } catch (error) {
      console.error('Speech to text error:', error)
      setRecordingError('Failed to transcribe audio. Please try again or check your API key.')
      
      // Fallback to simulated text for demo purposes
      const fallbackText = "This is a fallback message. Please ensure your Gemini API key is configured correctly."
      setFeedback(prev => prev + (prev ? ' ' : '') + fallbackText)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-black">
      {/* Dot Background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      
      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
              Feedback
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              We'd love to hear from you
            </p>
          </div>

          {/* Image and Text Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {/* Image Section */}
              <img src={manfoldinghands} alt="Man Folding Hands" className="w-32 h-32 md:w-48 md:h-48 mx-auto lg:w-64 lg:h-64" />   

            {/* Text Section */}
            <div className="flex flex-col justify-center">
              <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                {/* Speech bubble tail */}
                <div className="absolute -left-3 top-8 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-50 dark:border-r-gray-800"></div>
                
                {/* Conversation icon */}
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-black dark:text-white">
                    Share Your Thoughts
                  </h2>
                </div>
                
                               <div className="space-y-3 text-gray-700 dark:text-gray-300">
                   <p>
                     Your feedback helps us improve and create better experiences. 
                     We value every suggestion and insight you share.
                   </p>
                   <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                     <span>We respond within 24 hours</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-black dark:text-white mb-2">
                  Your Feedback
                </label>
                <div className="relative">
                  <Textarea
                    id="feedback"
                    placeholder="Tell us what you think, what we can improve, or any issues you've encountered..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-32 resize-none pr-12"
                    required
                  />
                  <div className={`absolute transition-all duration-300 ease-in-out ${
                    isRecording 
                      ? 'bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2' 
                      : 'bottom-3 right-3'
                  }`}>
                    {isProcessing && !isRecording && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    )}
                    <Button
                      type="button"
                      onClick={toggleRecording}
                      disabled={isProcessing}
                      className={`rounded-full transition-all duration-300 ease-in-out ${
                        isRecording 
                          ? 'p-6 bg-blue-500 hover:bg-blue-600 text-white shadow-lg scale-110' 
                          : 'p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                      title={isRecording ? 'Stop recording' : 'Start voice recording'}
                    >
                      {isRecording ? (
                        <RiVoiceprintFill className="w-8 h-8 animate-pulse" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                {recordingError && (
                  <p className="text-sm text-red-500 mt-2">{recordingError}</p>
                )}
                {isRecording && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-red-500">Recording... Click the microphone to stop</span>
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                disabled={!feedback.trim() || isRecording || isProcessing}
              >
                <Send className="w-4 h-4" />
                Submit Feedback
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default FeedbackPage