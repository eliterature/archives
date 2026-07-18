import Card from "../Card"
import PropTypes from 'prop-types'

export default function ArtistCard({ statement, bio }: { statement: string, bio: string }): JSX.Element {
  if (!/<p>.*<\/p>/.test(statement)) {
    statement = `<p>${statement}</p>`
  }
  return (<Card typeId="artistCard">
    <h2>Author(s)</h2>
    <h3>Statement</h3>
    <div id="statementText" dangerouslySetInnerHTML={{ __html: statement }}></div>
    <hr/>
    <h3>Bio</h3>
    <div id="authorbio" dangerouslySetInnerHTML={{ __html: bio }}></div>
  </Card>)
}

ArtistCard.propTypes = {
  statement: PropTypes.string,
  bio: PropTypes.string
}