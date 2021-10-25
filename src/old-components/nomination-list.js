const NominationList = ({ nominationList, handleRemoveClick }) => {
  return (
    <div>
      Nomination List {nominationList && nominationList.length ? nominationList.length : ''}
      <ul>
        {nominationList ? (
          nominationList.map((x, i) => <li key={i}>{x}
            <button onClick={() => handleRemoveClick(x)}>Remove</button>
          </li>)
        ) : ''
        }

      </ul>
    </div>
  )
}

export default NominationList;