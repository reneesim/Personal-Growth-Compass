import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const start = { image: `${process.env.PUBLIC_URL}/images/1.svg` };
const questions = [
  { image: `${process.env.PUBLIC_URL}/images/2.svg` },
  { image: `${process.env.PUBLIC_URL}/images/3.svg` },
  { image: `${process.env.PUBLIC_URL}/images/4.svg` },
  { image: `${process.env.PUBLIC_URL}/images/5.svg` },
  { image: `${process.env.PUBLIC_URL}/images/6.svg` },
  { image: `${process.env.PUBLIC_URL}/images/7.svg` },
  { image: `${process.env.PUBLIC_URL}/images/8.svg` },
  { image: `${process.env.PUBLIC_URL}/images/9.svg` },
  { image: `${process.env.PUBLIC_URL}/images/10.svg` }
];

const end = [
  { image: `${process.env.PUBLIC_URL}/images/11.svg` },
  { image: `${process.env.PUBLIC_URL}/images/12.svg` },
  { image: `${process.env.PUBLIC_URL}/images/13.svg` }
];

const learningStyleMapping = ["Visual", "Auditory", "Reading/Writing", "Kinesthetic"];

const Quiz = () => {
  const [questionCount, setQuestionCount] = useState(1);
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [endImageIndex, setEndImageIndex] = useState(0);
  const [learningStyleOutcome, setLearningStyleOutcome] = useState(null);
  const [wellbeingOutcome, setWellbeingOutcome] = useState(null);
  const [workshopRecommendation, setWorkshopRecommendation] = useState(null);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const fetchResults = () => {
    // Commented axios call
    /*
    axios.get('http://localhost:8080/api/quiz/results/summary')
      .then(response => {
        const data = response.data;
        setLearningStyleOutcome(data.learningStyle);
        setWellbeingOutcome(data.wellbeingResults);
        fetchWorkshopRecommendation('Finance', learningStyleMapping[data.learningStyle[0] - 1]);
      })
      .catch(err => {
        setError('Error fetching results.');
      });
    */
    console.log("Fetch results placeholder");
  };

  useEffect(() => {
    if (learningStyleOutcome) {
      console.log('Learning Style Outcome:', learningStyleOutcome);
      const dominantStyle = learningStyleMapping[learningStyleOutcome[0] - 1];
      fetchWorkshopRecommendation('Finance', dominantStyle);
    }
  }, [learningStyleOutcome]);

  const submitLearningStyleAnswer = (option) => {
    // Commented axios call
    /*
    axios.post('http://localhost:8080/api/quiz/answer/learning-style', { option })
      .then(() => {
        setQuestionCount(prevCount => prevCount + 1);
        setAnswer(null);
      })
      .catch(() => {
        setError('An error occurred while submitting your answer.');
      });
    */
    console.log("Submit learning style answer placeholder");
    setQuestionCount(prevCount => prevCount + 1);
    setAnswer(null);
  };

  const submitWellbeingAnswer = (option) => {
    // Commented axios call
    /*
    axios.post('http://localhost:8080/api/quiz/answer/wellbeing', { option })
      .then(() => {
        if (questionCount === 9) {
          setQuizComplete(true);
          fetchResults();
        } else {
          setQuestionCount(prevCount => prevCount + 1);
        }
        setAnswer(null);
      })
      .catch(() => {
        setError('An error occurred while submitting your answer.');
      });
    */
    console.log("Submit wellbeing answer placeholder");
    if (questionCount === 9) {
      setQuizComplete(true);
      fetchResults();
    } else {
      setQuestionCount(prevCount => prevCount + 1);
    }
    setAnswer(null);
  };

  const handleSubmit = () => {
    if (answer !== null) {
      setError(null);
      if (questionCount <= 5) {
        submitLearningStyleAnswer(answer);
      } else if (questionCount <= 9) {
        submitWellbeingAnswer(answer);
      }
    } else {
      setError('Please select an answer.');
    }
  };

  const handleImageClick = () => {
    setEndImageIndex((prevIndex) => (prevIndex + 1) % end.length);
  };

  const optionButtonStyle = (index) => {
    const buttonPositions = {
      1: { top: '37%', left: '10%', width: '80%', height: '10%' },
      2: { top: '43%', left: '10%', width: '80%', height: '10%' },
      3: { top: '49%', left: '10%', width: '80%', height: '10%' },
      4: { top: '55%', left: '10%', width: '80%', height: '10%' },
    };
    return {
      position: 'absolute',
      ...buttonPositions[index],
      backgroundColor: 'rgba(0, 162, 255, 0)',
      border: 'none',
      color: 'transparent',
      fontSize: '1rem',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
      cursor: 'pointer',
      zIndex: 1,
    };
  };

  const fetchWorkshopRecommendation = (interestArea, learningStyle) => {
    // Commented axios call
    /*
    axios.get(`http://localhost:8080/api/quiz/recommendation?interestArea=${interestArea}&learningStyle=${learningStyle}`)
      .then(response => {
        setWorkshopRecommendation(response.data.Recommendation);
      })
      .catch(err => {
        console.error('Error fetching workshop recommendation', err);
      });
    */
    console.log("Fetch workshop recommendation placeholder");
  };

  const renderQuestion = () => {
    const currentImage = questions[questionCount - 1]?.image;
    if (currentImage) {
      return (
        <div style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
          <img
            src={currentImage}
            alt="Question Image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              zIndex: 0,
            }}
          />
          <div style={{ position: 'absolute', top: '0%', left: '0%', width: '100%', height: '100%', zIndex: 1 }}>
            <button onClick={() => { setAnswer(1); handleSubmit(); }} style={optionButtonStyle(1)}>Option 1</button>
            <button onClick={() => { setAnswer(2); handleSubmit(); }} style={optionButtonStyle(2)}>Option 2</button>
            <button onClick={() => { setAnswer(3); handleSubmit(); }} style={optionButtonStyle(3)}>Option 3</button>
            <button onClick={() => { setAnswer(4); handleSubmit(); }} style={optionButtonStyle(4)}>Option 4</button>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderLearningStyleOutcome = () => {
    if (!learningStyleOutcome) return null;
    const dominantStyle = learningStyleMapping[learningStyleOutcome[0] - 1];
    const percentages = learningStyleOutcome.slice(1);
  
    return (
      <div style={{
        position: 'relative',
        top: '-500px',
        left: '0px',
        fontSize: '20px',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
      }}>
        <h4>Dominant Learning Style: {dominantStyle}</h4>
        <p>Visual: {percentages[0]}%</p>
        <p>Auditory: {percentages[1]}%</p>
        <p>Reading/Writing: {percentages[2]}%</p>
        <p>Kinesthetic: {percentages[3]}%</p>
      </div>
    );
  };
  

  const renderWorkshopRecommendation = () => {
    if (!workshopRecommendation) return null;
    return (
      <div style={{ position: 'absolute', top: '65%', left: '10%', fontSize: '1rem', fontFamily: 'Arial, sans-serif', color: 'white' }}>
        <h4>Workshop Recommendation: {workshopRecommendation}</h4>
      </div>
    );
  };

  const renderWellbeingOutcome = () => {
    if (!wellbeingOutcome) return null;
  
    return (
      <div style={{
        position: 'relative',
        top: '-650px',
        left: '510px',
        fontSize: '17px',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        width: '40vw',
      }}>
        {Object.entries(wellbeingOutcome).map(([category, data], idx) => (
          <div key={idx} style={{ marginBottom: '20px' }}>
            <h4>{category}</h4>
            <p>Score: {data["Score"]}</p>
            <p>Recommendation: {data["Recommendation"]}</p>
          </div>
        ))}
      </div>
    );
  };
  

  const renderEndImages = () => {
    const containerStyle = {
      position: 'relative',
      width: '100vw',
      height: '100vh',
    };
  
    if (endImageIndex === 1 && learningStyleOutcome) {
      return (
        <div style={containerStyle}>
          <img 
            src={end[endImageIndex]?.image} 
            alt="Learning Style Outcome" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }} 
            onClick={handleImageClick}
          />
          {renderLearningStyleOutcome()}
          {renderWorkshopRecommendation()}
        </div>
      );
    } else if (endImageIndex === 2 && wellbeingOutcome) {
      return (
        <div style={containerStyle}>
          <img 
            src={end[endImageIndex]?.image} 
            alt="Well-being Outcome" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }} 
            onClick={handleImageClick}
          />
          {renderWellbeingOutcome()}
        </div>
      );
    } else {
      return (
        <div style={containerStyle}>
          <img 
            src={end[endImageIndex]?.image} 
            alt="End Image" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }} 
            onClick={handleImageClick}
          />
        </div>
      );
    }
  };
  
  

  const renderStartImage = () => {
    return (
      <div onClick={startQuiz}>
        <img 
          src={start.image} 
          alt="Start Image" 
          style={{ width: '100vw', height: '100vh', objectFit: 'contain', cursor: 'pointer' }} 
        />
      </div>
    );
  };

  return (
    <div>
      {!quizStarted ? (
        renderStartImage()
      ) : quizComplete ? (
        <div>{renderEndImages()}</div>
      ) : (
        <div>
          {questionCount <= 9 && renderQuestion()}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Quiz;
