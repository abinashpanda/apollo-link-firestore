# apollo-link-firestore

`apollo-link-firestore` provides a simple way to fetch data from `firebase` using `graphql`. This library is influenced from the [apollo-link-firebase](https://github.com/Canner/apollo-link-firebase) library.

## Usage

### Getting Started

#### Installation

To install `apollo-link-firestore` use

```bash
npm install apollo-link-firestore --save
```

or

```
yarn add apollo-link-firestore
```

#### Setup

To use `apollo-link-firestore` in your `react` app, first create a firestore link using `createFirestoreLink` as shown below

```tsx
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { createFirestoreLink } from 'apollo-link-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  // firebase configuration
})
const firestore = firebase.firestore()
const firestoreLink = createFirestoreLink({ firestore })

const client = new ApolloClient({
  link: firestoreLink,
  cache: new InMemoryCache(),
})

const App = () => {
  return <ApolloProvider client={client}>{/* Your App */}</ApolloProvider>
}
```

**Firestore data**

```json
{
  "users": {
    "id1": {
      "name": "John Doe",
      "posts": ["postId1", "postId2"]
    },
    "id2": {
      "name": "Jeff Dean",
      "posts": ["postId3", "postId4"]
    }
  },
  "posts": {
    "postId1": {
      "title": "Hello World",
      "image": "https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    "postId2": {
      "title": "Hello Again",
      "image": "https://images.unsplash.com/photo-1516331353724-f5169be07164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    "postId3": {
      "title": "Foo Bar Foo",
      "image": "https://images.unsplash.com/photo-1471965187167-4a4c69ae4707?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    "postId4": {
      "title": "Bar Foo Bar",
      "image": "https://images.unsplash.com/photo-1482112048165-dd23f81c367d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    }
  }
}
```

### Queries

```tsx
import { gql } from 'apollo-boost'

const USER_QUERY = gql`
  query User($userId) {
    user @firestore(collection: "users", doc: $userId) {
      id @key
      name
      posts @firestore(collection: "posts") {
        id @key
        title
        image
      }
    }
  }
`

const Profile = ({ userId }) => {
  const { loading, data, error } = useQuery(USER_QUERY, {
    variables: { userId },
  })

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (data) {
    return (
      <div>
        <div>{data.user.name}</div>
        {data.user.posts.map((post) => (
          <div key={post.id}>
            <img src={post.image} />
            <div>{post.title}</div>
          </div>
        ))}
      </div>
    )
  }

  return null
}
```

### Mutations

### Subscriptions

## Integration with `apollo-codegen`

## Contributing

### Setup

To run the example, use

```bash
yarn dev
```

and in another terminal

```bash
cd example && yarn start
```
