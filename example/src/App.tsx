import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { createFirestoreLink } from 'apollo-link-firestore'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache } from 'apollo-boost'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
})
const firestore = firebase.firestore()
const firestoreLink = createFirestoreLink({ firestore })

const client = new ApolloClient({
  link: firestoreLink,
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="text-xl font-medium text-gray-900">Demo</div>
    </ApolloProvider>
  )
}

export default App
