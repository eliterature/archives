import Card from "../Card"
import PropTypes from 'prop-types'
import preserveCase from "../../json/preserveCase.json" 
// import { ReactElement } from "react"
import { categories } from "../../screens/HomeScreen"
import { useNavigate } from "react-router-dom"
import { Button, Popover, OverlayTrigger, Tabs, Tab } from "react-bootstrap"
// import {  createSemicolonClassElement } from "typescript"
function spliceSlice(str:string, index:number, count:number, add:string) {
  // We cannot pass negative indexes directly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index
    if (index < 0) {
      index = 0
    }
  }

  return str.slice(0, index) + (add || "") + str.slice(index + count)
}
let CopyIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
  </svg>
}
// import tags from "../../json/tags.json"
function tagify(tag:string, preserve:boolean = false) {
  if (!preserveCase.includes(tag) && !preserve) {
    return tag.trim().toLowerCase()
  } else {
    return tag.trim()
  }
}

export function CitationWidget({ citation, citeKey }: { citation: any, citeKey: string }): JSX.Element {
  // const Cite = require('citation-js')
  // let templateName = 'mla'        // let config = Cite.plugins.config.get('csl')
  require('@citation-js/plugin-csl')
  const { Cite, plugins, util } = require('@citation-js/core')
  let bibtex = require('@citation-js/plugin-bibtex')
  const mla = util.fetchFile('https://www.zotero.org/styles/modern-language-association')
  const chicago = util.fetchFile('https://www.zotero.org/styles/chicago-author-date')
  let config = plugins.config.get("@csl")
  config.templates.add('mla', mla)
  config.templates.add('chicago', chicago)
  config.templates.add('bibtex', bibtex)
  // config.templates//.source.doi = "DOI"
  const btConfig = plugins.config.get('@bibtex')
  btConfig.constants.fieldTypes.doi = ["field", "literal"]
  let example = new Cite(citation, config)
  // Cite.plugins.add()
  let mlaoutput = example.format('bibliography', {
    format: 'html',
    template: 'mla',
    lang: 'en-US'
  })
  let mlatext = example.format('bibliography', {
    format: 'text',
    template: 'mla',
    lang: 'en-US'
  })
  let chicagooutput = example.format('bibliography', {
    format: 'html',
    template: 'chicago',
    lang: 'en-US'
  })
  let chicagotext = example.format('bibliography', {
    format: 'text',
    template: 'chicago',
    lang: 'en-US'
  })
  let output = example.format('bibliography', {
    format: 'html',
    template: 'apa',
    lang: 'en-US'
  })
  let text = example.format('bibliography', {
    format: 'text',
    template: 'apa',
    lang: 'en-US'
  })
  let bibtexOutput = example.format('bibtex')
  bibtexOutput = spliceSlice(bibtexOutput, bibtexOutput.lastIndexOf("}"), 0, `  doi = {${example.data[0].DOI}}\n`)
  const downloadTxtFile = () => {
    const element = document.createElement("a")
    const file = new Blob([bibtexOutput], {
      type: "text/plain"
    })
    element.href = URL.createObjectURL(file)
    element.download = `${citeKey}2022.bib`
    document.body.appendChild(element)
    element.click()
  };
  return (<>
    <Tabs defaultActiveKey="apa" id="uncontrolled-tab-example" className="mb-3" variant="pills">
      <Tab eventKey="mla" title="mla">
        <p style={{position:"relative"}}>
    <span dangerouslySetInnerHTML={{ __html: mlaoutput }}></span>
    <Button className="btn-secondary" style={{ fontSize: "0.8em", paddingTop: "0px", paddingBottom: "0px", position: "absolute", right: "90px", bottom: "10px" }}
            size="sm" onClick={() => { navigator.clipboard.writeText(mlatext) }}><CopyIcon/></Button>
    <Button className="btn-secondary" style={{ fontSize: "0.8em", paddingTop: "0px", paddingBottom: "0px", position: "absolute", right: "30px", bottom: "10px" }}
      size="sm" onClick={downloadTxtFile}>BibTeX</Button>
        </p>
      </Tab>
      <Tab eventKey="apa" title="apa">
        <p style={{ position: "relative" }}>
    <span dangerouslySetInnerHTML={{ __html: output }}></span>
    <Button className="btn-secondary" style={{ fontSize: "0.8em", paddingTop: "0px", paddingBottom: "0px", position: "absolute", right: "90px", bottom: "10px" }}
      size="sm" onClick={() => { navigator.clipboard.writeText(text) }}><CopyIcon/></Button>
    <Button className="btn-secondary" style={{ fontSize: "0.8em", paddingTop: "0px", paddingBottom: "0px", position: "absolute", right: "30px", bottom: "10px" }}
      size="sm" onClick={downloadTxtFile}>BibTeX</Button>
      </p>
      </Tab>
      <Tab eventKey="chicago" title="chicago">
        <p style={{ position: "relative" }}>
        <span dangerouslySetInnerHTML={{ __html: chicagooutput }}></span>
    <Button className="btn-secondary" style={{ fontSize: "0.8em", paddingTop: "0px", paddingBottom: "0px", position: "absolute", right: "90px", bottom: "10px" }}
      size="sm" onClick={() => { navigator.clipboard.writeText(chicagotext) }}><CopyIcon/></Button>
    <Button className="btn-secondary" style={{ fontSize: "0.8em", paddingTop: "0px", paddingBottom: "0px", position: "absolute", right: "30px", bottom: "10px" }}
      size="sm" onClick={downloadTxtFile}>BibTeX</Button>
      </p>
      </Tab>
    </Tabs>
      </>
      )
}

export default function MetaDataCard({ work }: { work: any }): JSX.Element {
  let navigate = useNavigate()
  function extract(categoryId:any, tags: any, preserve: boolean = false) {
    return tags
      .trim()
      .split(",")
      .map((tag: string, index: number) => {
        return<a
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            navigate(`/index#${categoryId}_${tagify(tag, preserve)}`)
          }}
          key={index} href={`index#${categoryId}_${tagify(tag, preserve)}`}>{tagify(tag, preserve)}</a>
      })
      .reduce((prev: any, curr: any) => [prev, "; ", curr])
  }
  // let workRegex = /([^(),]+(?:\(.+?\))?)(:?, )?/g
  let collabs
  /*if (work.slug !== "ringing-the-changes" && work.slug !== "the-infinite-woman" && work.collaborators !== undefined) {
    collabs = [...work.collaborators
      .matchAll(workRegex)]
      .map(c => c[1])
      .map((elem: any, index: number): ReactElement<any, any> => {
        let newElem = elem.match(/(.+)( \(.*\))/)
        if (newElem == null) {
          newElem = ["", elem, ""]
        }
        return (<span key={index}>
          <span dangerouslySetInnerHTML={{ __html: newElem[1] }} />
          <i dangerouslySetInnerHTML={{ __html: newElem[2] }} />
        </span>)
      })
      .reduce((prev: any, curr: any, index: number): any => [prev, '; ', curr])
  } else {*/
    collabs = <span dangerouslySetInnerHTML={{__html:work.collaborators}}/>
  //}
  let authors = work.authorDisplayName.replaceAll(/ *\(.*\) */gi, "").split(",")
  let authorMap = authors.map((a:any) => {
    let as = a.split(" ")
    return { family: as[as.length - 1], given: as.slice(0, as.length - 1).join(" ") }
  })
  let abstract = work.descriptionOfWork
// console.log(abstract)
  // title = {${work.title},
  let today = new Date()
  let citation = {
    type: "chapter",
    id: `${authorMap[0].family}2024`,
    "container-title": `ELO 2024 (Un)Linking - Exhibition`,
  author: authorMap,
  "collection-title": "Electronic Literature Collection",
    editor: [
      { family: "Skains", given: "Lyle" }, 
      { family: "Cox", given: "Daniel" },
      { family: "Edgar", given: "PD" },
      { family: "Finch", given: "Ricky" },
      { family: "Shier", given: "Mike" }
    ],
    title: work.title,
  "issued": {
    "date-parts": [[2024]]
  },
  publisher: "Electronic Literature Organization",
  abstract: abstract,
  address: "University of Central Florida, Orlando, Florida, USA",
  langid: "en-US",
    accessed: {
      "date-parts": [[today.getFullYear(), today.getMonth(), today.getDate()]]
    },
    "original-date": { "date-parts": [[work.year]] },
  URL: window.location.href
}
  let popover = <Popover>
    <Popover.Header as="h3">Cite this work</Popover.Header>
    <Popover.Body>
    {<CitationWidget citeKey={authorMap[0].family} citation={citation} />}
    </Popover.Body>
    </Popover>
  // console.log(output)
  return (<Card typeId="metadataCard">
  <h2>Metadata</h2>
  <div id="keywords">
      <p>Author(s): {work.authorDisplayName} </p>
    {/*}.split(", ")
        .map((elem: any, index: number) => <span key={index}><a onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/index#${elem}`) }}  href={`${process.env.PUBLIC_URL}/index#${elem}`}>{elem}</a></span>)
    .reduce((prev:any, curr:any) => [prev, '; ', curr])}*/}
 
  {work.collaborators === "" ? undefined :
    <p>Collaborator(s): {collabs}
    </p>}
    {categories.map(category => 
      !work[category.id] || work[category.id]
        .split(",").length === 0 ? undefined
        : <p key={category.id} >{category.label}: <span style={{ color: "black" }}>
          {extract(category.pre, work[category.id], category.preserve)}
        </span></p>
      )}
      <p>Year: <span style={{ color: "black" }}>{work.year}</span></p>
      <p>
      <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose={true}>
          <Button size="sm" >Cite</Button>
      </OverlayTrigger>
      </p>
    </div>
  </Card>)
}

MetaDataCard.propTypes = {
  work: PropTypes.any
}