import React, { useEffect, useState } from 'react';
import { doc, getDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const FirstPage = () => {
  const [question, setQuestion] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [hunches, setHunches] = useState([]);
  const [currentExperiment, setCurrentExperiment] = useState('');
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('db', db);

      // const citiesColfor = collection(db, 'cities');

      const docRef = doc(db, 'test/Z0FlnIQt8QYw4kbbH0Oi');
      const collectionRef = collection(db, 'test');
      const docSnap = await getDocs(collectionRef);

      console.log(
        'snap',
        docSnap.forEach((doc) => {
          console.log('data', doc.data());
        })
      );

      if (docSnap.exists()) {
        docSnap.forEach((doc) => {
          console.log(doc.data());
        });
        console.log('lol');
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };

    fetchData();
  }, []);

  const handleOnSubmit = async (e) => {
    const formData = new FormData(e.target);

    const chosenHypothesis = formData.get('chosenHypotheis');
    const hypotheses = hunches.map((hunch) => {
      if (hunch === chosenHypothesis) {
        return { hypothesis: hunch, possibleExperiments: experiments };
      }

      return { hypothesis: hunch, possibleExperiments: [] };
    });

    const result = await addDoc(collection(db, 'test'), {
      question,
      hypotheses,
      chosenHypotheis: chosenHypothesis,
    });
    console.log('result', result.id);
  };

  const handleOnChange = (cb) => (e) => {
    cb(e.target.value);
  };

  const handleAddHunch = (e) => {
    e.preventDefault();
    setHunches((prevState) => [...prevState, hypothesis]);
    setHypothesis('');
  };

  const handleAddExperiment = (e) => {
    e.preventDefault();
    setExperiments((prevState) => [...prevState, currentExperiment]);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="question">What is that you are curious about?</label>
        <input
          onChange={handleOnChange(setQuestion)}
          id="question"
          name="question"
          type="text"
        />
      </div>

      <div>
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
      </div>

      <div>
        <label>Which hunch do you believe in the most?</label>
        <select id="chosenHypotheis" name="chosenHypotheis">
          {hunches.map((hunch, i) => {
            return <option key={`${hunch}-${i}-${Option}`}>{hunch}</option>;
          })}
        </select>
      </div>

      <div>
        <label htmlFor="experiments">
          What would the world look like if your favorite hunch is true?
        </label>
        {experiments.map((experiment, i) => {
          return <p key={`${experiment}-${i}`}>{experiment}</p>;
        })}
        <input
          id="experiments"
          name="experiments"
          type="text"
          value={currentExperiment}
          placeholder="If my hunch is true, then..."
          onChange={handleOnChange(setCurrentExperiment)}
        />
        <button type="button" onClick={handleAddExperiment}>
          Add experiment
        </button>
      </div>

      <button type="submit" onClick={handleOnSubmit}>
        Submit
      </button>
    </form>
  );
};

export default FirstPage;
