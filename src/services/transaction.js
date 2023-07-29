import { addDoc, collection } from 'firebase/firestore/lite';
import { db } from 'firebaseConfig';

export function addTransaction(transaction) {
	const { date, ...rest } = transaction;

	return addDoc(collection(db, 'transactions'), { ...rest, date: date.valueOf() });
}
