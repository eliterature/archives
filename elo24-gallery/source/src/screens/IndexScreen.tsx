import { TagData } from "@yaireo/tagify"
import React, { createRef, useContext } from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import NavigationBar from "../components/Navigation"
import { Layout, categories, AppContext, IContext } from "./HomeScreen"
import works from "../json/works.json"
// import tags from "../json/tags.json"
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap"


type MyProps = {
  works: any,
  keywordSets: { [index: string]: Set<string> },
  navigate?: any,
}

type MyState = {
  filter: string,
  worksByAuthorSet: Set<string>
}
interface indexable {
  [key: string]: any
}
// let scrolled=false
class IndexComponent extends React.Component<MyProps, MyState> {
  title: any;
  author: any;
  platform: any;
  genreKeywords: any;
  authoringLanguages: any;
  format: any;
  //genreKeywords: any;
  creatorNationality: any;
  creatorKeywords: any;
  workLanguage: any;
  geographicalOriginOfWork: any;
  references: { [index: string]: any };
  constructor(props: any) {
    super(props)
    this.references = { "default": undefined }
    this.author = createRef()
    this.title = createRef()
    this.genreKeywords = createRef()
    this.platform = createRef()
    this.authoringLanguages = createRef()
    this.format = createRef()
    //this.genreKeywords = createRef()
    this.creatorNationality = createRef()
    this.creatorKeywords = createRef()
    this.workLanguage = createRef()
    this.geographicalOriginOfWork = createRef()
    
    let curState: MyState = { filter: "",
      worksByAuthorSet: new Set<string>()
    }
    works.forEach(({ authorDisplayName }) => (authorDisplayName ?? "").split(", ").forEach(author => {
      if (author !== "" && author !== " ") {
        curState.worksByAuthorSet.add(author)
      } else {

      }
    }))
    this.state = curState
  }
  // Handle incoming hashes so that we go to the right definition...
  componentDidMount() {
    if (window.location.href.includes('#')) {
      let location = decodeURI(window.location.hash.slice(1)).toLocaleLowerCase()
      if (this.references[location] !== undefined) {
        setTimeout(() => {
          window.scrollTo(0, this.references[location].offsetTop-80)
        }
          , 50)
      }
    }
  }
  render() {
    return (<>
    <div className="elcContainer" id="glossary">
      <Navbar sticky="top" bg="light" expand="lg" style={{ width: "94%",margin:"px", borderRadius: "5px" }}>
      <Container>
            <Navbar.Brand href="#home" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0, 0) }}>Index</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#author" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0,this.author.current.offsetTop-64) } }>Author</Nav.Link>
            <Nav.Link href="#title" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0,this.title.current.offsetTop-64) } }>Title</Nav.Link>
                <Nav.Link href="#genre" onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log(this.genreKeywords);  window.scrollTo(0, this.genreKeywords.current.offsetTop - 64) }}>Genre</Nav.Link>
            <NavDropdown title="Technical" id="contentDropdown">
              <Nav.Link href="#platform" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0, this.platform.current.offsetTop - 64) }}>Platform</Nav.Link>
              <Nav.Link href="#authoringLanguages" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0, this.authoringLanguages.current.offsetTop - 64) }}>Authoring Languages</Nav.Link>
              <Nav.Link href="#format" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0, this.format.current.offsetTop - 64) }}>Format</Nav.Link>
            </NavDropdown>
              {/*<Nav.Link href="#genreKeywords" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0, this.genreKeywords.current.offsetTop - 64) }}>Author-Defined Keywords</Nav.Link>*/}
            <NavDropdown title="Identity" id="identityDropdown">
              <Nav.Link href="#creatorNationality" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0, this.creatorNationality.current.offsetTop - 64) }}>Nationality</Nav.Link>
              <Nav.Link href="#creatorKeywords" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0, this.creatorKeywords.current.offsetTop - 64) }}>Identity</Nav.Link>
              <Nav.Link href="#language" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0, this.workLanguage.current.offsetTop - 64) }}>Work Language</Nav.Link>
              <Nav.Link href="#geographicalOriginOfWork" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.scrollTo(0, this.geographicalOriginOfWork.current.offsetTop - 64) }}>Geographical Origin of Work</Nav.Link>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        <Form>
          <Form.Control size="lg" type="text"
            placeholder="Filter terms..." value={this.state.filter}
            onChange={e => { this.setState({ filter: e.target.value }) }}
            autoFocus={true}>
          </Form.Control>
          </Form>
      </Container>
    </Navbar>
        <div id="glossaryList">
          <div className="elcCard elcContainer" ref={this.author}>
              <div className='about aboutSubHeader'>
              <span id="author">WORKS BY AUTHOR</span>
              </div>
            {Array.from(this.state.worksByAuthorSet)
              .filter((author: any) => new RegExp(this.state.filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i").test(author))
              .sort((author1, author2) => author1.toLocaleLowerCase().localeCompare(author2.toLocaleLowerCase()))
              .map(author => {
                let authReg = new RegExp(author.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
                    return <React.Fragment key={author}>
                      <h3 ref={node => {
                        // console.log(`Assigning ${keyword}`)
                        // eslint-disable-next-line react/no-direct-mutation-state
                        if (node) {
                          this.references[author.toLocaleLowerCase()] = node
                        }
                      }}>{author.toUpperCase()}</h3>
                    <ul>
                        {

                          works.filter(({ authorDisplayName }) => {
                            return authorDisplayName !== undefined ? authReg.test(authorDisplayName) : false
                          })
                            .map((wrk, index) => {
                              return <li key={index}><a onClick={(e: any) => {
                                e.stopPropagation()
                                e.preventDefault()
                                this.props.navigate(`/${wrk.slug}`)
                              }} href={process.env.PUBLIC_URL + `/${wrk.slug}`}>{wrk.title}</a> by {wrk.authorDisplayName}</li>
                            })
                        }
                  </ul>
                    </React.Fragment>
                  })
                }

          </div>
          <div className="elcCard elcContainer" ref={this.title}>
              <div className='about aboutSubHeader'>
              <span id="author">WORKS BY TITLE</span>
              </div>
            {works.filter(wrk => wrk.title !== undefined && new RegExp(this.state.filter, "i").test(wrk.title))
              .sort((wrkA: any, wrkB: any) => wrkA.title.toLowerCase().localeCompare(wrkB.title.toLowerCase()))
              .map(({ title, slug }, index) => {
                return (
                  <a key={index} href={process.env.PUBLIC_URL + `/${slug}`} onClick={(e: any) => {
                    e.stopPropagation()
                    e.preventDefault()
                    this.props.navigate(`/${slug}`)
                  }}
>
                      <h3 ref={node => {
                        // console.log(`Assigning ${keyword}`)
                        // eslint-disable-next-line react/no-direct-mutation-state
                        if (node) {
                          this.references[title!.toLocaleLowerCase()] = node
                        }
                      }}>{title!.toUpperCase()}</h3>
                      </a>
                      )
                  })
                }
          </div>
          {categories.map((cat: { id: string, label: string, pre: string }) => {
            console.log(cat.id)
            if (this.props.keywordSets[cat.id] === undefined) { console.log("undefined");  return undefined } else {
              let regex = new RegExp(this.state.filter, "i")
              console.log(Array.from(this.props.keywordSets[cat.id]));
              let keywords = Array.from(this.props.keywordSets[cat.id])
                .filter((kw: string) => regex.test(kw))
                .sort((k1: string, k2: string) => (k1.toLowerCase().localeCompare(k2.toLowerCase())))
              return keywords.length > 0 ? <React.Fragment key={cat.id}>
                <div className="elcCard elcContainer" ref={(this as indexable)[cat.id]}>
                  <div className='about aboutSubHeader'>
                    <span id={cat.id}>{cat.label}</span>
                  </div>
                  {
                    keywords
                      .map((keyword: any, index: number) => {
                        let regexpression = `^${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`
                        let rex = new RegExp(regexpression, "i")
                        let worksFound = this.props.works.filter((work: any) => {
                          // console.log(cat.id)
                          if (work[cat.id] !== undefined) {
                            return work[cat.id].split(", ").map((i: string) => i.trim()).some((kw: string) => {
                              return rex.test(kw)
                            })
                          }
                          else {
                            return false
                          }
                        }
                        )
                        if (worksFound.length === 0) {
                          return undefined
                        } else {

                        return <React.Fragment key={index}>
                          <h2 ref={node => {
                            if (node) {
                              // eslint-disable-next-line react/no-direct-mutation-state
                              this.references[cat.pre + "_" + keyword.toLocaleLowerCase()] = node
                            }
                          }}>
                            {
                              keyword
                            }
                          </h2>
                          <ul>
                            {
                              worksFound.map((wrk: any, index: number) =>
                                  <li key={index}><a
                                    href={process.env.PUBLIC_URL + `/${wrk.slug}`}
                                    onClick={(e: any) => {
                                      e.stopPropagation()
                                      e.preventDefault()
                                      this.props.navigate(`/${wrk.slug}`)
                                    }}>{wrk.title}</a> by {wrk.authorDisplayName}</li>)}
                          </ul>
                        </React.Fragment>
                        }
                      }
                      )
                  }
                </div>
              </React.Fragment> : undefined
            }
})}
      </div>
      </div>
    </>)
  }
}

export default function IndexScreen() {
  let tagifyRef = useRef() as React.MutableRefObject<Tagify<TagData> | undefined>
  let navigate = useNavigate()
  let aContext = useContext(AppContext)
  if (aContext !== undefined) {
    let { keywordSets, search, setSearch, darkMode, setDarkMode }:IContext = aContext
    return (
      <Layout setSearch={setSearch} sticky={false} darkMode={darkMode} setDarkMode={setDarkMode} >
      <Layout.Slot name="Header">
          <NavigationBar currentScreen="index" tagifyRef={tagifyRef} search={search} showSearch={false}  setSearch={setSearch}  />
      </Layout.Slot>
      <Layout.Slot name="Body">
        {navigate !== null ?
          <IndexComponent navigate={navigate} works={works} keywordSets={keywordSets}></IndexComponent> : undefined}
      </Layout.Slot>
    </Layout>
  )
  } else {
    return <></>
  }
}
