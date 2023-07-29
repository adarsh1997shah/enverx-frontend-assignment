import {
	addDoc,
	collection,
	doc,
	getDocs,
	setDoc,
	updateDoc,
} from 'firebase/firestore/lite';
import { db } from 'firebaseConfig';

const TRANSACTIONS = 'transactions';

export function fetchTransactions() {
	return getDocs(collection(db, TRANSACTIONS));
}

export function addTransaction(transaction) {
	const { date, ...rest } = transaction;

	return addDoc(collection(db, TRANSACTIONS), { ...rest, date: date.valueOf() });
}

export function updateTransaction(transaction) {
	const { id, date, ...rest } = transaction;

	const transactionRef = doc(db, TRANSACTIONS, id);

	return setDoc(transactionRef, { ...rest, date: date.valueOf() });
}

export function removeTransaction(transaction) {
	const { id } = transaction;

	const transactionRef = doc(db, TRANSACTIONS, id);

	return updateDoc(transactionRef, {
		isDeleted: true,
	});
}
