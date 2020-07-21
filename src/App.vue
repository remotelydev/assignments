<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        remotelydev chatbot fix
      </div>

      <v-spacer />
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row>
          <ul>
            <li 
              v-for="(message, index) in toChat"
              :class="message.owner" 
              :key="`message-${index}`"
            >
              <span v-if="message.owner === 'me'">{{message.text}}</span>
              <vue-typed-js 
                v-else 
                :strings="[message.text]"
                cursorChar=""
                @onComplete="complete"
              >
                <span class="typing" />
              </vue-typed-js>
            </li>
          </ul>
        </v-row>

        <v-row class="chat-message-row">
          <v-col cols="12" md="12">
            <v-textarea
              filled
              name="input-7-1"
              label="Type your message"
              v-model="input"
              @keydown.enter="send"
            />
          </v-col>
          <v-col cols="12" md="12">
            <div class="my-2">
              <v-btn 
                class="chat-button"
                x-large 
                @click="send" 
                color="primary" 
                dark 
                :disabled="next >= 10"
              >
                {{toChat.length ? 'Send Message' : `Let's chat!`}}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  data: () => ({
    name: '',
    age: 0,
    location: '',
    feeling: '',
    hobby: '',
    next: -1,
    input: '',
    question: '',
    toChat: [],
    messages: [],
    active: true
  }),
  mounted() {
    axios
      .get('/messages.json')
      .then(res => {this.messages = res.data;});
  },
  methods: {
    send() {
      if(!this.active) return
      this.active = false;
      this.toChat.push({
        text: this.input,
        owner: 'me'
      })
      if(this.question) {
        this[this.question] = this.input;
      }
      this.input = '';

      this.next += 1;
    },
    complete() {
      if (typeof this.messages[this.next].ask === 'undefined') {
        this.question = '';
        this.next += 1;
      } else {
        this.question = this.messages[this.next].ask;
      }
      this.active = true;
    }
  },
  watch: {
    next() {
      this.toChat.push(this.messages[this.next])
    }
  }
}
</script>

<style>
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    left: 0;
    right: 0;
    overflow-y: scroll;
    height:600px;
    z-index: 0;
    padding-bottom: 100px;
  }

  ul li{
    display:inline-block;
    clear: both;
    padding: 20px;
    border-radius: 30px;
    margin-bottom: 2px;
    font-family: Helvetica, Arial, sans-serif;
  }

  .chat-message-row {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    z-index: 100;
    background: #ffffff;
  }
  .chat-button {
    position: absolute !important;
    bottom: 0;
    right: 0;
  }

  .him{
    background: #eee;
    float: left;
  }

  .me{
    float: right;
    background: #0084ff;
    color: #fff;
  }

  .him + .me{
    border-bottom-right-radius: 5px;
  }

  .me + .me{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .me:last-of-type {
    border-bottom-right-radius: 30px;
  }
</style>
