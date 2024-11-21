import { collection, addDoc, query } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";


export async function writeToDB(data, collectionName) {
	try {
	     const docRef = await addDoc(collection(database, collectionName), data);
         console.log("Document written with ID: ", docRef.id);
	  }
	catch (err) {
	    console.log(err)
	  }
	}

 

	export async function deleteFromDB(id, collectionName) {
		try { 
		  await deleteDoc(doc(database, collectionName, id));
		}
		catch (err) {
		  console.log(err)
		}
	  }

export async function deleteAllFromDB(collectionName) {
	try {
	  const querySnapshot = await getDocs(collection(database, collectionName));
	  querySnapshot.forEach((docSnapshot) => {
	    deleteFromDB(docSnapshot.id, collectionName);
	  });
	}
	catch (err) {
	  console.log(err)
	}
}

export async function readAllDocs(collectionName){
	try {
	  const querySnapshot = await getDocs(collection(database, collectionName));
	  let data = [];
	  querySnapshot.forEach((docSnapshot) => {
	    data.push(...docSnapshot.data());
	  });
	  return data;
	}
	catch (err) {
	  console.log(err)
	}

}

export async function updateDB(id, data, collectionName) {
	try {
	  await setDoc(doc(database, collectionName, id), data);
	}
	catch (err) {
	  console.log(err)
	}
}

export async function readDoc(id, collectionName) {
	try {
	  const docSnap = await getDoc(doc(database, collectionName, id));
	  if (docSnap.exists()) {
	    console.log("Document data:", docSnap.data());
		return docSnap.data();
	  } else {
	    console.log("No such document!");
		return null;
	  }
	}
	catch (err) {
	  console.log(err)
	}
}