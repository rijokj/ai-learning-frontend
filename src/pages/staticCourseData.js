// Static data matching your new database structure

// Course document (flat lessons array of IDs)
export const staticCourse = {
  _id: '6860f83bc316eb84de129755',
  title: 'English for beginners',
  language: '685d5483c233da5636a6100a', // If you want language name, add a lookup/staticLanguages object
  level: 'Beginner',
  description: 'blaaah blaaaahh',
  imageUrl: null,
  lessons: ['685eae9a8ed37e968cc542d5', '685eae9a8ed37e968cc542d6'],
  createdAt: 1751185467527,
  __v: 0,
}

// Lessons array (separate from course)
export const staticLessons = [
  {
    _id: '685eae9a8ed37e968cc542d5',
    title: 'Lesson 1: What is a noun?',
    type: 'video',
    duration: '10:00',
    content:
      'A noun is a word used to identify any of a class of people, places, or things.',
    completed: false,
  },
  {
    _id: '685eae9a8ed37e968cc542d6',
    title: 'Lesson 2: What is a verb?',
    type: 'quiz',
    questions: 5,
    content:
      'A verb is a word used to describe an action, state, or occurrence.',
    completed: false,
  },
]
