import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
function App() {

  const [entry, setEntry] = useState('');
  const [recent, setRecent] = useState('');
  const [words, setWords] = useState([]);

  useEffect(() => {
    const localWords = localStorage.getItem('words');
    if (localWords) {
      setWords(JSON.parse(localWords));
    }
  })

  const handleChange = (event) => {
    const {name, value} = event.target;

    setEntry(value);
  }

  const getLastVowelIndex = (word) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    for (let i = word.length - 1; i >= 0; i--) {
      if (vowels.includes(word[i])) {
        return i;
      }
    }
    return -1;
  }

  const submitWord = () => {
    const index = getLastVowelIndex(entry);
    if (index !== -1) {
      const newWord = entry.slice(0, index) + 'uzz';
      if (!words.includes(newWord)) {
        const localWords = localStorage.getItem('words');
        if (localWords) {
          localStorage.setItem('words', JSON.stringify([...JSON.parse(localWords), newWord]));
        } else {
          localStorage.setItem('words', JSON.stringify([newWord]));
        }

        setWords([...words, newWord]);
        setRecent(newWord);
        setEntry('');
      }

    }

  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        submitWord();
    }
  }

  const clear = () => {
    localStorage.removeItem('words');
    setWords([]);
    setRecent('');
  }

  

  return (
    <>
    <h1 className='title'>Uzz Generator</h1>
    <h2 className='sub-title'>Enter the word you'd like to uzz-ify in the box below:</h2>
    <div className='input-container'>
      <input className='input' type='text' value={entry} onChange={handleChange} placeholder='Enter a word to uzz-ify!' onKeyDown={handleKeyPress}></input>
      <input className='input' type='button' value='Submit' onClick={submitWord}></input>
    </div>
    <h2 className='recent-word'>Recent: {recent || 'None'}</h2>
    <input className='input' type='button' value='Clear History' onClick={clear}></input>
    <div className='word-list-container'>
      {words.map((word) => {
        return <p className='word-list'>{word}</p>
      })}
    </div>
    </>
  );
}

export default App;
