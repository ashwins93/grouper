import React from 'react'
import Head from 'next/head'
import Typography from '@material-ui/core/Typography'
import { parse } from 'papaparse'
import { groupTabularData, indentData } from '../utils'

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
      <Typography variant="body1">Hello world</Typography>
      <input type="file" onChange={handleChange} />
      <button onClick={parseCSV}>Parse</button>
      <textarea value={display} readOnly />
    </div>
  )
}

export default Index
