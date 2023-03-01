import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const FirstPage = () => {
  const [question, setQuestion] = useState('');
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

  const handleOnClick = () => {
    console.log('clicked');
  };

  const handleOnChange = (e) => {
    setQuestion(e.target.value);
  };

  console.log('quesrion', question);

  return (
    <div>
      <label htmlFor="question">What is that you are curious about?</label>
      <input onChange={handleOnChange} id="question" type="text" />
      <button onClick={handleOnClick}>Send</button>
    </div>
  );
};

export default FirstPage;
