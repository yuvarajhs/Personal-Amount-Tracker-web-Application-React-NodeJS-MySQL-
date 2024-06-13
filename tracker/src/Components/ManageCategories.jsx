import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function ManageCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [debitList, setDebitList] = useState([]);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:8081/createCategory', { name: categoryName });
      console.log(response);
      
      setCategoryList([...categoryList, { category_name: categoryName }]);
      setCategoryName(' '); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8081/getCategory');
        const data = await response.json();
        setCategoryList(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDebits = async () => {
      try {
        const response = await fetch('http://localhost:8081/getdebits');
        const data = await response.json();
        setDebitList(data);
        
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDebits();
  }, []);

  const [categoryVisibitity, setCategoryVisibitity] = useState('hidden')

  return (
    <>
      <div className='manage-category'>
        <h1>Manage Categories</h1>
        <i class="fa-solid fa-plus" onClick={()=>setCategoryVisibitity('visible')}></i>
        <div className='manage-category-block'>
          {categoryList.map((item, i) => (
            <div className="manage-category-subBlocks" key={i}>
              <h2>{item.category_name}</h2>
              <ul>
                {debitList.map((d_item, d_i) => (
                  d_item.name.includes(item.category_name) && <li key={d_i}>{d_item.name}: <b>{d_item.debit}</b> <span style={{fontSize:'small'}}>{d_item.date}</span> </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={categoryVisibitity}>
          <div className='add-category'>
              <i class="fa-solid fa-xmark" onClick={()=>setCategoryVisibitity('hidden')}></i>
              <form onSubmit={createCategory}>
                <input
                  type="text"
                  placeholder='Enter Category Name'
                  value={categoryName}
                  onChange={e => setCategoryName(e.target.value)}
                />
                  <br /><br /><br />
                  <button>Submit</button>
              </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageCategories;
