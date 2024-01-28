import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Divider: React.FC<Props> = ({...props}) => {
  return (
    <div {...props} />
  )
}

export default Divider