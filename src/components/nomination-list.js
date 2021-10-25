import { useState, useEffect } from "react";
import style from "./nomination-list.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const NominationList = ({ nominations, onRemoveNomination, onReorderNomination }) => {


  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const items = [...nominations]
    const [reorderItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderItem)
    onReorderNomination(items)
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.title}>
          <h2 >
            Nomination List
          </h2>
          <span className={style.drag}>Click and drag to reorder nomination</span>
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="nominations" direction="horizontal">
            {
              (provided) => (
                <ul className={style.list} {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    nominations &&
                    nominations.map((movie, index) => {
                      return <Draggable key={movie?.imdbID} draggableId={movie?.imdbID} index={index}>
                        {
                          (provided) => (
                            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                              key={index}
                              style={{ backgroundImage: `url(${movie?.Poster !== 'N/A' ? movie?.Poster : '/default-poster.jpeg'})`, ...provided.draggableProps.style }}
                            >
                              {movie.Title && <>
                                <span>{movie.Title} ({movie.Year})</span>
                                <button onClick={() => onRemoveNomination(movie?.imdbID)}>remove</button>
                              </>
                              }
                            </li>
                          )
                        }

                      </Draggable>

                    }

                    )
                  }
                  {provided.placeholder}
                </ul>
              )
            }

          </Droppable>
        </DragDropContext>

        <button className={style.submit}>Submit Nomination</button>
      </div>
    </>
  )
}

export default NominationList