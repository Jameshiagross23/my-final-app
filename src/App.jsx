import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid';
import AddCharacter from './Components/AddCharacter';
import _ from 'lodash';
import Character from './Components/Character';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function App() {

  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [gradYear, setGradYear] = useState('');

  useEffect(() => {
    if(localStorage){
      const studentsLocalStorage = JSON.parse(localStorage.getItem('students'));

       if(studentsLocalStorage){
        saveStudents(studentsLocalStorage);
       }
       else{
        saveStudents(students)
       }
    }
  }, []);

  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
    if(localStorage){
      localStorage.setItem('students', JSON.stringify(students));
      console.log('saved to local storage');
    }
  };

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents)
};

  const searchStudents = () => {
    let keywordsArray = [];

    if(keywords){
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if(gradYear){
      keywordsArray.push(gradYear.toString());
    }

    if(keywordsArray.length > 0){
      const searchResults = allStudents.filter(student => {
        for(const word of keywordsArray){
          if(student.firstName.toLowerCase().includes(word) || 
          student.lastName.toLowerCase().includes(word) || 
          student.gradYear === parseInt(word)){
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    }else{
      setSearchResults(allStudents);
    }
  }

  const removeStudent = (studentToDelete) => {
    // console.table(studentToDelete)
     const updatedStudentsArray = allStudents.filter(student => student.id !== studentToDelete.id);
     saveStudents(updatedStudentsArray);
   }

   const updateStudent = (updatedStudent) => {
    //console.table(updatedStudent);
    const updatedStudentsArray = allStudents.map(student => student.id === updatedStudent.id ? {...student, ...updatedStudent} : student)
    saveStudents(updatedStudentsArray);
   }

  
   const students = [{
    id: nanoid(),
    firstName: "Katniss",
    lastName: "Mocking Jay",
    email: "What happened to prim?",
    images:'images/h1.JPG',
    gradYear: 2003

  }, {
    id: nanoid(),
    firstName: "Peeta",
    lastName: "Mocking Jay",
    email: "What happened to Katniss?",
    images:'images/h2.jpg',
    gradYear: 2000
  }, {
    id: nanoid(),
    firstName: "Gale",
    lastName: "Mocking Jay",
    email: "What happened to Peeta?",
    images:'images/h3.jpg',
    gradYear: 2003
  }, {
    id: nanoid(),
    firstName: "Trio",
    lastName: "Mocking Jay",
    email: "What happened to Gale?",
    images:'images/h4.jpg',
    gradYear: 2005
  }, {
    id: nanoid(),
    firstName: "District 12",
    lastName: "Mocking Jay",
    email: "What happened to president Snow?",
    images:'images/h5.jpg',
    gradYear: 2004
  }, {
    id: nanoid(),
    firstName: "Behind the Scenes",
    lastName: "Mocking Jay",
    email: "What happened to District 12 ?",
    images:'images/h6.jpg',
    gradYear: 2003
  }, {
    id: nanoid(),
    firstName: "Mocking Jay",
    lastName: "Mocking Jay",
    email: "What happened to District 13?",
    images:'images/h7.jpg',
    gradYear: 2002
  }, {
    id: nanoid(),
    firstName: "District 13",
    lastName: "Mocking Jay",
    email: "What happened to Katniss's and Peeta's relationship?",
    images:'images/h8.jpg',
    gradYear: 2002
  }, {
    id: nanoid(),
    firstName: "President Snow",
    lastName: "Mocking Jay",
    email: "What happened to Prim's cat?",
    images:'images/h9.jpg',
    gradYear: 2003
  }, {
    id: nanoid(),
    firstName: "Baby Everdeen?",
    lastName: "Mocking Jay",
    email: "What happened to Snow's Old Flame?",
    images:'images/h10.jpg',
    gradYear: 2001
  }];
  

  return (
   

    <div className='container d-flex flex-column'>
       <div className="container-fluid p-5 bg-primary text-white text-center d-flex flex-column">
  <h1>The Evolution of Hunger Games Question and Answer Forum!</h1>
  <p>Ask your questions below, or view and read answered questions </p> 
</div>

      <div className='row' id='allStudents'>
        <h3>Current Character Questions:(Maybe your question was already answered)</h3>
        {searchResults && searchResults.map((student) =>
        (      <div className='col-lg-2'key={student.id}>
               <Character student={student} removeStudent={removeStudent} updateStudent={updateStudent} />
              
      </div>)
        )}
 <div>
               <AddCharacter addStudent={addStudent}/>
               </div>
      </div>
     
      {/*!allStudents && <button type="button" className='btn btn-lg btn-success' onClick={() => saveStudents(students)}>Save Students</button>*/}
      
      <div className='row mt-4' id='searchStudent'>
        <h3>Search Character Questions:</h3>
        <div className='col-md-4'>
          <label htmlFor='txtKeyworkds'class='text-white'>Search by Character Name</label>
          <input type='text' className='form-control' placeholder='Character Name' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords}/>
        </div>
        <div className='col-md-4'>
          <select value={gradYear} onChange={evt => setGradYear(evt.currentTarget.value)} className='form-select'>
            <option value=''>Select Release Year</option>
            {_(allStudents).map(student => student.gradYear).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}          </select>
        </div>
        <div className='col-md-4'>
          <button type='button' className='btn btn-primary' onClick={searchStudents}>Search Characters<FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </div> 
    </div>
  )
}

export default App
