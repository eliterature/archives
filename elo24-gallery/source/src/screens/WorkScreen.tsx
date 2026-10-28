import { useCallback, useContext, useEffect, useState } from "react"
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import ArtistCard from "../components/cards/ArtistCard"
// import ArtistCard from "../components/cards/ArtistCard"
// import DownloadsCard from "../components/cards/DownloadsCard"
import EditorialCard from "../components/cards/EditorialCard"
import MetaDataCard from "../components/cards/MetaDataCard"
import TitleCard from "../components/cards/TitleCard"
import { copyrights } from "../images/images"
import { AppContext, IContext, Layout } from "./HomeScreen"
//import worksDownload from '../json/worksDownload.json'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { traversalVideoUrl } from '../utils/traversalVideoUrl'
const renderTooltip = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    Toggle increased contrast mode
  </Tooltip>
)

export default function Work({ work, setDarkMode } : { work: any, setDarkMode: any }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);
  let [searchParams] = useSearchParams()
  let navigate = useNavigate();
  // Build archive links.
  const archiveLinks = () => {
    let output = <></>;

    // Is there one or more archive links?
    if(work.archive !== "") {
      // If there is only one, return it.
      // (If there is only one, it will not contain "," in the string.)
      if(work.archive.indexOf(",") === -1){
        output = (
          <a className="beginLink" key={1} rel="noopener noreferrer" href={`https://projects.cah.ucf.edu/mediaartsexhibits/elo2024/${work.archive}`} target="_blank">Archive</a>
        );
      } else {
        // Split the archive links into an array based on comma + space delimiter.
        let archiveLinks = work.archive.split(", ");

        // Return the links
        output = archiveLinks.map((link: any, index:number) => <a className="beginLink" key={index} rel="noopener noreferrer" href={`https://projects.cah.ucf.edu/mediaartsexhibits/elo2024/${link}`} target="_blank">Archive Part {index + 1}</a>)
      }
    }

    // Return generated output or an empty fragment.
    return output;
  };

  let videoLinks = () => {
   return (
        <p>
          <h2 className="center">Archive Recording</h2>
          <hr />
          <video style={{ "textAlign": "center" }} controls width="100%">
            <source src={traversalVideoUrl(work.id, "webm")} type="video/webm" />
            <source src={traversalVideoUrl(work.id, "mp4")} type="video/mp4" />
          </video>
        </p>
      );
  };

  let beginLinks = <></>
  let beginLinksSrc = work.externalUrl ? ([{ "displayText": `Work Website`, link: work.externalUrl }].concat(work.beginLinks??[])) : work.beginLinks ?? []
  if (beginLinksSrc && beginLinksSrc.length > 0) {      //if links to begin exist, add them
    beginLinks = <>{beginLinksSrc.map((link: any, index:number) => <a className="beginLink" key={index} rel="noreferrer" href={link.link} target="_blank">{link.displayText}</a>)}</>
      //if it's not an external link, add ./ so it goes to correct directory
  }
  //TODO: FIX DOWNLOADS
  //work.downloads = worksDownload.filter(workDownload => workDownload.slug === work.slug)
  useEffect(() => {
    // if()
    // window.scrollTo({ top: 0, left: 0 })
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 })
    }
    , 50)
  }, [])
  let handleSwitch = useCallback((e: any) => {
    if (e.target.checked) {
      // console.log("Dark")
      document.documentElement.setAttribute('data-theme', 'dark')
      setDarkMode(true)
    }
    else {
      // console.log("Light")
      document.documentElement.setAttribute('data-theme', 'light')
      setDarkMode(false)
    }
  }, [setDarkMode])
  let aContext = useContext(AppContext)
    if(aContext !== undefined) {
    let { search, setSearch, darkMode }: IContext = aContext
    return (<>
      <Helmet>
        <title>{work.title} - ELO 2024 (Un)linked: Exhibition</title>
        <link rel="canonical" href={`${window.location.href}`}></link>
        <meta property="description" content={`'${work.title}' is part of the ELO 2024 (Un)linked: Exhibition.`} />
        <meta name="citation_publication_date" content="2024" />
        <meta name="citation_online_date" content={work.year} />
        <meta name="citation_available_date" content={work.year} />
        <meta name="citation_editors" content="Salter, A; Murray, John T.; Skains, Lyle; Cox, D." />
        <meta name="citation_abstract" content={work.curatorialStatement} />
        <meta name="citation_publisher" content="Electronic Literature Organization" />
        <meta name="citation_public_url" content={window.location.href} />
        <meta name="citation_language" content="English" />
        <meta name="citation_inbook_title" content="ELO 2024 (Un)linked: Exhibition" />
        <meta name="citation_extra" content={`original-date: ${work.year}`} />
        <meta name="citation_title" content={work.title} />
        <meta name="citation_authors" content={work.authorDisplayName} />
        <meta name="citation_keywords" content={work.creatorKeywords !== undefined ? work.creatorKeywords.split(", ").join("; ") : ""} />
        <meta name="DC.Title" content={`${work.title} in the ELO 2024 (Un)linked: Exhibition`} />
        <meta name="DC.Date.Created" content={work.year} />
        <meta name="DC.Format" content={work.format} />
        <meta name="DC.Publisher" content="Electronic Literature Organization" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="book_section" />
        <meta property="og:title" content={work.title} />
        <meta property="og:description" content={`${work.title} is part of the ELO 2024 (Un)linked: Exhibition. Click to access it and its supplementary materials.`} />
        <meta property="og:image" content={`${process.env.PUBLIC_URL}/images/works/banner/${work.slug}-banner.png`} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@eliterature" />
        <meta property="twitter:title" content={`'${work.title}'`} />
        <meta property="twitter:description" content={`'${work.title}' is part of the ELO 2024 (Un)linked: Exhibition. Click to access it and its supplementary materials.`} />
        <meta property="twitter:image" content={`${process.env.PUBLIC_URL}/images/works/banner/${work.slug}-banner.png`} />
      </Helmet>
      <Layout search={search} setSearch={setSearch}>
        <Layout.Slot name="Header">
        </Layout.Slot>
        <Layout.Slot name="Body">
          <Modal size="lg" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>{work.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <center>
               { videoLinks() }
              </center>
              { work.instructions !== "" ? <><hr /><h2 className="center">Instructions</h2><hr /><p dangerouslySetInnerHTML={{ __html: work.instructions}}></p> <hr /></> : <></> }
              <h2 className="center">Links</h2>
              <a className="beginLink" key={0} rel="noopener noreferrer" href={work.url} target="_blank">Online</a>
              { archiveLinks() }
            </Modal.Body>
            <Modal.Footer><button onClick={handleClose}>close</button></Modal.Footer>
          </Modal>
          <div id="cardHolder">
            <TitleCard pdfMode={searchParams.get("pdf") !== null} title={work.title} handleShow={handleShow} author={work.authorDisplayName} image={`${process.env.PUBLIC_URL}/images/works/cover/${work.slug}-cover.png`}>
              {searchParams.get("pdf") !== null ?
                [work.instructions !== undefined ? <><p><strong>Instructions: </strong></p>{work.instructions}</> : undefined,
                  beginLinks] : undefined
              }
            </TitleCard>
            <ArtistCard statement={work.descriptionOfWork} bio={work.creatorBiography} />
            <MetaDataCard work={work}></MetaDataCard>
            <EditorialCard work={work} editorialStatement={work.curatorialStatement} />
            {/*work.downloads.length !== 0 ? <DownloadsCard downloads={work.downloads} /> : undefined*/}
          </div>
        </Layout.Slot>
        <Layout.Slot name="Footer">
          <div id="footer">
            <div className="elcCard" id="copyrightInfo" style={{ display: "flex", justifyContent: "space-evenly" }}>
              {work.workLicense !== undefined && work.workLicense !== "" ?
                <div style={{ margin: "0px" }}>Work: <div style={{ display: "inline-block" }} id="workLicense">
                  {copyrights[work[`workLicense`]] !== undefined ?
                    <a id="workCopyright" rel="noreferrer" href={copyrights[work[`workLicense`]].slug}
                      target="_blank"
                    ><img src={copyrights[work[`workLicense`]].image} alt="Work Copyright" /></a> :
                    <p>{work[`worksLicense`]} </p>}
                </div></div> : undefined}
              {work.docsLicense !== undefined && work.docsLicense !== "" ?
                <div style={{ margin: "0px" }}>Docs: <div style={{ display: "inline-block" }} id="docsLicense">
                  {copyrights[work[`docsLicense`]] !== undefined ?
                    <a
                      id="docsCopyright" rel="noreferrer" href={copyrights[work[`docsLicense`]].slug}
                      target="_blank"
                    ><img src={copyrights[work[`docsLicense`]].image} alt="Docs Copyright" /></a> :
                    <p>{work[`docsLicense`]} </p>}
                </div></div> : undefined}
              Electronic Literature Organization, 2024. <br />University of Central Florida, Orlando, FL USA
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <div className="theme-switch-wrapper">
                  <img style={{ height: "30px", marginBottom: "-8px", marginTop: "-8px", marginRight: "10px" }} src={require("../images/darkmode_light.png")} alt="Accessibility Mode"></img>
                  <label className="theme-switch" htmlFor="checkbox">
                    <input type="checkbox" id="checkbox" onChange={handleSwitch} checked={darkMode} />
                    <div className="slider round">
                    </div>
                  </label>
                </div>
              </OverlayTrigger>
            </div>
            <div className="returnButton"><a href={`${process.env.PUBLIC_URL}/`} onClick={e => { e.preventDefault(); e.stopPropagation(); navigate("/", { replace: true }) }}>Return</a></div>
          </div>
        </Layout.Slot>
      </Layout>
    </>
    )
  } else {
    return <></>
  }
}