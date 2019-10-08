import React, { useRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease'
import { parse } from 'papaparse'

import { groupTabularData, indentData } from '../utils'

const styles = theme => ({
  fileInput: {
    display: 'none',
  },
  formSection: {
    padding: theme.spacing(4, 0),
  },
  uploadBtn: {
    marginRight: theme.spacing(1),
  },
  sectionHeading: {
    padding: theme.spacing(1, 0),
  },
  hr: {
    width: '100%',
    maxWidth: 640,
    height: 1,
    border: 0,
    backgroundColor: '#ddd',
    marginBottom: theme.spacing(3),
  },
  outputContainer: {
    width: '100%',
    maxWidth: 640,
    position: 'relative',
  },
  output: {
    width: '100%',
  },
  fab: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
})

const SectionHeading = ({ className, children }) => (
  <Typography className={className} variant="h5" component="h2" align="center">
    {children}
  </Typography>
)

const Parser = ({ classes }) => {
  const [file, setFile] = React.useState()
  const [display, setDisplay] = React.useState('')
  const [indentBySpaces, setIndent] = React.useState(false)
  const [hasHeaders, setHeaders] = React.useState(false)
  const [error, setError] = React.useState('')
  const textRef = useRef()

  const handleChange = e => {
    setFile(e.target.files[0])
  }

  const toggleIndent = () => setIndent(prev => !prev)
  const toggleHeaders = () => setHeaders(prev => !prev)

  const parseCSV = () => {
    if (!file) return

    if (file.type !== 'text/csv') {
      setError(
        'Only CSV files are supported. Make sure you are selecting the right file type.'
      )
      return
    }

    parse(file, {
      error: error => {
        console.error(error)
        setError(error.message)
      },
      complete: result => {
        const data = hasHeaders ? result.data.slice(1) : result.data
        const grouped = groupTabularData(data)
        const indented = indentData(grouped, indentBySpaces ? '    ' : '\t')
        setDisplay(indented)
        setError('')
      },
    })
  }

  const copyToClipboard = () => {
    const textField = textRef.current
    textField.select()
    document.execCommand('copy')
  }

  return (
    <Container style={{ padding: '40px 8px' }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.formSection}
        component="section"
      >
        <Grid item xs={12}>
          <SectionHeading className={classes.sectionHeading}>
            Step 1 - Choose file
          </SectionHeading>
        </Grid>
        <hr className={classes.hr} />
        <Grid item>
          <input
            className={classes.fileInput}
            id="file-input"
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              component="span"
              className={classes.uploadBtn}
              startIcon={<CloudUploadIcon />}
            >
              Choose
            </Button>
            <Typography variant="body1" component="span">
              your CSV file
            </Typography>
          </label>
        </Grid>
        <Grid item>
          <Typography variang="body1">
            {file ? file.name : 'No file chosen'}
          </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'center' }}>
          <FormControlLabel
            control={<Checkbox checked={hasHeaders} onChange={toggleHeaders} />}
            label="My csv file has headers"
          />
          <Typography variant="body2" component="div">
            Check this box if your csv file has a header row.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.formSection}
        component="section"
      >
        <Grid item xs={12}>
          <SectionHeading className={classes.sectionHeading}>
            Step 2 - Choose how to indent (optional)
          </SectionHeading>
        </Grid>
        <hr className={classes.hr} />
        <Grid item>
          <Typography variang="body1">
            By default the output is indented with a tab character.
            Alternatively you can choose to indent with 4 spaces with this
            option.
          </Typography>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch checked={indentBySpaces} onChange={toggleIndent} />
            }
            label="Indent by 4 spaces"
          />
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.formSection}
        component="section"
      >
        <Grid item xs={12}>
          <SectionHeading className={classes.sectionHeading}>
            Step 3 - Parse file!
          </SectionHeading>
        </Grid>
        <hr className={classes.hr} />
        <Grid item>
          <Typography variang="body1">
            You're all set! Click the button below to see the output.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={parseCSV}
            startIcon={<FormatIndentIncreaseIcon />}
          >
            Parse file
          </Button>
        </Grid>
        {error && (
          <Grid item>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item className={classes.outputContainer}>
          <TextField
            id="standard-multiline-flexible"
            label="Output"
            multiline
            rowsMax="10"
            rows="4"
            value={display}
            readOnly
            className={classes.output}
            margin="normal"
            inputRef={textRef}
          />
          <Fab
            color="secondary"
            size="small"
            variant="extended"
            aria-label="copy"
            className={classes.fab}
            onClick={copyToClipboard}
          >
            <FilterNoneIcon style={{ marginRight: 10 }} />
            Copy text
          </Fab>
        </Grid>
      </Grid>
    </Container>
  )
}

export default withStyles(styles)(Parser)
