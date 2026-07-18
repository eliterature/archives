import { TagData } from "@yaireo/tagify"
import React, { useContext, useRef } from "react"
import NavigationBar from "../components/Navigation"
import { AppContext, categories, IContext, Layout, prefixSets } from "./HomeScreen"
// import preserveCase from "../json/preserveCase.json"
import { Badge } from "react-bootstrap"

/*
function deepCopy<T>(instance: T): T {
  if (instance == null) {
    return instance
  }

  // handle Dates
  if (instance instanceof Date) {
    return new Date(instance.getTime()) as any
  }

  // handle Array types
  if (instance instanceof Array) {
    var cloneArr = [] as any[];
    (instance as any[]).forEach((value) => { cloneArr.push(value) })
    // for nested objects
    return cloneArr.map((value: any) => deepCopy<any>(value)) as any
  }
  // handle objects
  if (instance instanceof Object) {
    var copyInstance = {
      ...(instance as { [key: string]: any }
      )
    } as { [key: string]: any }
    for (var attr in instance) {
      if ((instance as Object).hasOwnProperty(attr))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        copyInstance[attr] = deepCopy<any>(instance[attr])
    }
    return copyInstance as T
  }
  // handling primitive data types
  return instance
}*/


export let keywordSets:{[index:string]:Set<string>} = {},
  searchSets: {[index: string]: Set<string>} = {authorDisplayName: new Set() },
  filters = []

// function getCategory(keyword:string) {
//   for (let keywordCategory of categories) {
//     if (keywordSets[keywordCategory.id].has(keyword)) {
//       return keywordCategory
//     }
//   }
//   if (searchSets.authorDisplayName.has(keyword)) {
//     return "authorDisplayName"
//   }
// }
export default function FiltersScreen() {
    let tagifyRef:React.MutableRefObject<Tagify<TagData> | undefined> = useRef();
    let aContext = useContext(AppContext)
    if (aContext !== undefined) {
      let { keywordSets, curWorks, search, setSearch, darkMode, setDarkMode, keywordFrequency }: IContext = aContext
      return (
        <Layout setSearch={setSearch} sticky={false} darkMode={darkMode} setDarkMode={setDarkMode}>
          <Layout.Slot name="Header">
            <NavigationBar currentScreen="filters" tagifyRef={tagifyRef} search={search} setSearch={setSearch} curWorks={curWorks}/>
          </Layout.Slot>
            <Layout.Slot name="Body">
          <div id="keywordsFilters" className="elcContainer" >
            <hr />
              <h1>Keyword Filters</h1>
              {categories.map(cat => 
                <React.Fragment key={cat.id}>
                  <h3>{cat.label}</h3>
                  <div id={cat.id}>
                  {keywordSets[cat.id] !== undefined ? Array.from(keywordSets[cat.id]).sort().map(keyword => {
                    return !search.some((k:any)=>k.value === keyword) ? <button key={keyword}
                      onClick={() => {
                        if (tagifyRef !== undefined && tagifyRef.current !== undefined) {
                          let newTag = { value: keyword, term: keyword, color: "blue", tag: cat.prefix + "_" + keyword, category: cat.id }
                          if (prefixSets[cat.id].has(keyword)) {
                            newTag.value = `${keyword} (${cat.label})`
                          }
                          setSearch((prevSearch:any) => [...prevSearch, newTag])
                        }
                      }}
                      className="keywordTag" id={keyword}>{keyword}   <Badge pill bg="secondary">
                        {keywordFrequency[cat.id][keyword]}
                      </Badge></button> : undefined
                  }): undefined}
                  </div>
                </React.Fragment>
              )}
            </div>
            </Layout.Slot>
        </Layout>
      )
  } else {
    return <div></div>
  }
}