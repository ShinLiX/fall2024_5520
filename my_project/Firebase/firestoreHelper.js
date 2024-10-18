import { collection, addDoc, query } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
import { getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";


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
export async function addWarningToDB(goalId, collectionName) {
	//we are using the updateDoc method because we are adding a new fild to an existing document, instead of 
	//creating a new document. If the document does not exists, it will throw an error instead of creating a new document.
	try {
	  const goalRef = doc(database, collectionName, goalId);
	  await updateDoc(goalRef, {
		warning: true
	  });
	  console.log("Warning added to goal");
	} catch (err) {
	  console.error("Error adding warning to goal: ", err);
	}
  }