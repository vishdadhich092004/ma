interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text?: string;
      inlineData?: {
        mimeType: string;
        data: string;
      };
    }>;
  }>;
}

class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
    if (!this.apiKey) {
      console.warn('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
    }
  }

  /**
   * Cleans the response text by removing JSON formatting and timestamps
   * @param text - The raw response text from Gemini API
   * @returns string - Clean text content
   */
  private cleanResponseText(text: string): string {
    // Remove JSON formatting if present
    let cleanedText = text;
    
    // Try to parse as JSON and extract text content
    try {
      const jsonData = JSON.parse(text);
      if (typeof jsonData === 'object') {
        // Look for common text fields in JSON response
        if (jsonData.text) {
          cleanedText = jsonData.text;
        } else if (jsonData.content) {
          cleanedText = jsonData.content;
        } else if (jsonData.transcript) {
          cleanedText = jsonData.transcript;
        } else if (jsonData.message) {
          cleanedText = jsonData.message;
        } else {
          // If no specific text field, stringify and clean
          cleanedText = JSON.stringify(jsonData);
        }
      }
    } catch {
      // Not JSON, continue with original text
    }

    // Remove timestamp patterns (various formats)
    cleanedText = cleanedText
      // Remove ISO timestamps
      .replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?/g, '')
      // Remove timestamp patterns like [00:00:00] or (00:00:00)
      .replace(/\[?\d{1,2}:\d{2}:\d{2}\]?/g, '')
      // Remove timestamp patterns like 00:00 or 00:00.000
      .replace(/\d{1,2}:\d{2}(\.\d{3})?/g, '')
      // Remove JSON-like structures that might contain timestamps
      .replace(/\{[^}]*"time"[^}]*\}/g, '')
      .replace(/\{[^}]*"timestamp"[^}]*\}/g, '')
      // Clean up extra whitespace and newlines
      .replace(/\s+/g, ' ')
      .trim();

    return cleanedText;
  }

  /**
   * Converts speech audio to text using Gemini API
   * @param audioBlob - The audio blob to transcribe
   * @param prompt - Optional custom prompt for transcription
   * @returns Promise<string> - The transcribed text
   */
  async speechToText(audioBlob: Blob, prompt?: string): Promise<string> {
    try {
      if (!this.apiKey) {
        throw new Error('Gemini API key is not configured');
      }

      // Convert audio blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      // Prepare the request
      const requestBody: GeminiRequest = {
        contents: [{
          parts: [
            {
              text: prompt || "Generate a transcript of the speech. Return only the plain text without any formatting, timestamps, or JSON structure."
            },
            {
              inlineData: {
                mimeType: "audio/wav",
                data: base64Audio
              }
            }
          ]
        }]
      };

      // Make API call
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
      }

      const result: GeminiResponse = await response.json();

      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const rawText = result.candidates[0].content.parts[0].text;
        return this.cleanResponseText(rawText);
      } else {
        throw new Error('No transcription received from API');
      }

    } catch (error) {
      console.error('Speech to text error:', error);
      throw new Error(`Failed to transcribe audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Real-time speech transcription with optimized settings
   * @param audioBlob - The audio chunk to transcribe
   * @returns Promise<string> - The transcribed text for this chunk
   */
  async realTimeTranscription(audioBlob: Blob): Promise<string> {
    return this.speechToText(
      audioBlob, 
      "Transcribe this audio segment in real-time. Return only the plain transcribed text without any formatting, timestamps, or additional punctuation unless naturally present in speech."
    );
  }

  /**
   * Final transcription with enhanced accuracy
   * @param audioBlob - The complete audio recording
   * @returns Promise<string> - The final, accurate transcription
   */
  async finalTranscription(audioBlob: Blob): Promise<string> {
    return this.speechToText(
      audioBlob,
      "Generate a complete and accurate transcript of the entire audio recording. Return only the plain text with proper punctuation and formatting, but no timestamps or JSON structure."
    );
  }

  /**
   * Check if the service is properly configured
   * @returns boolean - True if API key is available
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Get the current API key status
   * @returns string - Status message
   */
  getApiKeyStatus(): string {
    if (!this.apiKey) {
      return 'API key not configured';
    }
    return 'API key configured';
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();

// Export the class for testing or custom instances
export { GeminiService }; 