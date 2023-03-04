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

  const handleOnSubmit = async (e) => {
    console.log('gello?');
    const formData = new FormData(e.target);
    console.log('foemdata', [...formData.entries()]);
    const result = await addDoc(collection(db, 'test'), {
      question,
      hypothesis: hunches,
    });
    console.log('result', result);
  };

  const handleOnChange = (cb) => (e) => {
    cb(e.target.value);
  };

  const handleAddHunch = (e) => {
    e.preventDefault();
    setHunches((prevState) => [...prevState, hypothesis]);
    setHypothesis('');
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="question">What is that you are curious about?</label>
      <input
        onChange={handleOnChange(setQuestion)}
        id="question"
        name="question"
        type="text"
      />

      <label htmlFor="hypothesis">
        Name as many hunches as you can that might be true about the topic you
        are curious about
      </label>
      {hunches.map((hunch, i) => {
        return <p key={`${hunch}-${i}`}>{hunch}</p>;
      })}
      <input
        onChange={handleOnChange(setHypothesis)}
        id="hypothesis"
        name="hypothesis"
        type="text"
        value={hypothesis}
      />

      <button type="button" onClick={handleAddHunch}>
        Add another hunch
      </button>

      <label>Which hunch do you believe in the most?</label>
      <select id="chosenHypotheis" name="chosenHypotheis">
        {hunches.map((hunch, i) => {
          return <option key={`${hunch}-${i}-${Option}`}>{hunch}</option>;
        })}
      </select>

      <button type="submit" onClick={handleOnSubmit}>
        Submit
      </button>
    </form>
  );
};

export default FirstPage;
