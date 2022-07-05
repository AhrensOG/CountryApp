import React from "react";
import { useDispatch } from "react-redux";
import { deleteActivity } from "../actions";
import s from './Styles/DeleteActivity.module.css'


export default function DeleteActivity({id}) {
  const dispatch = useDispatch()

  const handleDelete = (e) => {
    dispatch(deleteActivity(id))
    alert('Delete activity succesfully')
    window.location.reload()

  }

  return (
    <button className={s.btn} onClick={e => handleDelete(e)}> Delete Activity </button>
  )
}