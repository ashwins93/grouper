import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CodeIcon from '@material-ui/icons/Code'
import EmailIcon from '@material-ui/icons/Email'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'

const styles = theme => ({
  root: {
    backgroundColor: '#232323',
    color: '#fafafa',
  },
  container: {
    padding: theme.spacing(5, 2),
  },
  btnIcon: {
    color: '#fafafa',
  },
  margVert: {
    margin: theme.spacing(2, 0),
  },
})

const Footer = ({ classes }) => (
  <footer className={classes.root}>
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Typography variant="body1">
            This website was developed as a hobby project. Please note all the
            file parsing is done inside the browser and the data is not sent or
            stored anywhere. This project is open sourced under MIT license.
            Check below for the link to the source.
          </Typography>
          <Button
            className={`${classes.btnIcon} ${classes.margVert}`}
            startIcon={<CodeIcon />}
            href="https://github.com/ashwins93/grouper"
            target="_blank"
          >
            Source
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h5" component="h2" gutterBottom>
            Contact Developer
          </Typography>

          <div>aswinjeganath@gmail.com</div>

          <Grid container>
            <Grid item>
              <IconButton
                href="mailto:aswinjeganath@gmail.com"
                className={classes.btnIcon}
              >
                <EmailIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                href="https://www.linkedin.com/in/ashwins93/"
                target="_blank"
                className={classes.btnIcon}
              >
                <LinkedInIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                href="https://www.twitter.com/ashwins93/"
                target="_blank"
                className={classes.btnIcon}
              >
                <TwitterIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </footer>
)

export default withStyles(styles)(Footer)
