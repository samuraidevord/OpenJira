// NextJS
import type { NextPage } from "next";
// Material UI
import { Grid, Typography, Card, CardHeader } from "@mui/material";
import { Layout } from "../components/layouts";
const HomePage: NextPage = () => {
  return (
    <Layout title="Home | Open Jira">
      <Typography variant="h1" color="primary">
        <Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardHeader title="Pendientes"></CardHeader>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardHeader title="En Progreso"></CardHeader>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardHeader title="Completadas"></CardHeader>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Typography>
    </Layout>
  );
};

export default HomePage;
