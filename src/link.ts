import { firestore as _firestore } from 'firebase/app'
import 'firebase/firestore'
import { ApolloLink } from 'apollo-boost'

const createFirestoreLink = ({
  firestore,
}: {
  firestore: _firestore.Firestore
}): undefined | ApolloLink => {
  console.log(firestore)
  return undefined
}

export default createFirestoreLink
