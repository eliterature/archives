import { BrowserRouter, Routes, Route, useNavigate, useMatch } from "react-router-dom"
import works from "../json/works.json"
import preserveCase from "../json/preserveCase.json"
// import images from "../images/images"
import React, { SyntheticEvent, useMemo, useContext, useEffect, useRef, useState } from "react"
import NavigationBar from "../components/Navigation"
import Footer from "../components/Footer"
import Work from "./WorkScreen"
import FiltersScreen from "./FiltersScreen"
import useSlot from "../hooks/useSlot"
// Local PRNG: does not affect Math.random.

import withSlot from "../wrappers/withSlot"
import AboutScreen from "./AboutScreen"
import IndexScreen from "./IndexScreen"
// import GlossaryScreen from "./GlossaryScreen"
import { TagData } from "@yaireo/tagify"
// import { isLiteralTypeNode } from "typescript"
// var seedrandom = require('seedrandom');

export interface IContext {
  curWorks: any[],
  keywordSets: { [index: string]: Set<string> },
  searchSets: { [index: string]: Set<string> },
  darkMode: boolean,
  search: any[],
  setSearch: ((param: any[] | ((arg: any[]) => any[])) => void),
  setDarkMode: (param: boolean) => void,
  keywordFrequency: { [index: string]: { [index: string]: number } }
}
export let AppContext = React.createContext<IContext | undefined>(undefined)

export let categories = [
  { id: "genreKeywords", label: "Genre", pre: "g" },
  { id: "platform", label: "Platform", pre: "p" },
  { id: "authoringLanguages", label: "Authoring Languages", pre: "al" },
  { id: "format", label: "Format", pre: "f" },
  { id: "contentKeywords", label: "Content", pre: "c" },
  { id: "creatorNationality", preserve: true, label: "Creator Nationality", prefix: false, pre: "n" },
  { id: "creatorKeywords", label: "Identity", pre: "i" },
  { id: "workLanguage", preserve: true, label: "Work Language", prefix: false, pre: "wl" },
  { id: "geographicalOriginOfWork", preserve: true, label: "Geographical Origin of Work", prefix: false, pre: "go" },
]

export let searchCategories = [
  { id: "authorDisplayName", preserve: true, prefix: "adn" },
  { id: "collaborators", preserve: true, prefix: "c" },
  { id: "title", preserve: true, prefix: "t" },
  { id: "search", prefix: "s" },
  { id: "genreKeywords", label: "genre", prefix: "gk" },
  { id: "platform", label: "platform", prefix: "p" },
  { id: "format", label: "format", prefix: "f" },
  { id: "authoringLanguages", label: "auth. lang.", prefix: "al" },
  { id: "creatorNationality", label: "nationality", preserve: true, prefix: "cn" },
  { id: "contentKeywords", label: "content", prefix: "ck" },
  { id: "workLanguage", label: "work lang.", preserve: true, prefix: "wl" },
  { id: "geographicalOriginOfWork", label: "origin", preserve: true, prefix: "gow" },
]

// function WorkBanner({ bannerRef, titleRef }: { bannerRef: any, titleRef: any }) {
//   return (<>
//     <div id="currentWork" style={{
//       display: "none"
//     }}> <div ref={bannerRef} style={{
//     backgroundImage: "",
//     backgroundPosition: "center"
//   }}/>
//   <div ref={titleRef} id="subtitle"></div>
//   </div>
//   </>
//   )

// }
// const css = styles
export function LayoutComponent({ page, children, sticky, bannerRef, titleRef, headerRef, darkMode, setDarkMode, search, setSearch }:
  { page: string, children: JSX.Element, sticky: boolean, bannerRef: any, titleRef: any, headerRef: any, darkMode: any, search: any, setDarkMode: boolean, setSearch: (arg: any) => any }) {
  const HeaderTemplate = useSlot({
    children,
    name: "Header",
    fallback: <></>
  })
  const BodyTemplate = useSlot({
    children,
    name: "Body",
    fallback: <>No Body Provided</>
  })
  const FooterTemplate = useSlot({
    children,
    name: "Footer",
    fallback: <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
  })
  return (
    <div id="main" style={{ flex: "initial" }}>
      <div className="stickyheader" >
        {/* <WorkBanner bannerRef={bannerRef} titleRef={titleRef} /> */}
        {page!=="home"? <Header home={page === "home"}  search={search} setSearch={setSearch} headerRef={headerRef} /> : undefined}
        {page === "home" ?
          <center id="headerBanner">
            <a href="https://stars.library.ucf.edu/elo2024/" target="_blank" rel="noreferrer" style={{ height: "250px", margin: "auto" }}>
              <div id="currentWork" style={{
                display: "none", position: "absolute", height: "250px", zIndex: 2
              }}>
                <div ref={bannerRef} id="workBanner" style={{
                  backgroundImage: "",
                  backgroundPosition: "center"
                }} ></div>
                <div ref={titleRef} id="subtitle"></div>
              </div>
              <div ref={headerRef} style={{
                display: "flex", position: "relative", width: "100%", 
                zIndex: 1,
                opacity: 1,
                justifyContent: "space-between"
             }}>
              <span style={{
                zIndex:1,
                height: 178, width: 495, display: "inline-block",
                backgroundPosition: "left", backgroundRepeat: "no-repeat", backgroundSize: "cover",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/HeaderLeft.png'}`
              }}>
              </span>
                <span style={{
                  zIndex: 1,
                height: 178, width: 560, display: "inline-block", flexShrink: 1.2,
                backgroundPosition: "right", backgroundRepeat: "no-repeat", backgroundSize: "cover",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/HeaderRight.png'}`
              }}>
              </span>
              </div>
            </a>
          </center>
           : undefined}
      </div>
      <HeaderTemplate />
      {/* <br className="clearFloat" /> */}
      <BodyTemplate />
      <FooterTemplate />
    </div>)
}

export const Layout = withSlot(LayoutComponent)

function WorkIcon({ work, bannerRef, headerRef, titleRef, navigate, search, setSearch }
  : {
    work: any,
    bannerRef?: React.MutableRefObject<HTMLInputElement>,
    titleRef?: React.MutableRefObject<HTMLInputElement>,
    headerRef?: React.MutableRefObject<HTMLInputElement>,
    navigate: any,
    search: any,
    setSearch: (arg: any) => any,
  }) {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0 });
  // },[])
  let overlay = useRef() as React.MutableRefObject<HTMLInputElement>
  const imageURL = `${process.env.PUBLIC_URL}/images/works/tile/${work.slug}-tile.png`
  const bannerURL = `${process.env.PUBLIC_URL}/images/works/banner/${work.slug}-banner.png`
  return (
    imageURL !== undefined ?
      <div className="work">
        <a href={process.env.PUBLIC_URL + "/" + work.slug}
          // style={{display:"initial"}}
          onMouseOver={(e) => {
            // TODO: https://www.npmjs.com/package/react-device-detect
            if (headerRef && bannerRef && titleRef) {
              overlay.current.style.opacity = "1"
              // headerRef.current.style.opacity = "0"
              // bannerRef.current.parentElement!.parentElement!.style.backgroundColor = `#${work.workColor}`
              bannerRef.current.style.backgroundImage = `url(${bannerURL})`
              // bannerRef.current.style.backgroundSize = "contain"
              titleRef.current.innerHTML = `<p class="title">${work.title}</p><p class="authors">${work.authorDisplayName}</p>`
              bannerRef.current.parentElement!.style.display = ``
            }
          }}
          onMouseOut={(e) => {
            if (headerRef && bannerRef && titleRef) {
              // bannerRef.current.parentElement!.style.backgroundColor = `#e5e5e5`
              headerRef.current.style.opacity = "1"
              overlay.current.style.opacity = "0"
              bannerRef.current.style.backgroundImage = ""
              bannerRef.current.parentElement!.style.display = `none`
            }
          }}
          onClick={(e) => {
            e.preventDefault()
            navigate(`/${work.slug}`)
            if (search.length !== 0)
              setSearch([])
          }
          }>
          <img className="workIcon" alt={`${work.title} by ${work.authorDisplayName}`}
            src={imageURL}></img>
          <div ref={overlay} className="overlay" style={{ opacity: 0 }}><img alt={work.title}
            src={require("../images/button.png")}></img>
            <div className="beginText">Begin</div>
          </div>
        </a>
      </div>
      : <></>
  )
}

export function Header({ home = false, show = true, headerRef, search, setSearch }:
  { home?: boolean, show?: boolean, headerRef?: any, search: any, setSearch: (arg: any) => any }) {
  const navigate = useNavigate()
  let cb = (e: SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (search !== undefined && search.length > 1) {
      //("Header setting search...")
      setSearch([])
    }
    navigate("/")
  }
  return (<a style={{zIndex:0}} id="headerLink" onClick={cb} href={process.env.PUBLIC_URL}>
    <div id="header" className={home ? "home" : undefined} style={{ opacity: show ? 1 : 0 }}>
      <h1>ELO 2024 (Un)linked - Exhibition</h1>
    </div>
  </a>)
}

function HomeScreen() {
  const navigate = useNavigate()
  let bannerRef = useRef() as React.MutableRefObject<HTMLInputElement>
  let titleRef = useRef() as React.MutableRefObject<HTMLInputElement>
  let headerRef = useRef() as React.MutableRefObject<HTMLInputElement>
  let tagifyRef = useRef() as React.MutableRefObject<Tagify<TagData> | undefined>

  let cContext = useContext(AppContext)
  // let day = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  // let overlay = useRef() as React.MutableRefObject<HTMLInputElement>

  // let [featured] = useState(works[day % (works.length - 1)])

  // Pull the featured tile image from the public folder
  // const imageURL = `${process.env.PUBLIC_URL}/images/works/tile/${featured.slug}-tile.png`

  if (cContext !== undefined) {
    let { curWorks, darkMode, search, setSearch, setDarkMode } = cContext
    //console.log(search, setSearch)
    return (<Layout page="home" search={search} setSearch={setSearch} darkMode={darkMode} setDarkMode={setDarkMode} sticky={true} bannerRef={bannerRef} titleRef={titleRef} headerRef={headerRef} >
      <Layout.Slot name="Header">
        {/* <center>
          <a href="https://stars.library.ucf.edu/elo2024/">
            <div style={{ position: "relative", width: "100%" }}>
              <div id="exhibitHeader" ref={headerRef} style={{
                height: "250px",
                width: "80%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/header.png'}`,
                backgroundColor: `#b6bdc4`
              }}>
                <span>Exhibition</span>
                <div id="currentWork" style={{
                  display: "none"
                }}>
                  <div ref={bannerRef} id="workBanner" style={{
                    backgroundImage: "",
                    backgroundPosition: "center"
                  }} ></div>
                  <div ref={titleRef} id="subtitle"></div>
                </div>
              </div>
            </div>
          </a>
        </center> */}
        
        {/* <a id="highlightedWorks"
          href={`${process.env.PUBLIC_URL}/${featured.slug}`}
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            setSearch([])
            navigate(`/${featured.slug}`)
          }}
          >
          <div id="featuredWorkContainer" >
          <div 
            onMouseOver={(e) => {
              // TODO: https://www.npmjs.com/package/react-device-detect
              if (headerRef && bannerRef && titleRef) {
                overlay.current.style.opacity = "1"
              }
            }}
          onMouseOut={(e) => {
                if (headerRef && bannerRef && titleRef) {
                  overlay.current.style.opacity = "0"
                }
              }}>
                <img style={{ height: "100px", cursor: "pointer" }} className="workIcon" alt={`${featured.title} by ${featured.authorDisplayName}`}  src={imageURL}></img>
          </div>
            <div className="selectWorks">
              <h3>Today's Featured Work</h3>
              <div id="subtitle">{ featured.title}</div>
              <div id="authors">{featured.authorDisplayName}</div>
            </div>

          </div>
        </a> */}
        <NavigationBar tagifyRef={tagifyRef}
          curWorks={curWorks}
          search={search}
          setSearch={setSearch} />
      </Layout.Slot>
      <Layout.Slot name="Body">
        <div id="indexContainer">
          {curWorks.sort((work1: { title: string }, work2: { title: string }) => work1.title.localeCompare(work2.title, undefined)).map((work: { url: React.Key }) => {
            return (
              <WorkIcon key={work.url}
                search={search}
                setSearch={setSearch}
                bannerRef={bannerRef}
                titleRef={titleRef}
                headerRef={headerRef}
                work={work}
                navigate={navigate}
              />
            )
          })}
        </div>
      </Layout.Slot>
    </Layout>)
  } else {
    return <div>Not loaded</div>
  }
}

function WorkScreen() {
  // let { work } = useParams();
  let {
    params: { workUrl },
  } = useMatch("/:workUrl")!
  let aContext = useContext(AppContext)
  if (workUrl !== undefined) {
    let work = works.find(wrk => wrk.slug === workUrl)
    if (aContext !== undefined) {
      let { setDarkMode }: IContext = aContext
      return (
        <Work work={work} setDarkMode={setDarkMode} ></Work>)
    } else {
      return <></>
    }
  } else {
    if (aContext !== undefined) {
      let { search, setSearch }: IContext = aContext
      return (<>
        <Header search={search} show={true} setSearch={setSearch} />
        <div>Work not found</div>
      </>)
    } else {
      return <></>
    }
  }
}
export let prefixSets: { [index: string]: Set<string> } = {}
let registerKey = (search: any, targetSets: any, categories: any, item: string) => {
  for (let oCat of categories) {
    if (oCat.id !== search.id && targetSets[oCat.id].has(item)) {
      // console.log("Duplicate found of " + item + " in " + oCat.id)
      if (prefixSets[search.id] === undefined) {
        prefixSets[search.id] = new Set<string>()
      }
      prefixSets[search.id].add(item)
      if (prefixSets[oCat.id] === undefined) {
        prefixSets[oCat.id] = new Set<string>()
      }
      prefixSets[oCat.id].add(item)
    }
  }
  if (search.id === "collaborators" && !targetSets.authorDisplayName.has(item)) {
    targetSets[search.id].add(item)
  } else if (search.id === "authorDisplayName" && targetSets.collaborators.has(item)) {
    targetSets.authorDisplayName.add(item)
    targetSets.collaborators.delete(item)
  } else if (search.id !== "collaborators") {
    targetSets[search.id].add(item)
  }
}

interface IDictionary {
  [index: string]: Set<string>
}

let buildIndex = (search: any) => {
  //console.log("Build index")
  let keywordFrequency: { [index: string]: { [index: string]: number } } = {}
  let newWorks: {
    [index: string]: any
  }[] = works
  let keywordSets: { [index: string]: Set<string> } = {} as IDictionary
  let sSets: { [index: string]: Set<string> } = {} as IDictionary
  try {
    // let collaboratorString = search.map((v: any) => `${v.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').toLowerCase()}`).join("|")
    for (let search of searchCategories) {
      sSets[search.id] = new Set()
    }
    for (let search of searchCategories) {
      prefixSets[search.id] = new Set()
    }
    for (let keywordCat of categories) {
      keywordSets[keywordCat.id] = new Set()
    }
    let collabRegex = /<[^<]+>|(?:^|\))\n.*: ?/gi,
      searchRegex = /[.*+?^${}()|[\]\\]/g
    newWorks = works.filter((wrk: any) => {

      //console.log(search)
      return search.map((v: any) => {
        let term = v.term.replace(searchRegex, '\\$&').toLowerCase()
        return {
          searchRegex: [new RegExp(`${term}`, "i"),
          new RegExp(`^${term}$`, "i")], category: v.category
        }
      })
        .every(({ searchRegex, category }: { searchRegex: RegExp[], category: string }) => {
          let match = false, searchMatched

          if (category === undefined) {
            match = searchRegex[0].test(wrk.title!)
            searchMatched = (wrk.search !== undefined && wrk.search!.split(", ").some((key: string) => searchRegex[1].test(key)))
          }

          let collabs = wrk.collaborators, collabResult = false
          if (collabs !== undefined && (wrk.url === "ringing-the-changes" || wrk.url === "the-infinite-woman")) {
            collabs = collabs.replaceAll(collabRegex, "")
            collabs = collabs.replaceAll(/\([^)]+\)|\./gi, "").trim().replaceAll("\n", ";")
            collabResult = collabs.split("; ").some((key: string) => {
              return searchRegex[1].test(key.trim())
            })
          } else if (collabs !== undefined) {
            // if (wrk.url === "80-days") {
            //   console.log(collabs, searchRegex[1], wrk.url)
            // }
            collabs = collabs!.replaceAll(/\(.+?\)/gi, "").split(",")
            // if (wrk.url === "80-days") {
            //   console.log(collabs, searchRegex[1], wrk.url)
            // }
            collabResult = collabs
              .some((key: string) => searchRegex[1].test(key.trim()))
            let collabsMatched = (collabs !== undefined && collabResult)
            match = match || searchMatched || collabsMatched
          } else {
            match = false
          }
          let test1 = (arr: string) => {
            return arr.split(", ").some((key: string) => searchRegex[1].test(key))
          }
          switch (category) {
            case "title":
              match = match || searchRegex[0].test(wrk.title!)
              break
            case "authorDisplayName":
              match = match || searchRegex[0].test(wrk.authorDisplayName!)
              break
            case "genreKeywords":
              match = match || (wrk.genreKeywords !== undefined
                && test1(wrk.genreKeywords!))
              break
            case "contentKeywords":
              match = match || (wrk.contentKeywords !== undefined
                && test1(wrk.contentKeywords!))
              break
            case "creatorKeywords":
              match = match || (wrk.creatorKeywords !== undefined
                && test1(wrk.creatorKeywords!))
              break
            case "format":
              match = match || (wrk.format !== undefined
                && test1(wrk.format!))
              break
            case "platform":
              match = match || (wrk.platform !== undefined
                && test1(wrk.platform!))
              break
            case "authoringLanguages":
              try {
                match = match || (wrk.authoringLanguages !== undefined
                && wrk.authoringLanguages!.split(", ").some(
                  (key: string) =>
                    searchRegex[1].test(key)))
              } catch {
                
              }
              break
            case "workLanguageMatched":
              match = match || (wrk.workLanguage !== undefined
                && wrk.workLanguage!.split(", ").some(
                  (key: string) => searchRegex[1].test(key)))
              break
            case "geographicalOriginOfWork":
              match = match || (wrk.geographicalOriginOfWork !== undefined
                && wrk.geographicalOriginOfWork!.split(", ").some(
                  (key: string) => searchRegex[1].test(key)))
              break
            case "creatorNationality":
              match = match || (wrk.creatorNationality !== undefined
                && wrk.creatorNationality!.split(", ").some(
                  (key: string) => searchRegex[1].test(key)))
          }
          return match
        })
    })
    for (var work of newWorks) {
      for (let search of searchCategories) {
        switch (search.id) {
          case "collaborators":
            if (work.collaborators !== undefined) {
              let workRegex = /([^(),]+(?:\(.+?\))?)(:?, )?/g
              let collabs: any = [...work.collaborators
                .matchAll(workRegex)]
              collabs
                .forEach((elem: any) => {
                  let newElem = elem[1].match(/(.+) (\(.+\))/)
                  if (newElem !== undefined && newElem !== null && newElem[1] !== undefined) {
                    // sSets[search.id].add(newElem[1])
                    registerKey(search, sSets, searchCategories, newElem[1])
                  } else
                    return undefined
                })
            }
            break
          default:
            if (work[search.id] !== undefined) {
              let candidates
              if (search.id !== "title") {
                candidates = work[search.id].split(",")
              } else {
                candidates = [work[search.id]]
              }
              candidates.map((i: string) => i.trim())
                .forEach((key: string) => {
                  let replacement = `^${key.replace(/^[.*+?^${}()|[\]\\]/g, '\\$&')}$`
                  let re = new RegExp(replacement, "i"), found
                  if (!search.preserve) {
                    found = preserveCase.find(kw => {
                      return re.test(kw.trim())
                    })
                    if (found !== undefined) {
                      registerKey(search, sSets, searchCategories, found)
                    } else {
                      sSets[search.id].add(key.toLowerCase())
                      registerKey(search, sSets, searchCategories, key.toLowerCase())
                    }
                  } else {
                    // sSets[search.id].add(key)
                    registerKey(search, sSets, searchCategories, key)

                  }
                })
            }
            break
        }

      }
      for (let keywordCat of categories) {
        if (work[keywordCat.id] !== undefined) {
          let keywords = work[keywordCat.id].split(",").map((kw: string) => kw.trim())
          let transKeywords = keywords
            .map((i: any) => {
              let testString = i.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
              let re = new RegExp(testString, "i")
              if (!keywordCat.preserve) {
                let found = preserveCase.find(kw => {
                  return re.test(kw.trim())
                })
                // if (work.url === "vocable-code") {
                // }
                if (found !== undefined) {
                  return found
                } else {
                  return i.toLowerCase().trim()
                }
              } else {
                return i.trim()
                // console.log("Lowercasing " + i, found, testString)
              }
            })
          for (let item of transKeywords) {
            keywordSets[keywordCat.id].add(item)
            registerKey(keywordCat, keywordSets, categories, item)
            if (keywordFrequency[keywordCat.id] === undefined) {
              keywordFrequency[keywordCat.id] = {}
            }
            if (keywordFrequency[keywordCat.id][item] === undefined) {
              keywordFrequency[keywordCat.id][item] = 1
            } else {
              keywordFrequency[keywordCat.id][item]++
            }
          }
        }
        // console.log(Array.from(keywordSets[keywordCat.id]))
      }
    }
    // console.log(Array.from(sSets["authoringLanguages"]))
  } catch (e) {
    console.log(e)
  }
  // console.log(Array.from(prefixSets))
  return ({ keywordSets, keywordFrequency, newWorks, sSets })
}
// function areEqual(prevProps:any[], nextProps:any[]) {
//   /*
//   return true if passing nextProps to render would return
//   the same result as passing prevProps to render,
//   otherwise return false
//   */
//   return new Set(prevProps) == new Set(nextProps) 
// }
const Index = () => {
  // let search:any[] = []
  // let setSearch = (s:any)=>console.log(`Setting search to ${s}`) 
  let [search, setSearch] = useState<any[]>([])
  // let darkMode = true//'dark'
  // let setDarkMode = (arg:any) => console.log(`Setting dark mode to ${arg}`)
  let [darkMode, setDarkMode] = useState(document.documentElement.getAttribute('data-theme') === 'dark')
  // let kSets, dFreq, nWorks, dSSets;
  let { keywordSets, keywordFrequency, newWorks, sSets } = useMemo(
    () => {
    // console.log(search)
      return buildIndex(search)
    }
    , [search])
  let curWorks = newWorks
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])
  let providerValue = { works, curWorks, keywordSets, searchSets: sSets, darkMode, search, setSearch, setDarkMode, keywordFrequency }
  return (
    <AppContext.Provider value={providerValue}>
      <BrowserRouter basename="/mediaartsexhibits/elo2024">
        <Routes>
          <Route path={"/"} element={<HomeScreen />} />
          <Route path={"/index"} element={<IndexScreen />} />
          <Route path={"/about"} element={<AboutScreen />} />
          {/* <Route path={"/glossary"} element={<GlossaryScreen/>} /> */}
          <Route path={"/filters"} element={<FiltersScreen />} />
          <Route path={"/:workUrl"} element={<WorkScreen />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
export default Index