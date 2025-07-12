import { useState, useEffect } from 'react'

export const useLessonData = (courseId) => {
  const [lessonData, setLessonData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Default lesson data - always returns this data even if no courseId
        const mockLessonData = {
          title: 'Introduction to Machine Learning',
          level: 'Beginner',
          estimatedTime: '15 minutes',
          points: 100,
          steps: [
            {
              type: 'passage',
              title: 'What is Machine Learning?',
              content: `
                <p>Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed. Unlike traditional programming where rules are hardcoded, machine learning algorithms improve through experience.</p>
                
                <p>The basic process of machine learning involves:</p>
                
                <ol>
                  <li><strong>Data Collection:</strong> Gathering relevant data for the task at hand.</li>
                  <li><strong>Data Preprocessing:</strong> Cleaning and transforming data into a suitable format.</li>
                  <li><strong>Model Selection:</strong> Choosing an appropriate algorithm for the task.</li>
                  <li><strong>Training:</strong> Feeding data to the algorithm so it can learn patterns.</li>
                  <li><strong>Evaluation:</strong> Testing how well the model performs on new data.</li>
                  <li><strong>Deployment:</strong> Using the trained model in real applications.</li>
                </ol>
                
                <p>Machine learning is used in various applications including recommendation systems, image recognition, spam filtering, and predictive analytics.</p>
                
                <h4>Types of Machine Learning</h4>
                
                <p>There are three main types of machine learning:</p>
                
                <ul>
                  <li><strong>Supervised Learning:</strong> The algorithm learns from labeled data, trying to predict outcomes for new inputs.</li>
                  <li><strong>Unsupervised Learning:</strong> The algorithm finds patterns in unlabeled data without predefined outputs.</li>
                  <li><strong>Reinforcement Learning:</strong> The algorithm learns by interacting with an environment, receiving rewards or penalties.</li>
                </ul>
                
                <p>As you progress through this course, you'll explore these different types in more detail and learn how to implement them in practical scenarios.</p>
              `,
            },
            {
              type: 'mcq',
              title: 'Multiple Choice Question',
              question:
                'Which of the following is NOT a type of machine learning?',
              options: [
                'Supervised Learning',
                'Unsupervised Learning',
                'Reinforcement Learning',
                'Programmatic Learning',
              ],
              correctAnswer: 3,
              explanation:
                "The three main types of machine learning are Supervised Learning, Unsupervised Learning, and Reinforcement Learning. 'Programmatic Learning' is not a standard type of machine learning.",
            },
            {
              type: 'cloze',
              title: 'Fill in the Blanks',
              question:
                'In machine learning, the process of _______ involves cleaning and transforming data into a suitable format, while _______ is the stage where the algorithm learns patterns from data.',
              blanks: [
                {
                  options: [
                    'data preprocessing',
                    'model selection',
                    'data collection',
                    'evaluation',
                  ],
                  correctAnswer: 'data preprocessing',
                },
                {
                  options: [
                    'deployment',
                    'training',
                    'testing',
                    'preprocessing',
                  ],
                  correctAnswer: 'training',
                },
              ],
              explanation:
                'Data preprocessing involves cleaning and transforming data, while training is when the algorithm learns patterns from the data.',
            },
            {
              type: 'truefalse',
              title: 'True or False',
              questions: [
                {
                  statement:
                    'Machine learning algorithms require explicit programming for every decision they make.',
                  correctAnswer: false,
                  explanation:
                    'Machine learning algorithms learn from data without being explicitly programmed for every decision.',
                },
                {
                  statement:
                    'Supervised learning uses labeled data to train models.',
                  correctAnswer: true,
                  explanation:
                    'Supervised learning does indeed use labeled data, where the algorithm learns to associate inputs with known outputs.',
                },
                {
                  statement:
                    'Data collection is not an important step in the machine learning process.',
                  correctAnswer: false,
                  explanation:
                    'Data collection is a critical first step in the machine learning process, as the quality and quantity of data significantly impacts model performance.',
                },
              ],
            },
            {
              type: 'completion',
              title: 'Lesson Complete!',
              content:
                "Congratulations! You've completed the introduction to machine learning. You now understand the basic concepts and types of machine learning.",
            },
          ],
        }

        setLessonData(mockLessonData)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching lesson data:', err)
        setError(new Error('Failed to load lesson data. Please try again.'))
        setIsLoading(false)
      }
    }

    fetchData()
  }, [courseId]) // courseId is still in dependency array for future use

  return { lessonData, isLoading, error }
}
