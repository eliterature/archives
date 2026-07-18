import { TagData } from "@yaireo/tagify"
import NavigationBar from "../components/Navigation"
import { AppContext, IContext, Layout } from "./HomeScreen"
import tags from "../json/tags.json"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"


type MyProps = {
  navigate?: any;
  searchSets: { [index: string]: Set<string> }
}
type MyState = {
  refs: { [index: string]: any } 
}

class Glossary extends React.Component<MyProps, MyState> {
  references: { [index: string]: any }
  constructor(props: any) {
    super(props)
    this.references = { "default": undefined  }
  }

  // Handle incoming hashes so that we go to the right definition...
  componentDidMount() {
    if (window.location.href.includes('#')) {
      let location = decodeURI(window.location.hash.slice(1))
      if (this.references[location] !== undefined) {
        this.references[location]!.scrollIntoView({
          // optional params
          behavior: 'smooth',
          block: 'start',
          inline: 'center',
        })
      }
    }
  }
  render() {
    return (<div className="elcContainer" id="glossary">
      <div id="glossaryList">
        {tags.map(tag => <React.Fragment key={tag.name}>
          <div className="elcCard">
            <div className='about aboutSubHeader'>
              <a onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                this.props.navigate(`/index#g_${tag.name}`)
              }} ref={node => {
                this.references[tag.name] = node
              }}
                href={`${process.env.PUBLIC_URL}/index#g_${tag.name}`} id={tag.name}>
                {tag.name}</a>
              {/* <a className="referenceHash" href={`${process.env.PUBLIC_URL}/glossary#${tag.name}`} id={tag.name}>
                #
              </a> */}

            </div><p dangerouslySetInnerHTML={{ __html: tag.desc }}></p></div>
        </React.Fragment>)}
      </div>
    </div>) 
  }
}
export default function GlossaryScreen() {
  let tagifyRef = React.createRef() as React.MutableRefObject<Tagify<TagData> | undefined>;
  let navigate=useNavigate()
  // let refs 
  let aContext = useContext(AppContext)
  if (aContext !== undefined) {
    let { search, setSearch, darkMode, setDarkMode, searchSets }: IContext = aContext

    return (
      <Layout setSearch={setSearch} sticky={false} darkMode={darkMode} setDarkMode={setDarkMode} >
        <Layout.Slot name="Header">
          <NavigationBar currentScreen="glossary" tagifyRef={tagifyRef} search={search} setSearch={setSearch} showSearch={false} />
        </Layout.Slot>
        <Layout.Slot name="Body">
          <Glossary navigate={navigate} searchSets={searchSets}></Glossary>
        </Layout.Slot>
      </Layout>
    )
  } else {
    return <></>
  }
}