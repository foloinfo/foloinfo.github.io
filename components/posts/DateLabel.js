
import { formatDistanceToNow } from 'date-fns'

const DateLabel = ({
  datetime
})=> {

  const date = new Date(datetime).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
  const timeago = formatDistanceToNow(
    new Date(datetime), { addSuffix: true }
  )

  return(
    <div
      style={{
        textAlign: 'right',
        color: '#454545',
        fontSize: '0.9rem',
        marginRight: '0.5rem',
      }}
    >
      <div>
        {date}
      </div>
      <div>
        {timeago}
      </div>
    </div>
  )
}

export default DateLabel
