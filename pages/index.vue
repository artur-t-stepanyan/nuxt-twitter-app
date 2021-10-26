<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="default"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-img :src="currentLocale.flagSrc" max-height="25px" max-width="25px"></v-img> {{ currentLocale.title }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(language, index) in languages"
            :key="index"
            @click="$i18n.setLocale(language.id)"
          >
            <v-list-item-icon>
              <v-img :src="language.flagSrc" max-height="25px" max-width="25px"></v-img>
            </v-list-item-icon>
            
            <v-list-item-content>
              {{ language.title }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-text-field
      v-model="search"
        class="mt-3"
        outlined
        :label="$t('tweetsSearch')"
        @keypress.enter="searchTweets"
      ></v-text-field>
    </v-col>

    <template v-if="tweets && tweets.length">
      <h2 class="text-center" style="width:100%">{{$t('SearchResultsFor')}} {{ $route.query.queryString }}</h2>
      <v-col cols="4" v-for="tweet in tweets" :key="tweet.id">
      <Tweet :id="tweet.id" :title="tweet.text" :author="getTweetUser(tweet)" />
    </v-col>
    </template>
    <template v-else>{{ $t('NoTweets') }}</template>
  </v-row>

</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      search: '',
      languages: [
        {
          id: 'en',
          title: 'English',
          flagSrc: 'https://cdn.vuetifyjs.com/images/flags/us.png'
        },
        {
          id: 'fr',
          title: 'French',
          flagSrc: 'https://cdn.vuetifyjs.com/images/flags/fr.png'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      tweets: state => state.Tweet.tweets,
      includes: state => state.Tweet.includes
    }),
    currentLocale() {
      return this.languages.find(language => language.id === this.$i18n.locale);
    }
  },
  async fetch ({store, route}) {
    await store.dispatch('Tweet/fetchTweets', route.query.queryString);
  },
  methods: {
    getTweetUser(tweet) {
      return this.includes.users.find((user) => user.id === tweet.author_id);
    },
    searchTweets() {
      window.location.href = '?queryString=' + this.search
    }
  }
}
</script>
