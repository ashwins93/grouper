import React from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { parse } from 'papaparse'
import { groupTabularData, indentData } from '../utils'
import Header from '../components/header'

const Index = () => {
  const [file, setFile] = React.useState()
  const [display, setDisplay] = React.useState('')

  const handleChange = e => {
    setFile(e.target.files[0])
  }

  const parseCSV = () => {
    if (!file) return

    parse(file, {
      complete: result => {
        const grouped = groupTabularData(result.data)
        const indented = indentData(grouped)
        setDisplay(indented)
      },
    })
  }

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <CssBaseline />
      <Header />
      <input type="file" onChange={handleChange} />
      <button onClick={parseCSV}>Parse</button>
      <textarea value={display} readOnly />
    </div>
  )
}

export default Index
