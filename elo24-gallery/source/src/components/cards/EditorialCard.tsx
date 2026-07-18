import { Button, OverlayTrigger, Popover } from "react-bootstrap"
import Card from "../Card"
import { CitationWidget } from "./MetaDataCard"
// import PropTypes from 'prop-types'

export default function EditorialCard({ editorialStatement, work }: { work:any, editorialStatement: string }): JSX.Element {

  // let authors = work.authorDisplayName.replaceAll(/ *\(.*\) */gi, "").split(",")
  let statement = editorialStatement.replaceAll(/<\/?.*?>/ig, "").replaceAll("&", "\\&").replaceAll("$", "\\$")
  // console.log(editorialStatement)
  // console.log(statement)
  let citation = `@incollection{editorialStatement${work.url.replace("-","")}2024,
  author = {Lyle Skains},
  title = {Editorial Statement of '${work.title}'},
  booktitle = {ELO 2024 (Un)Linking - Exhibition},
  abstract = {${statement}},
  year = {2024},
  publisher = {Electronic Literature Organization},
  address = {Washington State University, Vancouver, WA, USA},
  langid = {english},
  url = {${window.location.href}}
}`

  let popover = <Popover>
    <Popover.Header as="h3">Cite this Editorial Statement</Popover.Header>
    <Popover.Body>
      <CitationWidget citeKey={`editorialStatement${work.url.replace("-", "")}2024`} citation={citation} />
    </Popover.Body>
  </Popover>

  return (<Card typeId="editorialCard">
    <h2>Editorial Statement</h2>
    <div id="editorialStatement" dangerouslySetInnerHTML={{ __html: editorialStatement }}></div>
    <p>
      <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose={true}>
        <Button size="sm">Cite</Button>
      </OverlayTrigger>
    </p>
  </Card>)
}
