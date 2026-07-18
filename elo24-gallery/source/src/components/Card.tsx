export default function Card({children, typeId}:{children:any, typeId:string}): JSX.Element {
  return (
    <div id={typeId} className="elcCard">
      {children}
    </div>
  )
}