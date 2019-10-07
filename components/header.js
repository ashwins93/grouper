import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  hero: {
    backgroundImage: 'linear-gradient(to right, #141E30, #243B55)',
    color: '#fafafa',
  },
  header: {
    padding: theme.spacing(3, 0),
  },
  cta: {
    padding: theme.spacing(4, 0),
  },
  tabularImg: {
    display: 'block',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  imgWrapper: {
    overflow: 'hidden',
    maxWidth: 533,
    margin: '0 auto',
  },
  captionText: {
    marginBottom: theme.spacing(5),
  },
})

const Header = ({ classes }) => {
  return (
    <div className={classes.hero}>
      <header className={classes.header}>
        <Container>
          <Typography variant="h6" component="h2">
            grouper
          </Typography>
        </Container>
      </header>
      <div className={classes.cta}>
        <Container>
          <Typography
            variant="h5"
            component="p"
            align="center"
            className={classes.captionText}
          >
            A web tool to convert tabular data into grouped, indented text.
          </Typography>
          <Grid
            container
            justify="center"
            spacing={2}
            alignItems="center"
            wrap={false}
          >
            <Grid item xs={12} md={5}>
              <Paper elevation={4} className={classes.imgWrapper}>
                <img
                  className={classes.tabularImg}
                  src="/static/tabular.png"
                  alt="an image showing tabular data"
                />
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant="h3" component="div">
                &rarr;
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper elevation={4} className={classes.imgWrapper}>
                <img
                  className={classes.tabularImg}
                  src="/static/indented.png"
                  alt="an image showing tabular data"
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default withStyles(styles)(Header)
