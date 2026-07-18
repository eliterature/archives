import Card from "../Card"
import PropTypes from 'prop-types'

export default function DownloadsCard({ downloads }: { downloads: any }): JSX.Element {
  return (
    <Card typeId="downloadsCard">
      <h2>Downloads</h2>
      {
        downloads.map((dlData: any, index: number) =>
          <p key={index}><a href={process.env.PUBLIC_URL + `/www/${dlData.url}/${dlData.location}`} id='sourceLink'>{dlData.linkText}</a>
            <br />
            <strong>Description</strong>: {dlData.linkDescription}
            <br />
            <strong>Requirements</strong>: {dlData.requirements}
          </p>
        )
      }
  </Card>)
}

DownloadsCard.propTypes = {
  downloads:PropTypes.array
}