<template>
<div class="chatbot-body">

    <!-- The input -->
    <div class="query">
        <div class="wrapper" v-if="micro == false">
            <i class="material-icons iicon" @click="microphone(true)">mic</i>
            <input :aria-label="config.locale.strings.queryTitle" autocomplete="off" v-model="query" class="queryform" @keyup.enter="submit()" :placeholder="config.locale.strings.queryTitle" autofocus type="text">
            <i class="material-icons iicon t2s" @click="mute(true)" v-if="muted == false">volume_up</i>
            <i class="material-icons iicon t2s" @click="mute(false)" v-else>volume_off</i>
        </div>
        <div class="wrapper" v-else>
            <i class="material-icons iicon recording" @click="microphone(false)">mic</i><input class="queryform" :placeholder="speech" readonly>   
        </div>
    </div>

    <section class="wrapper ai-window">

        <br>
        <br>

        <!-- Display Welcome Message -->
        <div v-if="answers.length == 0 && online == true">
            <h1 class="title mdc-typography--headline">
                <br>
                <br>
                    {{config.locale.strings.welcomeTitle}}

                    <p class="mdc-typography--body2">{{config.locale.strings.welcomeDescription}}</p>
                <div class="material-icons up">arrow_downward</div>
            </h1>
        </div>

        <!-- Display offline message -->
        <div v-if="answers.length == 0 && online == false">
            <h1 class="title mdc-typography--headline">
                <div class="material-icons up">cloud_off</div>
                <br>
                <br>
                    {{config.locale.strings.offlineTitle}}

                    <p class="mdc-typography--body2">{{config.locale.strings.offlineDescription}}</p>
            </h1>
        </div>

        <!-- Chat window -->
        <table v-for="a in answers" class="chat-window">

            <!-- Your messages -->
            <tr>
                <td class="bubble">{{a.result.resolvedQuery}}</td>
            </tr>

            <!-- Dialogflow messages -->
            <tr>
                <td>

                    <!-- Bot message types / Speech -->

                    <div v-if="a.result.fulfillment.speech" class="bubble bot">
                        {{a.result.fulfillment.speech}}
                    </div>

                    <!-- Google Assistant output -->
                    <div v-for="r in a.result.fulfillment.messages">

                        <!-- Bot message types / Card -->

                        <div class="mdc-card" v-if="r.type == 'basic_card'">
                            <img :title="r.image.accessibilityText" :alt="r.image.accessibilityText" class="mdc-card__media-item" :src="r.image.url" v-if="r.image">
                            <section class="mdc-card__primary">
                                <h1 class="mdc-card__title">{{r.title}}</h1>
                                <br>
                                <h2 class="mdc-card__subtitle">{{r.subtitle}}</h2>
                            </section>
                            <section class="mdc-card__supporting-text">
                                {{r.formattedText}}
                            </section>
                            <section class="mdc-card__actions" v-for="button in r.buttons">
                                <a class="mdc-button mdc-button--compact themed mdc-card__action" target="_blank" :href="button.openUrlAction.url">{{button.title}} <i class="material-icons openlink">open_in_new</i></a>
                            </section>
                        </div>

                        <!-- Bot message types / Carousel Card -->

                        <div class="slider" v-if="r.type == 'carousel_card'">
                            <carousel 
                                    :perPage="1" 
                                    :navigationEnabled="true"
                                    :paginationEnabled="false"
                                    navigationNextLabel="<button class='mdc-fab mdc-fab--mini material-icons rightnav'><span class='mdc-fab__icon'>keyboard_arrow_right</span></button>"
                                    navigationPrevLabel="<button class='mdc-fab mdc-fab--mini material-icons leftnav'><span class='mdc-fab__icon'>keyboard_arrow_left</span></button>"
                                    :navigationClickTargetSize="0"
                                    :loop="true">

                                <slide v-for="item in r.items" :key="item.id">
                                    <div class="mdc-card slide">
                                        <img class="mdc-card__media-item" :src="item.image.url" v-if="item.image">
                                        <section class="mdc-card__primary">
                                            <h1 class="mdc-card__title themed" @click="autosubmit(item.optionInfo.key)">{{item.title}}</h1>
                                        </section>
                                        <section class="mdc-card__supporting-text">
                                            {{item.description}}
                                        </section>
                                    </div>
                                </slide>
                            </carousel>
                        </div>

                        <!-- Bot message types / List -->

                        <div class="mdc-list-group mdc-card" v-if="r.type == 'list_card'">
                            <h3 class="mdc-list-group__subheader">{{r.title}}</h3>
                            <ul class="mdc-list mdc-list--two-line mdc-list--avatar-list" v-for="item in r.items" @click="autosubmit(item.optionInfo.key)">
                                <li class="mdc-list-item">
                                    <img :title="item.image.accessibilityText" :alt="item.image.accessibilityText" class="mdc-list-item__start-detail" width="56" height="56" :src="item.image.url" v-if="item.image"/>
                                    <span class="mdc-list-item__text">
                                        {{item.title}}
                                    <span class="mdc-list-item__text__secondary">{{item.description}}</span>
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <!-- Bot message types / Link Chip -->

                        <div v-if="r.type == 'link_out_chip'" class="chips">
                            <a class="suggestion link" :href="r.url" target="_blank">
                                {{r.destinationName}} <i class="material-icons openlink">open_in_new</i>
                            </a>
                        </div>

                        <!-- Bot message types / Suggestion Chip -->

                        <div v-if="r.type == 'suggestion_chips'" class="chips">
                            <div class="suggestion" @click="autosubmit(s.title)" v-for="s in r.suggestions">
                                {{s.title}}
                            </div>
                        </div>

                        <!-- Bot message types / Google Suggestion Chip -->

                        <div v-if="r.unknown == true" class="google-chip chips">
                            <a class="suggestion" :href="'https://www.google.com/search?q=' + r.text" target="_blank">
                                Search for "{{r.text}}" on Google <i class="material-icons openlink">search</i>
                            </a>
                        </div>

                    </div>
                </td>
            </tr>
        </table>

        <br>
        <p class="copyright" v-if="answers.length > 0">Powered by Stack Flood</p>
        <a id="bottom"></a>
    </section>
</div>
</template>

<script>
import { ApiAiClient } from 'api-ai-javascript'
import config from './../chatbot.js'

const client = new ApiAiClient({accessToken: config.app.token}) // <- replace it with yours
export default {
    name: 'app',
    data: function(){
        return {
            answers: [],
            query: '',
            speech: config.locale.strings.voiceTitle,
            micro: false,
            muted: config.app.muted,
            online: navigator.onLine,
            config
        }
    },
    watch: {
        answers: function(val){
            setTimeout(() => { 
                document.querySelector('#bottom').scrollIntoView({ 
                    behavior: 'smooth' 
                })
            }, 2) // if new answers arrive, wait for render and then smoothly scroll down to #bottom selector, used as anchor
        }
    },
    methods: {
        submit(){
            client.textRequest(this.query).then((response) => {
                if(response.result.action == "input.unknown" && this.config.app.googleIt == true){
                    response.result.fulfillment.messages[0].unknown = true
                    response.result.fulfillment.messages[0].text = response.result.resolvedQuery
                } // if the googleIt is enabled, show the button
                this.answers.push(response)
                this.handle(response) // <- handle the response in handle() method
                this.query = ''
                this.speech = config.locale.strings.voiceTitle // <- reset query and speech
            })
        },
        handle(response){
            if(response.result.fulfillment.speech || response.result.fulfillment.messages[0].type == 'simple_response'){
                let speech = new SpeechSynthesisUtterance(response.result.fulfillment.speech || response.result.fulfillment.messages[0].textToSpeech)
                speech.voiceURI = 'native'
                speech.lang = config.locale.settings.speechLang
                if(this.muted == false) window.speechSynthesis.speak(speech) // <- Speech output if microphone is allowed
            }
        },
        autosubmit(suggestion){
            this.query = suggestion
            this.submit()
        },
        mute(mode){
            this.muted = mode
        },
        microphone(mode){
            this.micro = mode
            let self = this // <- correct scope
            if(mode == true){
                let recognition = new webkitSpeechRecognition() // <- chrome speech recognition
                recognition.interimResults = true
                recognition.lang = config.locale.settings.recognitionLang
			    recognition.start()
                recognition.onresult = function(event){
			        for (var i = event.resultIndex; i < event.results.length; ++i){
			    	    self.speech = event.results[i][0].transcript
			        }
			    }
			    recognition.onend = function(){
				    recognition.stop()
                    self.micro = false
                    self.autosubmit(self.speech)
			    }
            }
        }
    }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

.chatbot-body{
  margin: 0;
  background-color: #F5F5F5;
  font-family: 'Roboto', 'Google Sans', sans-serif;
}

.themed{
  color: #FF9800 !important;
}

.wrapper{
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.wrapper.ai-window{
  padding: 1rem;
}

.up{
  font-size: 32px;
  background-color: white;
  padding: 10px;
  border-radius: 50%;
}

.title{
  vertical-align: middle;
  text-align: center;
  font-weight: 700;
  color: rgba(0,0,0,0.7);
  margin-top: 30%;
}

.query{
  padding: 16px 0px;
  background-color: #ddd;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  z-index: 999;
  position: fixed;
  width: 60%;
}

.queryform{
  border: 0;
  width: 100% - 20%;
  margin-left: 60px;
  font-size: 16px;
  outline: none;
  color: rgba(0,0,0,0.8);
  font-weight: 500;
}

@media screen and (max-width: 320px){
  .queryform{
    width: 100% - 35%;
  }
}

.iicon{
  margin-left: 20px;
  position: absolute;
  vertical-align: middle;
  color: rgba(0,0,0,0.8);
  cursor: pointer;
}

.recording{
  color: #F44336;
}

.iicon.t2s{
  margin-left: 10px;
  margin-right: 20px;
}

@media screen and (max-width: 720px){
  .iicon.t2s{
    right: 0;
  }
}

.chat-window{
  width: 100%;
}

.bubble{
  max-width: 300px;
  background-color: #E1E1E1;
  padding: 16px;
  border-radius: 8px;
  color: rgba(0,0,0,0.7);
  float: right;
  animation: msg .25s linear;
}

.bubble.bot{
  background-color: white;
  float: left;
  margin-right: 10px;
}

td{
  margin-top: 30px;
  margin-bottom: 10px;
}

.mdc-card{
  background-color: white;
  max-width: 300px;
  margin-bottom: 5px;
  animation: msg .45s ease-in-out;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(32, 33, 36, 0.28);
}

.slide{
  margin: 5px;
  max-width: 300px;
}

.slider{
  max-width: 300px;
  margin-left: -5px;
}

.mdc-fab{
  background-color: white;
  color: #FF9800;
}

.rightnav{
  margin-left: -25px;
}

@media screen and (max-width: 720px) {
  .rightnav{
    margin-left: -25px;
  }
}

@media screen and (max-width: 320px){
  .rightnav{
    margin-left: -70px;
  }
}

.leftnav{
  margin-right: -25px;
}

@media screen and (max-width: 720px){
  .leftnav{
    display: none;
  }
}

.openlink{
  vertical-align: middle;
  margin-top: -5px;
  margin-left: 5px;
}

.mdc-card__media-item{
  height: auto;
  width: 100%;
  margin-top: -5px;
}

.chips{
  margin-left: -10px;
}

.suggestion{
  margin-top: 10px;
  float: left;
  margin-left: 10px;
  padding: 10px;
  color: rgba(0,0,0,0.7);
  background-color: white;
  border: 1.5px solid rgba(0,0,0,0.2);
  border-radius: 50px;
  cursor: pointer;
  animation: controls .25s linear;
  text-decoration: none;
}

.suggestion:active{
  color: rgba(0,0,0,1);
}

.suggestion:hover{
  color: orange;
  border: 1.5px solid orange;
}

.suggestion.link{
  color: white;
  background-color: orange;
  border: 1px solid orange;
}

.suggestion.link:active{
  background-color: darken(orange, 10%);
  border: 1px darken(orange, 10%) solid;
}

.mdc-list-item__start-detail{
  border-radius: 50%;
}

@keyframes msg{
  0%{
    opacity: 0;
    transform: scale(0.8);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes controls{
  0%{
    transform: scaleY(0);
  }
  100%{
    transform: scaleY(1);
  }
}

.copyright{
  font-weight: 600;
  color: rgba(0,0,0,0.8);
}

.copyright a{
  text-decoration: none;
  color: rgba(0,0,0,0.8);
  border-bottom: 2px solid transparent;
}

.copyright a:hover{
  color: orange;
  border-bottom: 2px solid orange;
}

.google-chip{
  margin-top: 52px;
}

</style>