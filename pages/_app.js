import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>Grouper</title>
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </React.Fragment>
    )
  }
}
