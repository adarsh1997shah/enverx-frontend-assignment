import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'firebaseConfig';

export function fetchTransactions() {
	return getDocs(collection(db, 'transactions'));
}

export function addTransaction(transaction) {
	const { date, ...rest } = transaction;

	return addDoc(collection(db, 'transactions'), { ...rest, date: date.valueOf() });
}
