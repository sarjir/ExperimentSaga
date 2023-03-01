import React, { useEffect } from 'react';
import { doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const FirstPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      console.log('doc', doc);
      console.log('db', db);

      // const citiesColfor = collection(db, 'cities');

      const docRef = doc(db, 'test/Z0FlnIQt8QYw4kbbH0Oi');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <label htmlFor="question">What is that you are curious about?</label>
      <input id="question" type="text" />
    </div>
  );
};

export default FirstPage;
