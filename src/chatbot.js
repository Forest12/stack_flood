    export default {
  app: {
      token: "80da0d64a8304b36823074a19ec53434", // <- enter your token here
      muted: false, // <- mute microphone by default
      googleIt: true // <- ask users to google their request, in case of input.unknown action
  },
  locale: {
      strings: {
          welcomeTitle: "안녕하세요 Q&A 챗봇입니다.",
          welcomeDescription: `자주 묻는 질문 1.사용방법 2.내공은 뭔가요? 3.가격정책 중 하나를 질문하세요`,
          offlineTitle: "Oh, no!",
          offlineDescription: "It looks like you are not connected to the internet, this webpage requires internet connection, to process your requests",
          queryTitle: "Ask me something...",
          voiceTitle: "Go ahead, im listening..."
      },
      settings: {
          speechLang: "ko-KR", // <- output language
          recognitionLang: "ko-KR" // <- input(recognition) language
      }
  }
}