import React, { useEffect, useState } from 'react';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const FirstPage = () => {
  const [question, setQuestion] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [hunches, setHunches] = useState([]);

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

  const handleOnSubmit = async () => {
    console.log('clicked');
    const result = await addDoc(collection(db, 'test'), {
      question,
      hypothesis,
    });
    console.log('result', result);
  };

  const handleOnChange = (cb) => (e) => {
    cb(e.target.value);
  };

  const handleAddHunch = () => {
    setHunches([...hunches, hypothesis]);

  };

  return (
    <form>
      <label htmlFor="question">What is that you are curious about?</label>
      <input onChange={handleOnChange(setQuestion)} id="question" type="text" />

      <label htmlFor="hypothesis">
        Name one hunch you have that might be true about the topic you are
        curious about
      </label>
      <input
        onChange={handleOnChange(setHypothesis)}
        id="hypothesis"
        type="text"
      />
      {hunches.map((hunch)=>{
        return <p>{hunch}</p>
      })}
      <button onClick={handleAddHunch}>Add another hunch</button>

      <input type="submt" onClick={handleOnSubmit} value="submit" />
    </form>
  );
};

export default FirstPage;
