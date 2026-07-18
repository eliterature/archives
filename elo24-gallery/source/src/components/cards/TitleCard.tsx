import Card from "../Card"
import PropTypes from 'prop-types'

export default function TitleCard({ title, author, image, handleShow, children, pdfMode=false }: {title:string, author:string, image: any, handleShow:any, children:any, pdfMode:boolean}): JSX.Element {
  return (<Card typeId="titleCard">
    <h2 id="title">{title}</h2>
      <div id="authorbox">
        <h3 id="author">{author}</h3>
        <img alt="Banner" id="cover" src={image}></img>
      {!pdfMode ? 
        <button id="begin" onClick={handleShow}>Access the Work</button> : undefined
      }
    </div>
    {children}
  </Card>)
}

TitleCard.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.any
}