import { firestore as _firestore } from 'firebase/app'
import 'firebase/firestore'

const createFirestoreLink = ({
  firestore,
}: {
  firestore: _firestore.Firestore
}) => {
  console.log(firestore)
  return undefined
}

export default createFirestoreLink
