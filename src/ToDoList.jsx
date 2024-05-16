import { useState } from 'react'

function ToDoList() {
  const [todoList, setTodoList] = useState([])
  const [currentItem, setCurrentItem] = useState({content: '', isChecked: false})

  function addTodoItem() {
    if(currentItem.content) {
      setTodoList(prevState => [...prevState, currentItem])
      setCurrentItem({content: '', isChecked: false})
    }
  }

  function updateCurrentItem(e) {
    const value = e.target.value
    setCurrentItem({content: value, isChecked: false})
  }

  function checkItem(idex) {
    setTodoList(prevList => {
      // const newList = [...prevList]
      // const newItem = {...newList[idex], isChecked: !newList[idex].isChecked}
      // newList[idex] = newItem
      // return newList
      return prevList.map((item, index) => {
        if(index === idex) {
          return {...item, isChecked: !item.isChecked}
        }

        return item
      })
    })
  }

  function removeItem(i) {
    setTodoList(prevList => {
      return prevList.filter((_, index) => index !== i)
    })
  }

  return (
    <div className='todoList'>
      <div>
        <input onChange={e => updateCurrentItem(e)} value={currentItem.content} />
        <button type="button" onClick={addTodoItem}>Add</button>
      </div>
      <div className='todo-list'>
        {todoList.map((item, index) => {
          return (
            <div className='todo-item' key={index}>
              <input type='checkbox' checked={item.isChecked} onChange={() => checkItem(index)} />
              <p>{item.content}</p>
              <button type="button" onClick={() => removeItem(index)}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ToDoList
